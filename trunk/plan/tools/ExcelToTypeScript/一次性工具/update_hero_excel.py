# -*- coding: utf-8 -*-
"""更新英雄表 Excel 文件 - 保留神力恩泽，新增9个英雄，共10条数据"""
import os
import sys

try:
    import openpyxl
    from openpyxl import Workbook
except ImportError:
    print("Please install openpyxl: pip install openpyxl")
    sys.exit(1)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# plan/excel 使用绝对路径避免编码问题
EXCEL_DIR = r"D:\HarvesterSvn\trunk\plan\excel"


def update_hero_excel():
    """更新英雄表：保留神力恩泽，新增9个英雄，共10条数据"""
    excel_path = os.path.join(EXCEL_DIR, "英雄表.xlsx")

    fields = ["ID", "Name", "Type", "IsSuper", "ClientExe", "ClientExe2", "ClientExe3"]
    types = ["int", "string", "string", "boolean", "number", "number[]", "int[]"]
    data_rows = [
        [1, "神力恩泽", "圣骑士", True, 1.1, "1.11,1.12", "1,2,3,4,5"],
        [2, "烈焰之心", "法师", True, 0, "", ""],
        [3, "暗影之刃", "刺客", False, 0, "", ""],
        [4, "自然之语", "德鲁伊", True, 0, "", ""],
        [5, "钢铁之盾", "战士", False, 0, "", ""],
        [6, "风暴之眼", "萨满", False, 0, "", ""],
        [7, "光明使者", "牧师", True, 0, "", ""],
        [8, "霜寒之握", "冰法", False, 0, "", ""],
        [9, "大地之怒", "元素使", False, 0, "", ""],
        [10, "星辰之佑", "圣骑", True, 0, "", ""],
    ]

    wb = Workbook()
    ws = wb.active
    ws.title = "英雄表"

    ws.append(fields)
    ws.append(types)
    for row in data_rows:
        ws.append(row)

    os.makedirs(EXCEL_DIR, exist_ok=True)
    wb.save(excel_path)
    print("Updated:", excel_path)
    print("Hero table update done! 10 heroes: 神力恩泽 + 9 new heroes.")


if __name__ == "__main__":
    update_hero_excel()
