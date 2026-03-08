import { App } from "../../framework/managers/App";
import { ObjectUtil } from "../../framework/utils/ObjectUtil";
import { AbstractModel } from "./AbstractModel";
import { $Tables } from "./table/$Tables";
import { ItemCFG } from "./table/tableClass/ItemCFG";

export class ModelItemBook extends AbstractModel {
    protected init() {

    }

    public getItemList(): ItemCFG[] {
        return ObjectUtil.objectToArray<ItemCFG>(App.tableManager.getTables($Tables.ItemCFG));
    }

    public getItemById(id: number): ItemCFG {
        return App.tableManager.getTable($Tables.ItemCFG, id) as ItemCFG;
    }
}
