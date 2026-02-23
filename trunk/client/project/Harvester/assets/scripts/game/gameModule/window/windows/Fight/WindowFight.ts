import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton, GComponent } from "fairygui-cc";

export class WindowFight extends AbstractUIWindow {
    
    private btnClose:GButton;
    private comPlayer: GComponent;
    private comBoss: GComponent;

    protected getResList(): Array<string> {
        return ["ui/FightCore"];
    }

    protected onInit(): void {
        // UICore.registerExtension("StoryWindow", "StoryRender", RenderGushi);
        // 资源已经在 loadRes() 中加载完成，直接创建视图
        let view = UICore.createObject("FightCore", "FightCoreWindow").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建StoryWindow视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        let btnClose = this.view.asCom.getChild("btnClose");
        if (btnClose) {
            this.btnClose = btnClose as GButton;
            this.btnClose.onClick(this.onCloseClick, this);
        }
        let comPlayer = this.view.asCom.getChild("comPlayer");
        if (comPlayer) {
            this.comPlayer = comPlayer as GComponent;
        }
        let comBoss = this.view.asCom.getChild("comBoss");
        if (comBoss) {
            this.comBoss = comBoss as GComponent;
        }
    }

    private onCloseClick():void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.comPlayer.getChild("txtName").text = "玩家111";
        this.comPlayer.getChild("txtLevel").text = "111";
        this.comPlayer.getChild("txtFight").text = "111";
        this.comBoss.getChild("txtName").text = "boss111";
        this.comBoss.getChild("txtLevel").text = "111";
        this.comBoss.getChild("txtFight").text = "111";
    }

    protected onClose(): void {
        super.onClose();
    }
}