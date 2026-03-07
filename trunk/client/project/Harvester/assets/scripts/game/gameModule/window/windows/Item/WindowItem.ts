import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderItem } from "./RenderItem";
import { GButton, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";

/**
 * 物品图鉴窗口，用于显示物品列表
 */
export class WindowItem extends AbstractUIWindow {

    private listItem: GList;
    private btnCloseTop: GButton;
    private btnClose: GButton;

    protected getResList(): Array<string> {
        return ["ui/Item", "ui/Icon"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        UICore.registerExtension("Item", "RenderItem", RenderItem);
        let view = UICore.createObject("Item", "WindowItem").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建WindowItem视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        this.listItem = this.view.asCom.getChild("listItem") as GList;
        this.listItem.setVirtual();
        this.listItem.itemRenderer = this.listItemRenderer.bind(this);
        this.listItem.refreshVirtualList();
        this.btnCloseTop = this.view.asCom.getChild("btnCloseTop") as GButton;
        this.btnCloseTop.onClick(this.onCloseClick, this);
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listItemRenderer(index: number, item: RenderItem): void {
        item.setData(GameModels.item.getItemList()[index]);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.updateItemList();
    }

    private updateItemList(): void {
        this.listItem.numItems = GameModels.item.getItemList().length;
    }

    protected onClose(): void {
        // 关闭物品图鉴
    }

    protected onDispose(): void {
        this.btnCloseTop.offClick(this.onCloseClick, this);
        this.btnClose.offClick(this.onCloseClick, this);
        this.listItem = null;
        this.btnCloseTop = null;
        this.btnClose = null;
    }
}
