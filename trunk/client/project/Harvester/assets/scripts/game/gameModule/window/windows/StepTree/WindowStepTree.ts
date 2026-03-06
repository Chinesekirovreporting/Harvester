import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton } from "fairygui-cc";

export class WindowStepTree extends AbstractUIWindow {
    private btnClose:GButton;

    protected getResList(): Array<string> {
        return ["ui/StepTree"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        let view = UICore.createObject("StepTree", "WindowStepTree").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建 WindowStepTree 视图失败，请检查资源包是否已正确加载");
        }
    }

    /**
     * 初始化视图组件
     */
    protected onInitView(): void {
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private onCloseClick():void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {

    }

    protected onClose(): void {
        // TODO: 关闭成就列表
    }

    protected onDispose(): void {
        
    }
}