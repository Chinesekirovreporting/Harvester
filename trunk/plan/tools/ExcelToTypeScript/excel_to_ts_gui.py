# -*- coding: utf-8 -*-
"""
Excel 转 TypeScript 导表工具 - 图形界面
"""
import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
from pathlib import Path
import threading

# 确保能导入主模块
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from excel_to_ts import run_export, DEFAULT_EXCEL_DIR, DEFAULT_OUTPUT_BASE, load_config, get_base_path


def get_config_paths():
    """从配置文件获取默认路径"""
    config_path = get_base_path() / "excel_to_ts_config.json"
    config = load_config(str(config_path))
    return (
        config.get("excel_dir", DEFAULT_EXCEL_DIR),
        config.get("output_dir", DEFAULT_OUTPUT_BASE),
    )


class ExcelToTSGUI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Excel 转 TypeScript 导表工具")
        self.root.geometry("700x550")
        self.root.minsize(600, 450)

        # 变量
        default_excel, default_output = get_config_paths()
        self.excel_dir_var = tk.StringVar(value=default_excel)
        self.output_dir_var = tk.StringVar(value=default_output)
        self.table_vars = {}  # stem -> BooleanVar
        self.exporting = False

        self._build_ui()

    def _build_ui(self):
        # 主框架
        main_frame = ttk.Frame(self.root, padding=10)
        main_frame.pack(fill=tk.BOTH, expand=True)

        # === 路径区域 ===
        path_frame = ttk.LabelFrame(main_frame, text="路径配置", padding=8)
        path_frame.pack(fill=tk.X, pady=(0, 8))

        # Excel 目录
        ttk.Label(path_frame, text="Excel 目录:").grid(row=0, column=0, sticky=tk.W, pady=2)
        excel_entry = ttk.Entry(path_frame, textvariable=self.excel_dir_var, width=60)
        excel_entry.grid(row=0, column=1, sticky=tk.EW, padx=4, pady=2)
        ttk.Button(path_frame, text="浏览...", command=self._browse_excel).grid(row=0, column=2, pady=2)

        # 输出目录
        ttk.Label(path_frame, text="输出目录:").grid(row=1, column=0, sticky=tk.W, pady=2)
        output_entry = ttk.Entry(path_frame, textvariable=self.output_dir_var, width=60)
        output_entry.grid(row=1, column=1, sticky=tk.EW, padx=4, pady=2)
        ttk.Button(path_frame, text="浏览...", command=self._browse_output).grid(row=1, column=2, pady=2)

        path_frame.columnconfigure(1, weight=1)

        # === 表选择区域 ===
        table_frame = ttk.LabelFrame(main_frame, text="选择要导出的表 (不勾选则导出全部)", padding=8)
        table_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 8))

        # 表列表容器 + 滚动条
        table_container = ttk.Frame(table_frame)
        table_container.pack(fill=tk.BOTH, expand=True)

        scrollbar = ttk.Scrollbar(table_container)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        self.table_canvas = tk.Canvas(table_container, yscrollcommand=scrollbar.set, highlightthickness=0)
        self.table_canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.table_canvas.yview)

        self.table_inner = ttk.Frame(self.table_canvas)
        self.table_canvas_window = self.table_canvas.create_window((0, 0), window=self.table_inner, anchor=tk.NW)

        self.table_inner.bind("<Configure>", self._on_table_frame_configure)
        self.table_canvas.bind("<Configure>", self._on_canvas_configure)

        # 全选/取消
        btn_frame = ttk.Frame(table_frame)
        btn_frame.pack(fill=tk.X, pady=(4, 0))
        ttk.Button(btn_frame, text="全选", command=self._select_all).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="取消全选", command=self._deselect_all).pack(side=tk.LEFT, padx=2)
        ttk.Button(btn_frame, text="刷新列表", command=self._refresh_tables).pack(side=tk.LEFT, padx=2)

        # === 操作按钮 ===
        btn_row = ttk.Frame(main_frame)
        btn_row.pack(fill=tk.X, pady=8)

        self.export_btn = ttk.Button(btn_row, text="开始导出", command=self._start_export)
        self.export_btn.pack(side=tk.LEFT, padx=4)

        # === 日志区域 ===
        log_frame = ttk.LabelFrame(main_frame, text="运行日志", padding=4)
        log_frame.pack(fill=tk.BOTH, expand=True)

        self.log_text = scrolledtext.ScrolledText(log_frame, height=12, wrap=tk.WORD, state=tk.DISABLED)
        self.log_text.pack(fill=tk.BOTH, expand=True)

        # 初始化表列表
        self._refresh_tables()

    def _on_table_frame_configure(self, event):
        self.table_canvas.configure(scrollregion=self.table_canvas.bbox("all"))

    def _on_canvas_configure(self, event):
        self.table_canvas.itemconfig(self.table_canvas_window, width=event.width)

    def _browse_excel(self):
        path = filedialog.askdirectory(title="选择 Excel 目录", initialdir=self.excel_dir_var.get())
        if path:
            self.excel_dir_var.set(path)
            self._refresh_tables()

    def _browse_output(self):
        path = filedialog.askdirectory(title="选择输出目录", initialdir=self.output_dir_var.get())
        if path:
            self.output_dir_var.set(path)

    def _refresh_tables(self):
        """刷新 Excel 表列表"""
        for w in self.table_inner.winfo_children():
            w.destroy()
        self.table_vars.clear()

        excel_dir = Path(self.excel_dir_var.get())
        if not excel_dir.exists():
            ttk.Label(self.table_inner, text="(Excel 目录不存在，请选择有效目录)").pack(anchor=tk.W)
            return

        files = [f for f in excel_dir.glob("*.xlsx") if not f.name.startswith("~$")]
        if not files:
            ttk.Label(self.table_inner, text="(未找到 .xlsx 文件)").pack(anchor=tk.W)
            return

        for f in sorted(files, key=lambda x: x.stem):
            var = tk.BooleanVar(value=True)
            self.table_vars[f.stem] = var
            cb = ttk.Checkbutton(self.table_inner, text=f.name, variable=var)
            cb.pack(anchor=tk.W)

    def _select_all(self):
        for var in self.table_vars.values():
            var.set(True)

    def _deselect_all(self):
        for var in self.table_vars.values():
            var.set(False)

    def _log(self, msg: str):
        self.log_text.config(state=tk.NORMAL)
        self.log_text.insert(tk.END, msg + "\n")
        self.log_text.see(tk.END)
        self.log_text.config(state=tk.DISABLED)
        self.root.update_idletasks()

    def _start_export(self):
        if self.exporting:
            return

        excel_dir = self.excel_dir_var.get().strip()
        output_dir = self.output_dir_var.get().strip()

        if not excel_dir:
            messagebox.showerror("错误", "请选择 Excel 目录")
            return
        if not Path(excel_dir).exists():
            messagebox.showerror("错误", f"Excel 目录不存在:\n{excel_dir}")
            return
        if not output_dir:
            messagebox.showerror("错误", "请选择输出目录")
            return

        # 获取选中的表
        selected = [stem for stem, var in self.table_vars.items() if var.get()]
        if not selected:
            messagebox.showwarning("提示", "请至少勾选一个要导出的表")
            return
        tables = selected

        self.exporting = True
        self.export_btn.config(state=tk.DISABLED)
        self.log_text.config(state=tk.NORMAL)
        self.log_text.delete(1.0, tk.END)
        self.log_text.config(state=tk.DISABLED)

        def do_export():
            try:
                run_export(
                    excel_dir=excel_dir,
                    output_dir=output_dir,
                    tables=tables,
                    log_callback=lambda m: self.root.after(0, lambda: self._log(m)),
                )
                self.root.after(0, lambda: self._on_export_done(True))
            except Exception as e:
                self.root.after(0, lambda: self._log(f"异常: {e}"))
                import traceback
                self.root.after(0, lambda: self._log(traceback.format_exc()))
                self.root.after(0, lambda: self._on_export_done(False))

        threading.Thread(target=do_export, daemon=True).start()

    def _on_export_done(self, success: bool):
        self.exporting = False
        self.export_btn.config(state=tk.NORMAL)
        if success:
            messagebox.showinfo("完成", "导表完成！")


def launch_gui():
    app = ExcelToTSGUI()
    app.root.mainloop()


if __name__ == "__main__":
    launch_gui()
