import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderBackpack } from "./RenderBackpack";
import { GButton, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";

/**
 * 背包窗口，用于显示玩家拥有的物品
 */
export class WindowBackpack extends AbstractUIWindow {

    private listBackpack: GList;
    private btnCloseTop: GButton;
    private btnClose: GButton;

    protected getResList(): Array<string> {
        return ["ui/Backpack", "ui/Icon"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        UICore.registerExtension("Backpack", "RenderBackpack", RenderBackpack);
        let view = UICore.createObject("Backpack", "WindowBackpack").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建WindowBackpack视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        this.listBackpack = this.view.asCom.getChild("listBackpack") as GList;
        this.listBackpack.setVirtual();
        this.listBackpack.itemRenderer = this.listBackpackRenderer.bind(this);
        this.listBackpack.refreshVirtualList();
        this.btnCloseTop = this.view.asCom.getChild("btnCloseTop") as GButton;
        this.btnCloseTop.onClick(this.onCloseClick, this);
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listBackpackRenderer(index: number, item: RenderBackpack): void {
        const list = GameModels.backpack.getBackpackList();
        item.setData(list[index]);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.updateBackpackList();
    }

    private updateBackpackList(): void {
        this.listBackpack.numItems = GameModels.backpack.getBackpackList().length;
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
