import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { StorageKeys } from "./storage/StorageKeys";
import type { BackpackItemMap } from "./storage/StorageTypes";
import { $Tables } from "./table/$Tables";
import { ItemCFG } from "./table/tableClass/ItemCFG";

/** 背包格子展示数据 */
export interface IBackpackSlotVo {
    itemId: number;
    count: number;
    itemCFG: ItemCFG;
}

export class ModelBackpack extends AbstractModel {
    private _itemMap: BackpackItemMap = {};

    protected init() {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        const data = App.cookieManager.get<BackpackItemMap>(StorageKeys.BACKPACK);
        this._itemMap = data || {};
        // 首次无数据时添加测试物品（物品ID 1,2,3 来自 ItemCFG）
        if (Object.keys(this._itemMap).length === 0) {
            this._itemMap[1] = 5;
            this._itemMap[2] = 3;
            this._itemMap[3] = 1;
            this.saveToStorage();
        }
    }

    private saveToStorage(): void {
        App.cookieManager.set(StorageKeys.BACKPACK, this._itemMap);
    }

    /** 获取背包列表（用于列表展示） */
    public getBackpackList(): IBackpackSlotVo[] {
        const list: IBackpackSlotVo[] = [];
        for (const itemId of Object.keys(this._itemMap).map(Number)) {
            const count = this._itemMap[itemId];
            if (count <= 0) continue;
            const itemCFG = App.tableManager.getTable($Tables.ItemCFG, itemId) as ItemCFG;
            if (itemCFG) {
                list.push({ itemId, count, itemCFG });
            }
        }
        return list;
    }

    /** 获取指定物品数量 */
    public getItemCount(itemId: number): number {
        return this._itemMap[itemId] || 0;
    }

    /** 添加物品 */
    public addItem(itemId: number, count: number): void {
        const cur = this._itemMap[itemId] || 0;
        this._itemMap[itemId] = cur + count;
        this.saveToStorage();
    }

    /** 移除物品 */
    public removeItem(itemId: number, count: number): boolean {
        const cur = this._itemMap[itemId] || 0;
        if (cur < count) return false;
        const remain = cur - count;
        if (remain <= 0) {
            delete this._itemMap[itemId];
        } else {
            this._itemMap[itemId] = remain;
        }
        this.saveToStorage();
        return true;
    }

    /** 设置物品数量（用于调试或初始化） */
    public setItemCount(itemId: number, count: number): void {
        if (count <= 0) {
            delete this._itemMap[itemId];
        } else {
            this._itemMap[itemId] = count;
        }
        this.saveToStorage();
    }
}
