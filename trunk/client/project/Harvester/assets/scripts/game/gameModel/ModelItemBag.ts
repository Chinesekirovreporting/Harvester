import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { ItemVo } from "./data/ItemVo";
import { StorageKeys } from "./storage/StorageKeys";
import type { IItemSlot, ItemBagDict } from "./storage/StorageTypes";
import { $Tables } from "./table/$Tables";
import { ItemCFG } from "./table/tableClass/ItemCFG";

export class ModelItemBag extends AbstractModel {

    public itemGridDict:Record<number,ItemVo> = {}; // 背包物品字典数据库

    protected init() {
        this.loadFromStorage();
    }
    // 加载背包物品格式处理
    private loadFromStorage(): void {
        var data = App.cookieManager.get<ItemBagDict>(StorageKeys.ITEM_BAG_DICT);
        for (var itemId in data) {
            this.itemGridDict[data[itemId].gridId] = new ItemVo();
        }
    }

    /** 保存背包物品字典到存储 */
    private saveToStorage(): void {
        var itemBagDict:ItemBagDict = {};
        for (var gridId in this.itemGridDict) {
            var itemVo:ItemVo = this.itemGridDict[gridId];
            itemBagDict[itemVo.itemId] = { gridId: Number(gridId), itemId: itemVo.itemId, count: itemVo.count };
        }
        App.cookieManager.set(StorageKeys.ITEM_BAG_DICT, itemBagDict);
    }

    /** 获取背包列表（用于列表展示） */
    public getItemBagList(): ItemVo[] {
        const list: ItemVo[] = [];
        for (var gridId in this.itemGridDict) {
            list.push(this.itemGridDict[gridId]);
        }
        return list;
    }

    /** 获取指定物品数量 */
    public getItemCount(itemId: number): number {
        return this.itemGridDict[itemId].count || 0;
    }

    /** 添加物品格子 */
    public addItemSlot(itemId: number, count: number): void {
        var itemSlot: IItemSlot = { gridId: 0, itemId, count };
        this.itemGridDict[0] = new ItemVo();
        this.saveToStorage();
    }

    /** 添加物品 */
    public addItemCount(itemId: number, count: number): void {
        this.itemGridDict[itemId].count += count;
        this.saveToStorage();
    }

    /** 移除物品 */
    public removeItem(itemId: number, count: number): boolean {
        this.itemGridDict[itemId].count -= count;
        if (this.itemGridDict[itemId].count <= 0) {
            delete this.itemGridDict[itemId];
        }
        this.saveToStorage();
        return true;
    }

    /** 设置物品数量（用于调试或初始化） */
    public setItemCount(itemId: number, count: number): void {
        this.itemGridDict[itemId].count = count;
        this.saveToStorage();
    }
}
