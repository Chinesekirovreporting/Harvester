import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { GComponent, GTextField, GButton } from "fairygui-cc";
import { UICore } from "../../../../../framework/core/ui/UICore";

/**
 * 提示弹窗
 */
export class WindowTip extends AbstractUIWindow {
    
    private txtTitle: GTextField;
    private txtContent: GTextField;
    private btnOK: GComponent;
    private btnClose: GComponent;
    
    protected onInit(): void {
        // 如果视图已存在，直接初始化
        if (this._view) {
            return;
        }
        
        // 加载TipWindow包
        UICore.loadPackage("ui/TipWindow", (err) => {
            if (err) {
                console.error("加载TipWindow包失败:", err);
                return;
            }
            
            // 创建视图
            let view = UICore.createObject("TipWindow", "TipWindow").asCom;
            if (view) {
                this._view = view;
                // 标记为已加载
                this._isLoaded = true;
                
                // 如果已经初始化过，需要手动调用onInitView
                if (this._isInited) {
                    this.onInitView();
                }
            } else {
                console.error("创建TipWindow视图失败");
            }
        });
    }
    
    protected onInitView(): void {
        // 获取子组件
        this.txtTitle = this.getChildComp("txtTitle") as GTextField;
        this.txtContent = this.getChildComp("txtContent") as GTextField;
        this.btnOK = this.getChildComp("btnOK") as GComponent;
        this.btnClose = this.getChildComp("btnClose") as GComponent;
        
        // 绑定按钮事件
        if (this.btnOK) {
            this.btnOK.onClick(this.onOKClick, this);
        }
        
        if (this.btnClose) {
            this.btnClose.onClick(this.onCloseClick, this);
        }
        
        // 设置默认值
        this.setTitle("提示");
        this.setContent("这是一条提示信息");
    }
    
    protected onShow(...args: Array<any>): void {
        // 如果传入了参数，更新标题和内容
        if (args && args.length > 0) {
            if (args[0]) {
                this.setTitle(args[0]);
            }
            if (args[1]) {
                this.setContent(args[1]);
            }
        }
        
        // 居中显示
        if (this._view && this._isShowCenter) {
            this._view.setXY(
                (UICore.root.width - this._view.width) / 2,
                (UICore.root.height - this._view.height) / 2
            );
        }
    }
    
    protected onClose(): void {
        
    }
    
    protected onDispose(): void {
        // 清理事件监听
        if (this.btnOK) {
            this.btnOK.offClick(this.onOKClick, this);
        }
        if (this.btnClose) {
            this.btnClose.offClick(this.onCloseClick, this);
        }
        
        this.txtTitle = null;
        this.txtContent = null;
        this.btnOK = null;
        this.btnClose = null;
    }
    
    /**
     * 设置标题
     */
    public setTitle(title: string): void {
        if (this.txtTitle) {
            this.txtTitle.text = title;
        }
    }
    
    /**
     * 设置内容
     */
    public setContent(content: string): void {
        if (this.txtContent) {
            this.txtContent.text = content;
        }
    }
    
    /**
     * 确认按钮点击
     */
    private onOKClick(): void {
        this.close();
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
        return ["ui/TipWindow"];
    }
}
