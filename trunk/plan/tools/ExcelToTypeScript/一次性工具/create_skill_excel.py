# -*- coding: utf-8 -*-
"""创建技能表 Excel 文件"""
import openpyxl
from openpyxl import Workbook

EXCEL_DIR = r"D:\HarvesterSvn\trunk\plan\excel"


def create_skill_table():
    """创建技能表"""
    wb = Workbook()
    ws = wb.active
    ws.title = "技能表"

    # 第1行: 字段名
    ws.append(["ID", "Name", "Type", "Desc", "Cooldown", "Cost", "EffectIds", "Level", "Icon"])
    # 第2行: 类型
    ws.append(["int", "string", "string", "string", "number", "int", "int[]", "int", "string"])
    # 第3行起: 数据
    ws.append([1, "火球术", "主动", "发射火球造成伤害", 5.0, 10, "1,2", 1, "skill_fireball"])
    ws.append([2, "治疗术", "主动", "恢复生命值", 8.0, 15, "3", 1, "skill_heal"])
    ws.append([3, "狂暴", "被动", "提升攻击力", 0, 0, "4,5", 1, "skill_berserk"])

    wb.save(f"{EXCEL_DIR}\\技能表.xlsx")
    print("已创建: 技能表.xlsx")


if __name__ == "__main__":
    create_skill_table()
    print("技能表创建完成!")
