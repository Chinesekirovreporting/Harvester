import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderSkillBook } from "./RenderSkillBook";
import { GButton, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";

/**
 * 技能图鉴窗口，用于显示技能列表
 */
export class WindowSkillBook extends AbstractUIWindow {

    private listSkillBook: GList;
    private btnCloseTop: GButton;
    private btnClose: GButton;

    protected getResList(): Array<string> {
        return ["ui/SkillBook"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        UICore.registerExtension("SkillBook", "RenderSkillBook", RenderSkillBook);
        let view = UICore.createObject("SkillBook", "WindowSkillBook").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建WindowSkillBook视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        this.listSkillBook = this.view.asCom.getChild("listSkillBook") as GList;
        this.listSkillBook.setVirtual();
        this.listSkillBook.itemRenderer = this.listSkillItemRenderer.bind(this);
        this.listSkillBook.refreshVirtualList();
        this.btnCloseTop = this.view.asCom.getChild("btnCloseTop") as GButton;
        this.btnCloseTop.onClick(this.onCloseClick, this);
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listSkillItemRenderer(index: number, item: RenderSkillBook): void {
        item.setData(GameModels.skill.getSkillList()[index]);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.updateSkillList();
    }

    private updateSkillList(): void {
        this.listSkillBook.numItems = GameModels.skill.getSkillList().length;
    }

    protected onClose(): void {
        // 关闭技能图鉴
    }

    protected onDispose(): void {
        this.btnCloseTop.offClick(this.onCloseClick, this);
        this.btnClose.offClick(this.onCloseClick, this);
        this.listSkillBook = null;
        this.btnCloseTop = null;
        this.btnClose = null;
    }
}
