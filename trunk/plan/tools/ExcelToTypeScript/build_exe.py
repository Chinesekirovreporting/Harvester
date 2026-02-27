# -*- coding: utf-8 -*-
"""
将 Excel 导表工具打包成可执行文件
运行: python build_exe.py
"""
import os
import subprocess
import sys
from pathlib import Path


def main():
    script_dir = Path(__file__).parent
    os.chdir(script_dir)

    # 检查 PyInstaller
    try:
        import PyInstaller
    except ImportError:
        print("请先安装 PyInstaller: pip install pyinstaller")
        sys.exit(1)

    # 入口文件：使用 GUI 作为主入口
    entry = script_dir / "excel_to_ts_gui.py"
    if not entry.exists():
        entry = script_dir / "excel_to_ts.py"

    # exe 输出到 ExcelToTypeScript 目录，与 excel_to_ts_config.json 同目录，仅保留一份配置
    output_dir = script_dir

    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--name=ExcelToTS",
        "--onefile",                    # 单文件 exe
        "--windowed",                   # 无控制台窗口（GUI 程序）
        "--clean",
        "--noconfirm",                  # 覆盖已存在的输出
        "--distpath", str(output_dir),  # exe 输出到工具目录，与 config 同目录
        "--hidden-import=openpyxl",
        "--hidden-import=openpyxl.cell._writer",
        str(entry),
    ]

    print("执行打包命令:", " ".join(cmd))
    result = subprocess.run(cmd)
    if result.returncode != 0:
        sys.exit(result.returncode)

    print(f"\n打包完成! 可执行文件: {output_dir / 'ExcelToTS.exe'}")
    print("exe 与 excel_to_ts_config.json 同目录，仅此一份配置。")


if __name__ == "__main__":
    main()
