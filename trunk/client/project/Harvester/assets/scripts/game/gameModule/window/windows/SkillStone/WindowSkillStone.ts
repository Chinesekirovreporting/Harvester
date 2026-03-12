import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton } from "fairygui-cc";

export class WindowSkillStone extends AbstractUIWindow {

    private btnClose: GButton;

    protected getResList(): Array<string> {
        return ["ui/SkillStone"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        let view = UICore.createObject("SkillStone", "WindowSkillStone").asCom;
        if (view) {
            this._view = view;
        }
    }

    protected onInitView(): void {
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {

    }

    protected onClose(): void {

    }

    protected onDispose(): void {
        this.btnClose.offClick(this.onCloseClick, this);
        this.btnClose = null;
    }
}