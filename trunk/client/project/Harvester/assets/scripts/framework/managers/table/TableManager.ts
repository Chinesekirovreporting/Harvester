import { Manager } from "../Manager";
import { $Tables } from "../../../game/gameModel/table/$Tables";

export class TableManager extends Manager {
    private _jsonTables:Object;     // kv：tableName tableDict, KV（tableDict）:Id TableConfigObject

    public constructor() {
        super();
        this.init()
    }

    protected init():void {
        this._jsonTables = {};
    }

    // 解析表数据
    public decodeTable():void {
        // 从Tables拿出对应文件然后根据表名 和 数据字段注册表
        for (const tableName of $Tables.tableNameList) {
            this.registerJsonTables(tableName, $Tables.sourceClazzMap["$" + tableName + "Source"].jsonObject)
        }
    }

    public registerJsonTables(name:string, jsonObject:Object):void {
        // 1.取出表字段 初始化TableDict
        if (this._jsonTables[name] == null) {
            this._jsonTables[name] = {}
        }
        var dict:Object = this._jsonTables[name];
        // 2.赋值TableDict，添加KV Id TableObj（并赋予内容）
        var clazz:any = $Tables.clazzMap[name] // 获取Config对象类定义
        // 遍历ID
        for (let index = 0; index < jsonObject["ID"].length; index++) { 
            dict[jsonObject["ID"][index]] = new clazz();
            for (let key in jsonObject) {
                dict[jsonObject["ID"][index]][key] = jsonObject[key][index]
            }
        }
    }

    public getTables(name:string):any {
        return this._jsonTables[name];
    }

    public getTable(name:string, id:any):any {
        return this._jsonTables[name][id];
    }
}