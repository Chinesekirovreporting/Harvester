# -*- coding: utf-8 -*-
"""创建道具表 Excel 文件"""
import openpyxl
from openpyxl import Workbook

EXCEL_DIR = r"D:\HarvesterSvn\trunk\plan\excel"


def create_item_table():
    """创建道具表"""
    wb = Workbook()
    ws = wb.active
    ws.title = "道具表"

    # 第1行: 字段名（必须: ID, Name, Type, Desc | 推荐: Icon, StackMax, Price | 可选: EffectIds, Quality, SubType）
    ws.append(["ID", "Name", "Type", "Desc", "Icon", "StackMax", "Price", "EffectIds", "Quality", "SubType"])
    # 第2行: 类型
    ws.append(["int", "string", "string", "string", "string", "int", "int", "int[]", "string", "string"])
    # 第3行起: 数据
    ws.append([1, "生命药水", "消耗品", "恢复少量生命值", "item_potion_hp", 99, 10, "1,2", "普通", "药品"])
    ws.append([2, "魔法药水", "消耗品", "恢复少量魔法值", "item_potion_mp", 99, 15, "3", "普通", "药品"])
    ws.append([3, "传说之剑", "装备", "传说中的神兵利器", "item_sword_legend", 1, 9999, "", "传说", "武器"])

    wb.save(f"{EXCEL_DIR}\\道具表.xlsx")
    print("已创建: 道具表.xlsx")


if __name__ == "__main__":
    create_item_table()
    print("道具表创建完成!")
