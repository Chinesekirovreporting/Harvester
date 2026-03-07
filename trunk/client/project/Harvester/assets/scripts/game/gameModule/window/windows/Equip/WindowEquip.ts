import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton, GList, GTextField, Event } from "fairygui-cc";
import { RenderHeroEquip } from "./RenderHeroEquip";
import { RenderEquipSlot, IEquipSlotData } from "./RenderEquipSlot";
import { GameModels } from "../../../../gameModel/GameModels";
import { EQUIP_SLOT_TYPES } from "../../../../gameModel/ModelEquip";
import type { HeroBookCFG } from "../../../../gameModel/table/tableClass/HeroBookCFG";

/**
 * 英雄装备窗口
 */
export class WindowEquip extends AbstractUIWindow {
    private listHero: GList;
    private listEquipSlot: GList;
    private lblHeroName: GTextField;
    private btnCloseTop: GButton;
    private btnClose: GButton;

    /** 当前选中的英雄ID */
    private _selectedHeroId: number = 0;

    protected getResList(): Array<string> {
        return ["ui/Equip", "ui/Icon"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        UICore.registerExtension("Equip", "RenderHeroEquip", RenderHeroEquip);
        UICore.registerExtension("Equip", "RenderEquipSlot", RenderEquipSlot);
        let view = UICore.createObject("Equip", "WindowEquip").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建WindowEquip视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        this.listHero = this.view.asCom.getChild("listHero") as GList;
        this.listEquipSlot = this.view.asCom.getChild("listEquipSlot") as GList;
        this.lblHeroName = this.view.asCom.getChild("lblHeroName") as GTextField;
        this.btnCloseTop = this.view.asCom.getChild("btnCloseTop") as GButton;
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;

        this.listHero.setVirtual();
        this.listHero.itemRenderer = this.listHeroItemRenderer.bind(this);
        this.listHero.on(Event.CLICK_ITEM, this.onHeroItemClick, this);

        this.listEquipSlot.setVirtual();
        this.listEquipSlot.itemRenderer = this.listEquipSlotItemRenderer.bind(this);
        this.listEquipSlot.on(Event.CLICK_ITEM, this.onEquipSlotClick, this);

        this.btnCloseTop.onClick(this.onCloseClick, this);
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listHeroItemRenderer(index: number, item: RenderHeroEquip): void {
        const list = GameModels.heroBook.getHeroBookList();
        item.setData(list[index]);
    }

    private listEquipSlotItemRenderer(index: number, item: RenderEquipSlot): void {
        const slotType = EQUIP_SLOT_TYPES[index];
        const itemCFG = GameModels.equip.getEquipItemCFG(this._selectedHeroId, slotType);
        item.setData({ slotType, itemCFG });
    }

    private onHeroItemClick(): void {
        const idx = this.listHero.selectedIndex;
        if (idx < 0) return;
        const list = GameModels.heroBook.getHeroBookList();
        const hero = list[idx];
        if (hero) {
            this._selectedHeroId = hero.ID;
            this.refreshEquipSlots();
        }
    }

    private onEquipSlotClick(): void {
        const idx = this.listEquipSlot.selectedIndex;
        if (idx < 0 || this._selectedHeroId <= 0) return;
        const slotType = EQUIP_SLOT_TYPES[idx];
        const itemCFG = GameModels.equip.getEquipItemCFG(this._selectedHeroId, slotType);
        if (itemCFG) {
            GameModels.equip.unequipItem(this._selectedHeroId, slotType);
            this.refreshEquipSlots();
        } else {
            // 点击空槽：可扩展打开背包选择装备
            console.log("点击空槽位:", slotType, "可扩展打开背包");
        }
    }

    private refreshEquipSlots(): void {
        if (this.lblHeroName) {
            const hero = GameModels.heroBook.getHeroBookById(this._selectedHeroId);
            this.lblHeroName.text = hero ? hero.Name : "";
        }
        this.listEquipSlot.numItems = EQUIP_SLOT_TYPES.length;
        this.listEquipSlot.refreshVirtualList();
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.listHero.numItems = GameModels.heroBook.getHeroBookList().length;
        this.listHero.refreshVirtualList();
        // 默认选中第一个英雄
        const list = GameModels.heroBook.getHeroBookList();
        if (list.length > 0) {
            this._selectedHeroId = list[0].ID;
            this.listHero.selectedIndex = 0;
        } else {
            this._selectedHeroId = 0;
        }
        this.refreshEquipSlots();
    }

    protected onClose(): void {
        // 关闭时清理
    }

    protected onDispose(): void {
        this.listHero.off(Event.CLICK_ITEM, this.onHeroItemClick, this);
        this.listEquipSlot.off(Event.CLICK_ITEM, this.onEquipSlotClick, this);
        this.btnCloseTop.offClick(this.onCloseClick, this);
        this.btnClose.offClick(this.onCloseClick, this);
        this.listHero = null;
        this.listEquipSlot = null;
        this.lblHeroName = null;
        this.btnCloseTop = null;
        this.btnClose = null;
    }
}
