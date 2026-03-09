import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderItemBook } from "./RenderItemBook";
import { GButton, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";

/**
 * 物品图鉴窗口，用于显示物品列表
 */
export class WindowItemBook extends AbstractUIWindow {

    private listItem: GList;
    private btnCloseTop: GButton;
    private btnClose: GButton;

    protected getResList(): Array<string> {
        return ["ui/ItemBook", "ui/Icon"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        UICore.registerExtension("ItemBook", "RenderItemBook", RenderItemBook);
        let view = UICore.createObject("ItemBook", "WindowItemBook").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建WindowItemBook视图失败，请检查资源包是否已正确加载");
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

    private listItemRenderer(index: number, item: RenderItemBook): void {
        item.setData(GameModels.itemBook.getItemList()[index]);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.updateItemList();
    }

    private updateItemList(): void {
        this.listItem.numItems = GameModels.itemBook.getItemList().length;
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
