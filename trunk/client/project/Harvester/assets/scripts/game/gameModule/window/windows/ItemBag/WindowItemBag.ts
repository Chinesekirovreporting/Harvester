import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderItemBag } from "./RenderItemBag";
import { GButton, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";

/**
 * 背包窗口，用于显示玩家拥有的物品
 */
export class WindowItemBag extends AbstractUIWindow {

    private listBackpack: GList;
    private btnCloseTop: GButton;
    private btnClose: GButton;

    protected getResList(): Array<string> {
        return ["ui/ItemBag", "ui/Icon"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        UICore.registerExtension("ItemBag", "RenderItemBag", RenderItemBag);
        let view = UICore.createObject("ItemBag", "WindowItemBag").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建 WindowItemBag 视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        this.listBackpack = this.view.asCom.getChild("listItemBag") as GList;
        this.listBackpack.setVirtual();
        this.listBackpack.itemRenderer = this.listItemBagRenderer.bind(this);
        this.listBackpack.refreshVirtualList();
        this.btnCloseTop = this.view.asCom.getChild("btnCloseTop") as GButton;
        this.btnCloseTop.onClick(this.onCloseClick, this);
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listItemBagRenderer(index: number, item: RenderItemBag): void {
        const list = GameModels.itemBag.getItemBagList();
        item.setData(list[index]);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.updateBackpackList();
    }

    private updateBackpackList(): void {
        this.listBackpack.numItems = GameModels.itemBag.getItemBagList().length;
    }

    protected onClose(): void {
        // 关闭背包
    }

    protected onDispose(): void {
        this.btnCloseTop.offClick(this.onCloseClick, this);
        this.btnClose.offClick(this.onCloseClick, this);
        this.listBackpack = null;
        this.btnCloseTop = null;
        this.btnClose = null;
    }
}
