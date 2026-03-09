import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { ItemVo } from "./data/ItemVo";
import { StorageKeys } from "./storage/StorageKeys";
import type { IItemSlot, ItemBagDict } from "./storage/StorageTypes";
import { $Tables } from "./table/$Tables";
import { ItemCFG } from "./table/tableClass/ItemCFG";

export class ModelItemBag extends AbstractModel {

    public ITEM_BAG_GRID_COUNT:number = 20;             // 背包格子数量
    public itemGridDict:Record<number,ItemVo> = {};   // { gridId: ItemVo } - 物品字典

    protected init() {
        this.loadFromStorage();
    }
    
    // 加载背包物品格式处理
    private loadFromStorage(): void {
        var data = App.cookieManager.get<ItemBagDict>(StorageKeys.ITEM_BAG_DICT);
        for (var gridId in data) {
            this.itemGridDict[gridId] = new ItemVo();
            this.itemGridDict[gridId].gridId = parseInt(gridId);
            this.itemGridDict[gridId].count = data[gridId].count;
            this.itemGridDict[gridId].itemCfgID = data[gridId].itemCfgID;
        }
    }

    /** 保存背包物品字典到存储 */
    private saveToStorage(): void {
        var itemBagDict:ItemBagDict = {};
        for (var itemId in this.itemGridDict) {
            var itemVo:ItemVo = this.itemGridDict[itemId];
            itemBagDict[itemVo.gridId] = { gridId: itemVo.gridId, count: itemVo.count, itemCfgID: itemVo.itemCfgID };
        }
        App.cookieManager.set(StorageKeys.ITEM_BAG_DICT, itemBagDict);
    }

    /** 获取背包列表（用于列表展示） */
    public getItemBagList(): ItemVo[] {
        const list: ItemVo[] = [];
        for (var gridId = 0; gridId < this.ITEM_BAG_GRID_COUNT; gridId++) {
            var itemVo:ItemVo = this.itemGridDict[gridId];
            if(itemVo != null && itemVo.count > 0 && itemVo.itemId > 0) {
                list.push(itemVo);
            }else{
                list.push(null);
            }
        }
        return list;
    }

    /** 获取指定物品数量 */
    public getItemCount(gridId: number): number {
        return this.itemGridDict[gridId].count;
    }

    /** 添加物品 */
    public addItemCount(gridId: number, count: number): void {
        if (this.itemGridDict[gridId]) {
            this.itemGridDict[gridId].count += count;
        }
        this.saveToStorage();
    }

    /** 添加物品*/
    public addItemSlot(gridId: number, itemCfgID: number, count: number): void {
        var itemVo:ItemVo = new ItemVo();
        itemVo.gridId = gridId;
        itemVo.itemCfgID = itemCfgID;
        itemVo.count = count;
        this.itemGridDict[itemVo.gridId] = itemVo;
        this.saveToStorage();
    }

    /** 移除物品 */
    public removeItem(gridId: number, count: number): boolean {
        this.itemGridDict[gridId].count -= count;
        if (this.itemGridDict[gridId].count <= 0) {
            delete this.itemGridDict[gridId];
        }
        this.saveToStorage();
        return true;
    }

    /** 设置物品数量（用于调试或初始化） */
    public setItemCount(gridId: number, count: number): void {
        this.itemGridDict[gridId].count = count;
        this.saveToStorage();
    }
}
