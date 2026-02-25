# Excel 转 TypeScript 导表工具

将 Excel 配置表自动转换为 TypeScript 文件，用于游戏配置表管理。

## 安装依赖

```bash
pip install -r requirements.txt
```

## Excel 格式约定

- **第一个页签名称**: 作为生成的 TypeScript 类名（如页签名为 `HeroBookCFG` 则生成 `HeroBookCFG` 相关文件）
- **第 1 行**: 字段名（如 ID, Name, Type, IsSuper, ClientExe 等）
- **第 2 行**: 类型定义
- **第 3 行起**: 数据行

### 支持的类型

| Excel 类型 | TypeScript 类型 |
|-----------|----------------|
| int, integer, 整数 | number |
| string, str, 字符串 | string |
| number, float, 数字 | number |
| boolean, bool, 布尔 | boolean |
| int[], integer[] | number[] |
| string[], str[] | string[] |
| number[], float[] | number[] |
| boolean[], bool[] | boolean[] |

### 数组格式说明

- **一维数组**: 单元格内用 `,` 或 `|` 或 `;` 分隔，如 `1,2,3` 或 `a|b|c`
- **二维数组**: 外层用 `|` 分隔，内层用 `,` 分隔，如 `1,2|3,4|5,6`

## 使用方法

### 图形界面（推荐）

```bash
# 直接运行，默认启动图形界面
python excel_to_ts.py

# 或直接运行 GUI 模块
python excel_to_ts_gui.py
```

在图形界面中可以：
- 选择 Excel 目录和输出目录
- 勾选要导出的表（支持全选/取消全选）
- 查看实时运行日志

### 命令行

```bash
# 使用命令行模式（需加 --cli）
python excel_to_ts.py --cli

# 导出 excel 目录下所有表
python excel_to_ts.py --cli

# 指定 Excel 目录和输出目录
python excel_to_ts.py --cli --excel-dir "D:\HarvesterSvn\trunk\plan\excel" --output-dir "D:\HarvesterSvn\trunk\client\project\Harvester\assets\scripts\game\gameModel\table"

# 只导出指定表
python excel_to_ts.py --cli --tables 英雄表 窗口表
```

## 配置文件

可选配置文件 `excel_to_ts_config.json`:

```json
{
  "table_name_map": {
    "英雄表": "HeroBookCFG",
    "窗口表": "WindowCFG"
  },
  "excel_dir": "D:\\HarvesterSvn\\trunk\\plan\\excel",
  "output_dir": "D:\\HarvesterSvn\\trunk\\client\\project\\Harvester\\assets\\scripts\\game\\gameModel\\table"
}
```

- `sheet_name_map`: Excel 第一个页签名 到 TypeScript 类名的映射（优先）
- `table_name_map`: Excel 文件名(无扩展名) 到 TypeScript 类名的映射（兼容）
- `excel_dir`: Excel 源文件目录
- `output_dir`: 生成的 TS 文件输出目录

## 生成文件说明

每个 Excel 表会生成 3 个文件：

1. **$XXXCFG.ts** - 配置类定义（字段与类型），每次覆盖
2. **XXXCFG.ts** - 继承类（可在此扩展业务逻辑），**增量生成**：仅首次生成，已存在则跳过
3. **$XXXCFGSource.ts** - 静态数据源（jsonObject），每次覆盖

同时会更新 **$Tables.ts** - 汇总所有表的注册信息。

## 打包成可执行文件

```bash
# 1. 安装打包依赖
pip install pyinstaller

# 2. 执行打包
python build_exe.py

# 或 Windows 下双击
build.bat
```

打包完成后，在 `dist` 目录下生成 `ExcelToTS.exe`，将 `excel_to_ts_config.json` 与 exe 放在同一目录即可使用。可单独分发 exe 和配置文件。
