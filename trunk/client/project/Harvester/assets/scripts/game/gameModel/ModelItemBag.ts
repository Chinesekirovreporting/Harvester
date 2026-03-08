import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { ItemVo } from "./data/ItemVo";
import { StorageKeys } from "./storage/StorageKeys";
import type { IItemSlot, ItemBagDict } from "./storage/StorageTypes";
import { $Tables } from "./table/$Tables";
import { ItemCFG } from "./table/tableClass/ItemCFG";

export class ModelItemBag extends AbstractModel {

    // public itemGridDict:Record<number,ItemVo> = {}; // 弃用结构
    public itemVoDict:Record<number,ItemVo> = {};   // { itemId: ItemVo } - 物品字典

    protected init() {
        this.loadFromStorage();
    }
    // 加载背包物品格式处理
    private loadFromStorage(): void {
        var data = App.cookieManager.get<ItemBagDict>(StorageKeys.ITEM_BAG_DICT);
        for (var itemId in data) {
            this.itemVoDict[itemId] = new ItemVo();
        }
    }

    /** 保存背包物品字典到存储 */
    private saveToStorage(): void {
        var itemBagDict:ItemBagDict = {};
        for (var itemId in this.itemVoDict) {
            var itemVo:ItemVo = this.itemVoDict[itemId];
            itemBagDict[itemVo.itemId] = { itemId: itemVo.itemId, count: itemVo.count, itemCfgID: itemVo.itemCfgID };
        }
        App.cookieManager.set(StorageKeys.ITEM_BAG_DICT, itemBagDict);
    }

    /** 获取背包列表（用于列表展示） */
    public getItemBagList(): ItemVo[] {
        const list: ItemVo[] = [];
        for (var itemId in this.itemVoDict) {
            var itemVo:ItemVo = this.itemVoDict[itemId];
            if(itemVo.count > 0 && itemVo.itemId > 0) {
                list.push(itemVo);
            }
        }
        return list;
    }

    /** 获取指定物品数量 */
    public getItemCount(itemId: number): number {
        return this.itemVoDict[itemId].count;
    }

    /** 添加物品 */
    public addItemCount(itemId: number, count: number): void {
        var itemBagDict:ItemBagDict = App.cookieManager.get<ItemBagDict>(StorageKeys.ITEM_BAG_DICT);
        if (itemBagDict[itemId]) {
            itemBagDict[itemId].count += count;
        } else {
            itemBagDict[itemId] = { itemId, count, itemCfgID: 0 };
        }
        this.saveToStorage();
    }

    /** 添加物品*/
    public addItemSlot(itemId: number, count: number): void {
        var itemVo:ItemVo = new ItemVo();
        itemVo.itemId = itemId;
        itemVo.count = count;
        this.itemVoDict[itemVo.itemId] = itemVo;
        this.saveToStorage();
    }

    /** 移除物品 */
    public removeItem(itemId: number, count: number): boolean {
        this.itemVoDict[itemId].count -= count;
        if (this.itemVoDict[itemId].count <= 0) {
            delete this.itemVoDict[itemId];
        }
        this.saveToStorage();
        return true;
    }

    /** 设置物品数量（用于调试或初始化） */
    public setItemCount(itemId: number, count: number): void {
        this.itemVoDict[itemId].count = count;
        this.saveToStorage();
    }
}
