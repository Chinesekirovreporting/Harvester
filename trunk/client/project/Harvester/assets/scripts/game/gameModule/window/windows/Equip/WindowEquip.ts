import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton, GList, GTextField, Event } from "fairygui-cc";
import { RenderEquip } from "./RenderEquip";
import { GameModels } from "../../../../gameModel/GameModels";
import { EQUIP_SLOT_TYPES } from "../../../../gameModel/ModelEquip";
import type { HeroBookCFG } from "../../../../gameModel/table/tableClass/HeroBookCFG";

/**
 * 英雄装备窗口
 */
export class WindowEquip extends AbstractUIWindow {
    private listEquip: GList;
    private lblHeroName: GTextField;
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
        UICore.registerExtension("Equip", "RenderEquip", RenderEquip);
        let view = UICore.createObject("Equip", "WindowEquip").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建WindowEquip视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        this.listEquip = this.view.asCom.getChild("listEquip") as GList;
        this.lblHeroName = this.view.asCom.getChild("lblHeroName") as GTextField;
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton

        this.listEquip.setVirtual();
        this.listEquip.itemRenderer = this.listEquipRenderer.bind(this);
        this.listEquip.on(Event.CLICK_ITEM, this.onHeroItemClick, this);

        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listEquipRenderer(index: number, item: RenderEquip): void {
        const list = GameModels.heroBook.getHeroBookList();
        item.setData(list[index]);
    }

    private onHeroItemClick(): void {
        // const idx = this.listHero.selectedIndex;
        // if (idx < 0) return;
        // const list = GameModels.heroBook.getHeroBookList();
        // const hero = list[idx];
        // if (hero) {
        //     this._selectedHeroId = hero.ID;
        //     this.refreshEquipSlots();
        // }
    }

    // private refreshEquipSlots(): void {
    //     if (this.lblHeroName) {
    //         const hero = GameModels.heroBook.getHeroBookById(this._selectedHeroId);
    //         this.lblHeroName.text = hero ? hero.Name : "";
    //     }
    // }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.listEquip.numItems = GameModels.heroBook.getHeroBookList().length;
        this.listEquip.refreshVirtualList();
        // 默认选中第一个英雄
        const list = GameModels.heroBook.getHeroBookList();
        if (list.length > 0) {
            this._selectedHeroId = list[0].ID;
            this.listEquip.selectedIndex = 0;
        } else {
            this._selectedHeroId = 0;
        }
        // this.refreshEquipSlots();
    }

    protected onClose(): void {
        // 关闭时清理
    }

    protected onDispose(): void {
        this.listEquip.off(Event.CLICK_ITEM, this.onHeroItemClick, this);
        this.btnClose.offClick(this.onCloseClick, this);
        this.listEquip = null;
        this.lblHeroName = null;
        this.btnClose = null;
    }
}
