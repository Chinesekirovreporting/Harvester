import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { ItemVo } from "./data/ItemVo";
import { ModelItemBagEvent } from "./ModelItemBagEvent";
import { StorageKeys } from "./storage/StorageKeys";
import type { ItemBagDict } from "./storage/StorageTypes";

export class ModelItemBag extends AbstractModel {

    public ITEM_BAG_GRID_COUNT:number;             // 背包格子数量
    public itemGridDict:Record<number,ItemVo>;   // { gridId: ItemVo } - 物品字典

    constructor() {
        super();
        this.init();
    }

    protected init() {
        this.ITEM_BAG_GRID_COUNT = 20;
        this.itemGridDict = {};
        this.loadFromStorage();
    }

    // 加载背包物品格式处理
    private loadFromStorage(): void {
        var data = App.cookieManager.get<ItemBagDict>(StorageKeys.ITEM_BAG_DICT);
        for (var gridId in data) {
            this.itemGridDict[parseInt(gridId)] = new ItemVo();
            this.itemGridDict[parseInt(gridId)].gridId = parseInt(gridId);
            this.itemGridDict[parseInt(gridId)].count = data[gridId].count;
            this.itemGridDict[parseInt(gridId)].itemCfgID = data[gridId].itemCfgID;
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

    /** 添加新物品到空格子*/
    public addNewItem(itemCfgID: number, count: number): void {
        // 寻找空格子
        var emptyGridId: number = -1;
        for (var gridId = 0; gridId < this.ITEM_BAG_GRID_COUNT; gridId++) {
            if (!this.itemGridDict[gridId]) {
                emptyGridId = gridId;
                break;
            }
        }
        if (emptyGridId == -1) {
            return;
        }
        // 在空格子位置添加物品
        var itemVo:ItemVo = new ItemVo();
        itemVo.itemCfgID = itemCfgID;
        itemVo.count = count;
        itemVo.gridId = emptyGridId;
        this.itemGridDict[emptyGridId] = itemVo;
        this.saveToStorage();
        this.emit(ModelItemBagEvent.ITEM_BAG_UPDATE,itemVo);
    }
    
    /** 添加物品到指定格子*/
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
