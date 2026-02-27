# -*- coding: utf-8 -*-
"""创建任务表、子任务表 Excel 文件"""
import openpyxl
from openpyxl import Workbook

EXCEL_DIR = r"D:\HarvesterSvn\trunk\plan\excel"


def create_task_table():
    """创建任务表"""
    wb = Workbook()
    ws = wb.active
    ws.title = "任务表"

    # 第1行: 字段名
    ws.append(["ID", "Name", "Type", "Desc", "PreTask", "SubTaskIds", "Reward"])
    # 第2行: 类型 (int, string, number, boolean, int[], string[], number[], boolean[])
    ws.append(["int", "string", "string", "string", "int", "int[]", "string"])
    # 第3行起: 数据
    ws.append([1, "主线任务1", "主线", "完成新手引导", 0, "1,2,3", "100金币"])
    ws.append([2, "支线任务1", "支线", "收集10个木材", 1, "4,5", "50经验"])
    ws.append([3, "日常任务1", "日常", "击败5只怪物", 0, "6", "20钻石"])

    wb.save(f"{EXCEL_DIR}\\任务表.xlsx")
    print("已创建: 任务表.xlsx")


def create_subtask_table():
    """创建子任务表"""
    wb = Workbook()
    ws = wb.active
    ws.title = "子任务表"

    # 第1行: 字段名
    ws.append(["ID", "TaskId", "Name", "Type", "Target", "Progress", "Reward"])
    # 第2行: 类型
    ws.append(["int", "int", "string", "string", "string", "int", "string"])
    # 第3行起: 数据 (与任务表对应，TaskId关联任务表ID)
    ws.append([1, 1, "点击开始按钮", "引导", "完成点击", 1, ""])
    ws.append([2, 1, "选择英雄", "引导", "选择一名英雄", 1, ""])
    ws.append([3, 1, "进入战斗", "引导", "进入第一场战斗", 1, ""])
    ws.append([4, 2, "收集木材1", "收集", "收集5个木材", 5, ""])
    ws.append([5, 2, "收集木材2", "收集", "再收集5个木材", 5, ""])
    ws.append([6, 3, "击败怪物", "战斗", "击败5只怪物", 5, ""])

    wb.save(f"{EXCEL_DIR}\\子任务表.xlsx")
    print("已创建: 子任务表.xlsx")


if __name__ == "__main__":
    create_task_table()
    create_subtask_table()
    print("任务表、子任务表创建完成!")
