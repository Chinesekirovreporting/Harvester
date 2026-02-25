# -*- coding: utf-8 -*-
"""
Excel 自动导表工具 - 将 Excel 配置表转换为 TypeScript 文件
支持类型: int, string, number, boolean 及对应的数组类型 int[], string[], number[], boolean[]
"""
import os
import re
import json
import argparse
import sys
from pathlib import Path


def get_base_path() -> Path:
    """获取脚本或 exe 所在目录（打包后 exe 与配置文件同目录）"""
    if getattr(sys, "frozen", False):
        return Path(sys.executable).parent
    return Path(__file__).parent

try:
    import openpyxl
except ImportError:
    print("请先安装 openpyxl: pip install openpyxl")
    exit(1)

# 默认路径配置
DEFAULT_EXCEL_DIR = r"D:\HarvesterSvn\trunk\plan\excel"
DEFAULT_OUTPUT_BASE = r"D:\HarvesterSvn\trunk\client\project\Harvester\assets\scripts\game\gameModel\table"

# Excel 表名到 TypeScript 类名的映射 (可扩展)
TABLE_NAME_MAP = {
    "英雄表": "HeroBookCFG",
    "窗口表": "WindowCFG",
    "测试表": "TestCFG",
}

# 类型映射: Excel 类型 -> TypeScript 类型
TYPE_MAP = {
    "int": "number",
    "integer": "number",
    "整数": "number",
    "string": "string",
    "str": "string",
    "字符串": "string",
    "number": "number",
    "float": "number",
    "数字": "number",
    "boolean": "boolean",
    "bool": "boolean",
    "布尔": "boolean",
    "int[]": "number[]",
    "integer[]": "number[]",
    "string[]": "string[]",
    "str[]": "string[]",
    "number[]": "number[]",
    "float[]": "number[]",
    "boolean[]": "boolean[]",
    "bool[]": "boolean[]",
}


def load_config(config_path: str) -> dict:
    """加载配置文件"""
    if os.path.exists(config_path):
        with open(config_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def sanitize_class_name(name: str) -> str:
    """将页签名转为合法 TypeScript 类名（去除空格等）"""
    if not name:
        return ""
    s = str(name).strip()
    s = re.sub(r"\s+", "", s)  # 去除空格
    return s if s else ""


def get_table_class_name(excel_name: str, sheet_name: str, config: dict) -> str:
    """
    获取表类名，优先级：sheet_name_map > table_name_map(文件名) > 第一个页签名
    """
    base_name = Path(excel_name).stem
    # 1. 配置中按页签名映射
    if "sheet_name_map" in config and sheet_name in config["sheet_name_map"]:
        return config["sheet_name_map"][sheet_name]
    # 2. 配置中按文件名映射（兼容旧逻辑）
    if "table_name_map" in config and base_name in config["table_name_map"]:
        return config["table_name_map"][base_name]
    # 3. 使用第一个页签名作为类名
    if sheet_name:
        return sanitize_class_name(sheet_name)
    # 4. 回退到文件名
    return TABLE_NAME_MAP.get(base_name, base_name.replace("表", "") + "CFG")


def parse_type(value: str) -> str:
    """解析并规范化类型字符串"""
    if not value:
        return "string"
    value = str(value).strip().lower()
    return TYPE_MAP.get(value, "string")


def parse_value(value, ts_type: str):
    """根据 TypeScript 类型解析单元格值"""
    if value is None:
        if "[]" in ts_type:
            return [] if ts_type.endswith("[]") else []
        if ts_type == "number":
            return 0
        if ts_type == "boolean":
            return False
        return ""

    if ts_type == "number":
        try:
            return int(float(value)) if "." not in str(value) else float(value)
        except (ValueError, TypeError):
            return 0

    if ts_type == "boolean":
        if isinstance(value, bool):
            return value
        s = str(value).strip().lower()
        return s in ("true", "1", "是", "yes", "y")

    if ts_type == "string":
        return str(value).strip()

    # 数组类型
    if ts_type == "number[]":
        if isinstance(value, (list, tuple)):
            return [parse_value(v, "number") for v in value]
        parts = re.split(r"[,，|;；\s]+", str(value))
        return [parse_value(p, "number") for p in parts if str(p).strip()]

    if ts_type == "string[]":
        if isinstance(value, (list, tuple)):
            return [str(v) for v in value]
        parts = re.split(r"[,，|;；\s]+", str(value))
        return [p.strip() for p in parts if str(p).strip()]

    if ts_type == "boolean[]":
        if isinstance(value, (list, tuple)):
            return [parse_value(v, "boolean") for v in value]
        parts = re.split(r"[,，|;；\s]+", str(value))
        return [parse_value(p, "boolean") for p in parts if str(p).strip()]

    return str(value)


def parse_array_value(value, ts_type: str):
    """解析嵌套数组值 (如 number[][] 的单元格 "1,2|3,4")"""
    if value is None:
        return []
    s = str(value).strip()
    if not s:
        return []

    base_type = ts_type.replace("[]", "")
    if "[]" in ts_type and ts_type.endswith("[]") and not ts_type.endswith("[][]"):
        return parse_value(value, ts_type)

    # 嵌套数组: number[][] -> 外层用 | 分隔, 内层用 , 分隔
    if "[][]" in ts_type or (ts_type == "number[]" and "|" in s):
        outer = re.split(r"[|｜]", s)
        result = []
        for part in outer:
            inner = re.split(r"[,，;；\s]+", part.strip())
            result.append([parse_value(p, base_type) for p in inner if str(p).strip()])
        return result

    return parse_value(value, ts_type)


def read_excel(file_path: str) -> tuple:
    """
    读取 Excel 文件
    约定: 第1行=字段名, 第2行=类型, 第3行起=数据
    返回: (fields, types, data_rows, sheet_name)
    """
    wb = openpyxl.load_workbook(file_path, data_only=True)
    ws = wb.active
    sheet_name = ws.title

    rows = list(ws.iter_rows(values_only=True))
    if len(rows) < 2:
        wb.close()
        raise ValueError(f"Excel 至少需要2行(字段名+类型): {file_path}")

    fields = [str(cell).strip() if cell else "" for cell in rows[0]]
    types = [parse_type(cell) for cell in rows[1]]

    # 确保类型行与字段行一一对应
    while len(types) < len(fields):
        types.append("string")
    types = types[: len(fields)]

    data_rows = []
    for row in rows[2:]:
        row_data = []
        for i, cell in enumerate(row):
            if i < len(fields) and fields[i]:
                ts_type = types[i] if i < len(types) else "string"
                row_data.append(parse_array_value(cell, ts_type))
            else:
                row_data.append(None)
        row_data = row_data[: len(fields)]
        if any(v is not None for v in row_data):
            data_rows.append(row_data)

    wb.close()
    return fields, types, data_rows, sheet_name


def build_json_object(fields: list, types: list, data_rows: list) -> dict:
    """构建 Source 的 jsonObject 结构 (列式存储)"""
    result = {}
    for col_idx, field in enumerate(fields):
        if not field:
            continue
        ts_type = types[col_idx] if col_idx < len(types) else "string"
        column_values = []
        for row in data_rows:
            if col_idx < len(row):
                val = row[col_idx]
                column_values.append(val)
            else:
                column_values.append(None)
        result[field] = column_values
    return result


def generate_dollar_cfg(table_name: str, fields: list, types: list) -> str:
    """生成 $XXXCFG.ts"""
    lines = [
        "/**",
        " * File is automatically generated, Please do not modify",
        " */",
        f"export class ${table_name} {{",
    ]
    for field, ts_type in zip(fields, types):
        if field:
            lines.append(f"    public {field}:{ts_type};")
    lines.append("}")
    return "\n".join(lines)


def generate_cfg(table_name: str) -> str:
    """生成 XXXCFG.ts (继承类)"""
    return f"""/**
 * File is automatically generated, Please do not modify
 */
import {{ ${table_name} }} from "./${table_name}";

export class {table_name} extends ${table_name} {{
}}
"""


def format_ts_value(value) -> str:
    """将 Python 值格式化为 TypeScript 字符串"""
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, str):
        escaped = value.replace("\\", "\\\\").replace("'", "\\'").replace('"', '\\"')
        return f'"{escaped}"'
    if isinstance(value, list):
        if all(not isinstance(v, list) for v in value):
            return "[" + ", ".join(format_ts_value(v) for v in value) + "]"
        return "[" + ", ".join(format_ts_value(v) for v in value) + "]"
    return str(value)


def generate_source(table_name: str, json_obj: dict) -> str:
    """生成 $XXXCFGSource.ts"""
    lines = [
        "/**",
        " * File is automatically generated, Please do not modify",
        " */",
        f"export class ${table_name}Source {{",
        "    public static jsonObject:Object = {",
    ]
    entries = []
    for key, values in json_obj.items():
        formatted = format_ts_value(values)
        entries.append(f"        {key}: {formatted}")
    lines.append(",\n".join(entries))
    lines.append("    }")
    lines.append("}")
    return "\n".join(lines)


def generate_tables(all_tables: list) -> str:
    """生成 $Tables.ts"""
    imports = []
    table_entries = []
    clazz_entries = []
    source_entries = []

    for table_name in all_tables:
        imports.append(f'import {{ {table_name} }} from "./tableClass/{table_name}";')
        imports.append(f'import {{ ${table_name}Source }} from "./tableSource/${table_name}Source";')
        clazz_entries.append(f'        "{table_name}": {table_name}')
        source_entries.append(f'        "${table_name}Source": ${table_name}Source')

    table_list = ", ".join(f'"{t}"' for t in all_tables)

    lines = [
        "/**",
        " * File is automatically generated, Please do not modify",
        " */",
        *imports,
        "",
        "export class $Tables {",
        *table_entries,
        "",
        "    // 表格集合",
        f"    public static tableNameList:string[] = [{table_list}];",
        "    // 类映射",
        "    public static clazzMap:Object = {",
        *(",".join(clazz_entries).split(",")),
        "    }",
        "",
        "    public static sourceClazzMap:Object = {",
        *(",".join(source_entries).split(",")),
        "    }",
        "}",
    ]

    import_lines = "\n".join(imports)
    table_lines = "\n".join(f'    public static {t}:string = "{t}";' for t in all_tables)
    clazz_lines = ",\n".join(clazz_entries)
    source_lines = ",\n".join(source_entries)

    return f"""/**
 * File is automatically generated, Please do not modify
 */
{import_lines}

export class $Tables {{
{table_lines}

    // 表格集合
    public static tableNameList:string[] = [{table_list}];
    // 类映射
    public static clazzMap:Object = {{
{clazz_lines}
    }}

    public static sourceClazzMap:Object = {{
{source_lines}
    }}
}}
"""


def run_export(
    excel_dir: str,
    output_dir: str,
    config_path: str = None,
    tables: list = None,
    log_callback=None,
) -> bool:
    """
    执行导表
    :param excel_dir: Excel 目录
    :param output_dir: 输出目录
    :param config_path: 配置文件路径，None 则使用默认
    :param tables: 指定要导出的表名列表，None 则导出全部
    :param log_callback: 日志回调函数 log_callback(msg)
    :return: 是否成功
    """
    def log(msg):
        if log_callback:
            log_callback(msg)
        else:
            print(msg)

    base_path = get_base_path()
    config_path = Path(config_path or base_path / "excel_to_ts_config.json")
    if not config_path.is_absolute():
        config_path = base_path / config_path

    config = load_config(str(config_path))
    excel_dir = Path(excel_dir or config.get("excel_dir", DEFAULT_EXCEL_DIR))
    output_dir = Path(output_dir or config.get("output_dir", DEFAULT_OUTPUT_BASE))

    table_class_dir = output_dir / "tableClass"
    table_source_dir = output_dir / "tableSource"
    table_class_dir.mkdir(parents=True, exist_ok=True)
    table_source_dir.mkdir(parents=True, exist_ok=True)

    excel_files = list(excel_dir.glob("*.xlsx"))
    excel_files = [f for f in excel_files if not f.name.startswith("~$")]

    if tables is not None:  # 空列表表示不导出任何表
        excel_files = [f for f in excel_files if f.stem in tables]

    all_table_names = []

    for excel_path in excel_files:
        try:
            fields, types, data_rows, sheet_name = read_excel(str(excel_path))
            table_name = get_table_class_name(excel_path.name, sheet_name, config)
            log(f"正在处理: {excel_path.name} (页签:{sheet_name}) -> {table_name}")

            if not fields or not any(fields):
                log("  跳过: 无有效字段")
                continue

            json_obj = build_json_object(fields, types, data_rows)

            dollar_cfg = generate_dollar_cfg(table_name, fields, types)
            cfg = generate_cfg(table_name)
            source = generate_source(table_name, json_obj)

            (table_class_dir / f"${table_name}.ts").write_text(dollar_cfg, encoding="utf-8")
            (table_source_dir / f"${table_name}Source.ts").write_text(source, encoding="utf-8")
            # 继承类（不带$）采用增量生成：仅首次生成，已存在则跳过
            cfg_path = table_class_dir / f"{table_name}.ts"
            if not cfg_path.exists():
                cfg_path.write_text(cfg, encoding="utf-8")
                log(f"  生成: ${table_name}.ts, {table_name}.ts, ${table_name}Source.ts")
            else:
                log(f"  生成: ${table_name}.ts, ${table_name}Source.ts (跳过已存在的 {table_name}.ts)")

        except Exception as e:
            log(f"  错误: {excel_path.name} - {e}")
            import traceback
            log(traceback.format_exc())

    if all_table_names:
        tables_content = generate_tables(all_table_names)
        (output_dir / "$Tables.ts").write_text(tables_content, encoding="utf-8")
        log(f"生成: $Tables.ts (包含 {len(all_table_names)} 个表)")
    else:
        log("未生成任何表")

    log("导表完成!")
    return len(all_table_names) > 0


def main():
    parser = argparse.ArgumentParser(description="Excel 转 TypeScript 导表工具")
    parser.add_argument(
        "--excel-dir",
        default=None,
        help=f"Excel 目录 (默认: {DEFAULT_EXCEL_DIR})",
    )
    parser.add_argument(
        "--output-dir",
        default=None,
        help=f"输出目录 (默认: {DEFAULT_OUTPUT_BASE})",
    )
    parser.add_argument(
        "--config",
        default="excel_to_ts_config.json",
        help="配置文件路径",
    )
    parser.add_argument(
        "--tables",
        nargs="*",
        help="指定要导出的表(Excel文件名不含扩展名)，不指定则导出全部",
    )
    parser.add_argument(
        "--cli",
        action="store_true",
        help="使用命令行模式（不加此参数时默认启动图形界面）",
    )
    args = parser.parse_args()

    # 默认启动图形界面，加 --cli 才用命令行模式
    if not args.cli:
        try:
            from excel_to_ts_gui import launch_gui
            launch_gui()
            return
        except Exception as e:
            print(f"启动图形界面失败: {e}")
            print("请尝试: pip install tk (或使用 --cli 进入命令行模式)")

    run_export(
        excel_dir=args.excel_dir or DEFAULT_EXCEL_DIR,
        output_dir=args.output_dir or DEFAULT_OUTPUT_BASE,
        config_path=args.config,
        tables=args.tables if args.tables else None,
    )


if __name__ == "__main__":
    main()
