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

    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--name=ExcelToTS",
        "--onefile",                    # 单文件 exe
        "--windowed",                   # 无控制台窗口（GUI 程序）
        "--clean",
        "--noconfirm",                  # 覆盖已存在的输出
        "--hidden-import=openpyxl",
        "--hidden-import=openpyxl.cell._writer",
        str(entry),
    ]

    print("执行打包命令:", " ".join(cmd))
    result = subprocess.run(cmd)
    if result.returncode != 0:
        sys.exit(result.returncode)

    # 复制配置文件到 dist 目录（用户可修改）
    import shutil
    dist_dir = script_dir / "dist"
    if dist_dir.exists():
        config_src = script_dir / "excel_to_ts_config.json"
        config_dst = dist_dir / "excel_to_ts_config.json"
        shutil.copy2(config_src, config_dst)
        print(f"\n打包完成! 可执行文件: {dist_dir / 'ExcelToTS.exe'}")
        print(f"配置文件已复制到: {config_dst}")
        print("可将 dist 目录下的 exe 和 config 一起分发。")


if __name__ == "__main__":
    main()
