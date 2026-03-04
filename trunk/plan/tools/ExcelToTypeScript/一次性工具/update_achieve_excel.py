# -*- coding: utf-8 -*-
"""更新成就表 Excel 文件 - 添加 Description/Reward/Icon 并填充数据"""
import os
import sys

try:
    import openpyxl
    from openpyxl import Workbook
except ImportError:
    print("Please install openpyxl: pip install openpyxl")
    sys.exit(1)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# plan/tools/ExcelToTypeScript -> plan/excel
EXCEL_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "..", "excel"))


def update_achieve_excel():
    """更新成就表：添加 Description/Reward/Icon 列，填充10条成就数据"""
    excel_path = os.path.join(EXCEL_DIR, "成就表.xlsx")

    fields = ["ID", "Name", "Type", "Description", "Reward", "Icon", "clientExe", "clientExe2", "clientExe3"]
    types = ["int", "string", "string", "string", "string", "string", "number", "number[]", "int[]"]
    data_rows = [
        [1, "初出茅庐", "成长", "完成第一次收获", "100金币", "achieve_first", 1.1, "1.11,1.12", "1,2,3,4,5"],
        [2, "勤劳致富", "成长", "累计收获100次作物", "200金币 + 种子礼包", "achieve_harvest", 1.2, "", ""],
        [3, "收获达人", "成长", "单日收获达到50次", "500金币 + 稀有种子", "achieve_daily", 0, "", ""],
        [4, "金币收藏家", "财富", "累计获得10000金币", "1000金币 + 金锄头", "achieve_gold", 0, "", ""],
        [5, "土地开拓者", "成长", "解锁第5块土地", "新土地解锁券", "achieve_land", 0, "", ""],
        [6, "作物大师", "成长", "种植过10种不同作物", "作物图鉴解锁", "achieve_crop", 0, "", ""],
        [7, "连续登录", "日常", "连续登录7天", "7日登录礼包", "achieve_login", 0, "", ""],
        [8, "任务达人", "任务", "完成20个任务", "任务达人称号", "achieve_task", 0, "", ""],
        [9, "完美主义者", "成就", "达成所有基础成就", "完美成就徽章", "achieve_perfect", 0, "", ""],
        [10, "传奇农夫", "终极", "达成全部成就", "传奇农夫称号 + 限定皮肤", "achieve_legend", 0, "", ""],
    ]

    wb = Workbook()
    ws = wb.active
    ws.title = "成就表"

    ws.append(fields)
    ws.append(types)
    for row in data_rows:
        ws.append(row)

    os.makedirs(EXCEL_DIR, exist_ok=True)
    wb.save(excel_path)
    print("Updated:", excel_path)
    print("Achieve table update done!")


if __name__ == "__main__":
    update_achieve_excel()
