import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderItemBag } from "./RenderItemBag";
import { GButton, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";
import { ModelItemBagEvent } from "../../../../gameModel/ModelItemBagEvent";
import { ItemVo } from "../../../../gameModel/data/ItemVo";

/**
 * 背包窗口，用于显示玩家拥有的物品
 */
export class WindowItemBag extends AbstractUIWindow {

    private listItemBag: GList;
    private btnAddItem:GButton;
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
        this.listItemBag = this.view.asCom.getChild("listItemBag") as GList;
        this.listItemBag.setVirtual();
        this.listItemBag.itemRenderer = this.listItemBagRenderer.bind(this);
        this.listItemBag.refreshVirtualList();
        this.btnAddItem = this.view.asCom.getChild("btnAddItem") as GButton;
        this.btnAddItem.onClick(this.onAddItemClick, this);
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listItemBagRenderer(index: number, item: RenderItemBag): void {
        const list = GameModels.itemBag.getItemBagList();
        item.setData(list[index]);
    }

    private onAddItemClick(): void {
        console.log("点击添加物品按钮");
        GameModels.itemBag.addNewItem(1,1);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        // GameModels.itemBag.on(ModelItemBagEvent.ITEM_BAG_UPDATE, this.onItemBagUpdate, this);
        this.updateBackpackList();
    }

    // private onItemBagUpdate(itemVo: ItemVo): void {
    //     console.log("onItemBagUpdate", itemVo.itemCfgID.toString());
    //     this.updateBackpackList();
    // }

    private updateBackpackList(): void {
        this.listItemBag.numItems = GameModels.itemBag.getItemBagList().length;
    }

    protected onClose(): void {
        // 关闭背包
        // GameModels.itemBag.off(ModelItemBagEvent.ITEM_BAG_UPDATE, this.onItemBagUpdate, this);
    }

    protected onDispose(): void {
        this.btnClose.offClick(this.onCloseClick, this);
        this.btnClose = null;
        this.listItemBag = null;
    }
}
