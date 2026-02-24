import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { GComponent, GObject, GList, GTextField, GButton } from "fairygui-cc";
import { UICore } from "../../../../../framework/core/ui/UICore";
import { Color } from "cc";
import { RenderHeroBook } from "./RenderHeroBook";
import { GameModules } from "../../../GameModules";
import { GameModels } from "../../../../gameModel/GameModels";

/**
 * 故事模式窗口
 */
export class WindowHeroBook extends AbstractUIWindow {
    /**
     * 资源列表
     */
    protected getResList(): Array<string> {
        return ["ui/HeroBook"];
    }
    private listHeroBook: GList;
    private btnClose: GButton;
    
    /**
     * 初始化窗口
     * 注意：此时资源已经通过 loadRes() 加载完成，可以直接创建视图
     */
    protected onInit(): void {
        // 如果视图已存在，直接返回
        if (this._view) {
            return;
        }
        UICore.registerExtension("HeroBook", "HeroBookRender", RenderHeroBook);
        // 资源已经在 loadRes() 中加载完成，直接创建视图
        let view = UICore.createObject("HeroBook", "HeroBookWindow").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建StoryWindow视图失败，请检查资源包是否已正确加载");
        }
    }
    
    /**
     * 初始化视图组件
     * 在视图创建后调用，用于获取子组件和绑定事件
     */
    protected onInitView(): void {
        // 获取子组件
        
        // 获取关闭按钮（底部关闭按钮）
        this.btnClose = this.getChildComp("btnClose") as GButton;
        this.listHeroBook = this.getChildComp("listHeroBook") as GList;
        // 绑定关闭按钮事件
        if (this.btnClose) {
            this.btnClose.onClick(this.onCloseClick, this);
        }
        
        // 初始化故事列表
        this.initHeroBookList();
    }

    /**
     * 显示窗口
     * 注意：此时视图已经创建并初始化完成，只需要处理显示相关的逻辑
     */
    protected onShow(...args: Array<any>): void {
        // 显示相关的逻辑可以在这里处理
        // GameModules.moduleSkill.addEventListener("STORY_DATA_UPDATED", this.onStoryDataUpdated, this);

        // 例如：刷新数据、播放动画等
        this.updateHeroBookList();
    }

    private initHeroBookList(): void { 
        this.listHeroBook.setVirtual();
        this.listHeroBook.itemRenderer = this.listHeroBookItemRenderer.bind(this);
        this.listHeroBook.refreshVirtualList();
    }

    private updateHeroBookList(): void {
        this.listHeroBook.numItems = GameModels.heroBook.getHeroBookList().length || 0;
    }

    private listHeroBookItemRenderer(index: number, item: RenderHeroBook): void {
        item.setData(GameModels.heroBook.getHeroBookList()[index]);
    }

    protected onClose(): void {
        // GameModules.moduleSkill.removeEventListener("STORY_DATA_UPDATED", this.onStoryDataUpdated, this);
    }

    protected onDispose(): void {
        // 清理事件监听
        if (this.btnClose) {
            this.btnClose.offClick(this.onCloseClick, this);
        }
        
        // 清理右上角关闭按钮
        let btnCloseTop = this.getChildComp("btnCloseTop");
        if (btnCloseTop) {
            btnCloseTop.offClick(this.onCloseClick, this);
        }
        this.listHeroBook = null;
        this.btnClose = null;
    }
    
    /**
     * 关闭按钮点击
     */
    private onCloseClick(): void {
        this.close();
    }
    
}