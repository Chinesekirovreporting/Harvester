import { AbstractVo } from "./AbstractVo";
import type { IItemSlot } from "../storage/StorageTypes";
import { ItemCFG } from "../table/tableClass/ItemCFG";
import { $Tables } from "../table/$Tables";
import { App } from "../../../framework/managers/App";

export class ItemVo extends AbstractVo {

    public static ITEM_ID_COUNT:number = 1;

    public itemId: number = 0;                      // ItemId每一个物品实例都有唯一内存ID
    public gridId:number = 0;                       // 物品格子ID（入库）
    public count: number = 0;                      // 物品堆叠数量
    public itemCfgID: number = 0;                  // 物品配置ID

    constructor() {
        super();
        this.itemId =  ItemVo.ITEM_ID_COUNT++;
    }

    public get itemCFG(): ItemCFG {
        return App.tableManager.getTable("ItemCFG",this.itemCfgID) as ItemCFG;
    }
}