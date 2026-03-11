import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderAchieve } from "./RenderAchieve";
import { GButton, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";

/**
 * Achieve window用于显示成就列表和相关操作
 * TODO: 后续可扩展监听事件或其他UI组件
 */
export class WindowAchieve extends AbstractUIWindow {

    private listAchieve: GList;
    private btnClose:GButton;

    /**
     * 资源列表
     */
    protected getResList(): Array<string> {
        return ["ui/Achieve", "ui/Icon"];
    }

    protected onInit(): void {
        // 如果视图已存在，直接返回
        if (this._view) {
            return;
        }
        UICore.registerExtension("Achieve", "RenderAchieve", RenderAchieve);
        // 资源已经在 loadRes() 中加载完成，直接创建视图
        let view = UICore.createObject("Achieve", "WindowAchieve").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建StoryWindow视图失败，请检查资源包是否已正确加载");
        }
    }
    
    /**
     * 初始化视图组件
     */
    protected onInitView(): void {
        this.listAchieve = this.view.asCom.getChild("listAchieve") as GList;
        this.listAchieve.setVirtual();
        this.listAchieve.itemRenderer = this.listAchieveItemRenderer.bind(this);
        this.listAchieve.refreshVirtualList();
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listAchieveItemRenderer(index: number, item: RenderAchieve): void {
        item.setData(GameModels.achieve.getAchieveList()[index]);
    }

    private onCloseClick():void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        // 显示成就列表
        this.updateAchieveList();
    }

    private updateAchieveList():void {
        this.listAchieve.numItems = GameModels.achieve.getAchieveList().length;
    }

    protected onClose(): void {
        // TODO: 关闭成就列表
    }

    protected onDispose(): void {
        
    }
}