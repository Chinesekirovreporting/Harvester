import { AbstractVo } from "./AbstractVo";
import type { IItemSlot } from "../storage/StorageTypes";

export class ItemVo extends AbstractVo {

    public itemId: number = 0;                      // ItemId设计为GridID，为物品格子的ID
    public count: number = 0;                      // 物品堆叠数量
    public itemCfgID: number = 0;                  // 物品配置ID

    constructor(itemId?: number, count?: number) {
        super();
        if (itemId != null) this.itemId = itemId;
        if (count != null) this.count = count;
    }

    /** 从存储格式创建 ItemVo */
    public static fromSlot(slot: IItemSlot): ItemVo {
        return new ItemVo(slot.itemId, slot.count);
    }

}