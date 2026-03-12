import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { StorageKeys } from "./storage/StorageKeys";
import { $Tables } from "./table/$Tables";
import { ItemCFG } from "./table/tableClass/ItemCFG";

/** 英雄装备存储格式：Record<heroId, Record<slotType, itemId>> */
export type HeroEquipMap = Record<number, Record<string, number>>;

/** 装备槽位类型顺序 */
export const EQUIP_SLOT_TYPES = ["武器", "护甲", "头盔", "靴子", "饰品"] as const;

export class ModelEquip extends AbstractModel {
    private _equipMap: HeroEquipMap = {};

    protected init() {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        const data = App.cookieManager.get<HeroEquipMap>(StorageKeys.HERO_EQUIP_DICT);
        this._equipMap = data || {};
    }

    private saveToStorage(): void {
        App.cookieManager.set(StorageKeys.HERO_EQUIP_DICT, this._equipMap);
    }

    /** 获取英雄各槽位装备的物品ID */
    public getEquippedItems(heroId: number): Record<string, number> {
        return this._equipMap[heroId] || {};
    }

    /** 装备物品 */
    public equipItem(heroId: number, slotType: string, itemId: number): void {
        if (!this._equipMap[heroId]) {
            this._equipMap[heroId] = {};
        }
        this._equipMap[heroId][slotType] = itemId;
        this.saveToStorage();
    }

    /** 卸下装备 */
    public unequipItem(heroId: number, slotType: string): void {
        if (this._equipMap[heroId]) {
            delete this._equipMap[heroId][slotType];
            if (Object.keys(this._equipMap[heroId]).length === 0) {
                delete this._equipMap[heroId];
            }
            this.saveToStorage();
        }
    }

    /** 获取槽位装备的 ItemCFG */
    public getEquipItemCFG(heroId: number, slotType: string): ItemCFG | null {
        const items = this.getEquippedItems(heroId);
        const itemId = items[slotType];
        if (itemId == null) return null;
        return App.tableManager.getTable($Tables.ItemCFG, itemId) as ItemCFG;
    }
}
