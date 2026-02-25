@echo off
chcp 65001 >nul
echo 正在打包 Excel 导表工具...
python build_exe.py
pause
