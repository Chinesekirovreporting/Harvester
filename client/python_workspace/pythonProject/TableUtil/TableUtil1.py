import string
import json
import openpyxl
from collections import OrderedDict
#import TableString

class TableUtil1:
    __excelToDataFileUrl = r"E:\HarvesterSvn\trunk\publish\data\excelTodata.json"
    __xlxsFolderUrl = r"E:\HarvesterSvn\trunk\plan\excel"

    def __init__(self):
        self.__xlsToDataClass()

    # 读取配置文件信息json文件
    # 读取XLSX文件内容
    # 序列化XLSX数据
    # 整理成Data对象
    # 输出TS配置文件 3个 1.data文件（单一基类文件），class文件（单一实体文件），source文件（类Json数据文件）TO DO
    # 逐条细化成配置文件整理IO流生成文件
        #1.生成数据基类加载数据
        #2.生成基类配置文件
        #3.生成表格文件 用于编写CFG相关数据
    def __xlsToDataClass(self) -> bool:
        #1.读取Json文件
        local_data = None
        with open(self.__excelToDataFileUrl, 'r', encoding="utf-8") as f:
            local_data = json.load(f)
            print(local_data)
        #2 遍历配置文件 分别读取表格数据 存入tableOrderDict中 sample --> {'ID': [1], 'Name': ['成就1'], 'Type': [0], 'clientExe': [0], 'clientExe1': [0]}
        for key, value in local_data.items():
            xlsxStr:string = self.__xlxsFolderUrl + "\\" + key + ".xlsx"
            # 读取并存入单表数据
            #self.__readXlsxReturnTableData(xlsxStr)
            tableODict, tabletypeList = self.__readXlsxReturnTableData(xlsxStr)
            #self.__createConfigTsFile(tableODict, tabletypeList)
            #TableString.getTableString()
        return False

    # 单个表读取方案
    def __readXlsxReturnTableData(self,xlsxStr:string):
        # 获取表格路径
        print("遍历表格路径" + xlsxStr)
        # 读取xlsx文件
        workbook = openpyxl.load_workbook(xlsxStr)
        # 获取工作表，默认获取第一个工作表
        sheet = workbook.active
        # 读取工作表中的数据
        rowCount = 1  # 字段行数
        tableODict = OrderedDict()  # sample --> key:ID value:[1,2,3]
        tabletypeList = []  # sample --> key:ID value:number
        for row in sheet.iter_rows(values_only=True):
            print(rowCount)
            # 获取字段类型
            print("查看是否相等", RowType.TypeName, rowCount)
            if rowCount == RowType.TypeName.value:
                # 初始化字段数组
                for typeName in row:
                    tableODict[typeName] = []
            elif rowCount == RowType.ClientOrServer.value:
                pass
            elif rowCount == RowType.TypeType.value:
                # 初始化字段类型
                for typeName in row:
                    tabletypeList.append(typeName)
            else:
                # 表格横向遍历
                for index, item in enumerate(row):
                    # 通过横向数据的index获取orderDictKey对应的key，并加入其中
                    keys = list(tableODict.keys())
                    ODictkey = keys[index]
                    typeName = tabletypeList[index]
                    value = item
                    # 将元素添加进表单中
                    if typeName == "int":
                        if value is None:
                            value = 0
                    if typeName == "number":
                        if value is None:
                            value = 0
                    elif typeName == "string":
                        if value is None:
                            value = ""
                    elif typeName == "int[]":
                        if value is None:
                            value = []
                        else:
                            value = str(item).split(",")
                    elif typeName == "number[]":
                        if value is None:
                            value = []
                        else:
                            value = str(item).split(",")
                    elif typeName == "string[]":
                        if value is None:
                            value = []
                        else:
                            value = str(item).split(",")
                    tableODict[ODictkey].append(value)
                    print("将元素", item, "添加至", ODictkey, "字段中")
            print(row)
            print("表格打印", tableODict)
            rowCount += 1
        # 读取工作表中的数据结束
        workbook.close()
        return tableODict,tabletypeList

from enum import Enum
class RowType(Enum):
    Data = 0
    TypeName = 1
    ClientOrServer = 2
    TypeType = 3
