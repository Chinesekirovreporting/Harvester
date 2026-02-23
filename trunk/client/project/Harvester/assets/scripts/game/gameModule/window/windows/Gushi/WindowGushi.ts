import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { GComponent, GObject, GList, GTextField, GButton } from "fairygui-cc";
import { UICore } from "../../../../../framework/core/ui/UICore";
import { Color } from "cc";
import { RenderGushi } from "./RenderGushi";
import { GameModules } from "../../../GameModules";

/**
 * 故事模式窗口
 */
export class WindowGushi extends AbstractUIWindow {
    
    private txtTitle: GObject;
    private listStory: GList;
    private listData:Object[] = [{a:1,b:2,c:3},{a:4,b:5,c:6},{a:7,b:8,c:9}];
    private txtTip: GObject;
    private btnClose: GObject;
    
    /**
     * 初始化窗口
     * 注意：此时资源已经通过 loadRes() 加载完成，可以直接创建视图
     */
    protected onInit(): void {
        // 如果视图已存在，直接返回
        if (this._view) {
            return;
        }
        UICore.registerExtension("StoryWindow", "StoryRender", RenderGushi);
        // 资源已经在 loadRes() 中加载完成，直接创建视图
        let view = UICore.createObject("StoryWindow", "StoryWindow").asCom;
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
        this.txtTitle = this.getChildComp("txtTitle");
        this.listStory = this.getChildComp("listStory") as GList;
        this.txtTip = this.getChildComp("txtTip");
        
        // 获取关闭按钮（底部关闭按钮）
        this.btnClose = this.getChildComp("btnClose");
        
        // 获取右上角关闭按钮
        let btnCloseTop = this.getChildComp("btnCloseTop");
        
        // 绑定关闭按钮事件
        if (this.btnClose) {
            this.btnClose.onClick(this.onCloseClick, this);
        }
        if (btnCloseTop) {
            btnCloseTop.onClick(this.onCloseClick, this);
        }
        
        // 设置标题
        if (this.txtTitle) {
            this.txtTitle.text = "📖 奇妙故事物语";
        }
        
        // 设置返回按钮文本
        if (this.btnClose) {
            let btnCloseComponent = this.btnClose.asCom;
            if (btnCloseComponent) {
                // 尝试获取title子对象并设置文本
                let titleObj = btnCloseComponent.getChild("title");
                if (titleObj) {
                    titleObj.text = "返回主菜单";
                } else {
                    // 如果btnClose本身是Button，尝试直接设置title属性
                    let btnButton = btnCloseComponent as any;
                    if (btnButton && typeof btnButton.title !== 'undefined') {
                        btnButton.title = "返回主菜单";
                    }
                }
            }
        }
        // 初始化故事列表
        this.initStoryList();
    }

    /**
     * 显示窗口
     * 注意：此时视图已经创建并初始化完成，只需要处理显示相关的逻辑
     */
    protected onShow(...args: Array<any>): void {
        // 显示相关的逻辑可以在这里处理
        // GameModules.moduleSkill.addEventListener("STORY_DATA_UPDATED", this.onStoryDataUpdated, this);

        // 例如：刷新数据、播放动画等
        this.updateStoryList();
    }

    private initStoryList(): void { 
        this.listStory.setVirtual();
        this.listStory.itemRenderer = this.listStoryItemRenderer.bind(this);
        this.listStory.refreshVirtualList();
    }

    private updateStoryList(): void {
        this.listStory.numItems = this.listData.length;
    }

    private listStoryItemRenderer(index: number, item: RenderGushi): void {
        item.setData(this.listData[index]);
    }

    private onStoryDataUpdated(newData: Object[]): void {

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
        
        this.txtTitle = null;
        this.listStory = null;
        this.txtTip = null;
        this.btnClose = null;
    }
    
    /**
     * 关闭按钮点击
     */
    private onCloseClick(): void {
        this.close();
    }
    
    /**
     * 资源列表
     */
    protected getResList(): Array<string> {
        return ["ui/StoryWindow"];
    }
}