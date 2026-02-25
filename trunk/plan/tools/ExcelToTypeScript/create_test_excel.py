# -*- coding: utf-8 -*-
"""创建测试用 Excel 文件，用于验证导表脚本"""
import openpyxl
from openpyxl import Workbook

wb = Workbook()
ws = wb.active
ws.title = "测试表"

# 第1行: 字段名
ws.append(["ID", "Name", "Type", "IsSuper", "ClientExe", "ClientExe2", "ClientExe3"])
# 第2行: 类型
ws.append(["int", "string", "string", "boolean", "string", "number[]", "number[]"])
# 第3行起: 数据
ws.append([1, "英雄1", "类型1", True, "1", "1,2", "1,2"])
ws.append([2, "英雄2", "类型2", False, "2", "3,4", "3,4"])
ws.append([3, "英雄3", "类型3", True, "3", "5,6", "5,6"])

wb.save(r"D:\HarvesterSvn\trunk\plan\excel\测试表.xlsx")
print("测试 Excel 已创建: 测试表.xlsx")
