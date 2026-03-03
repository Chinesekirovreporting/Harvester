import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton, GComponent, GLoader } from "fairygui-cc";

export class WindowFightCore extends AbstractUIWindow {
    
    private btnClose: GButton;
    private comPlayer1: GComponent;
    private comBoss1: GComponent;
    private loaderFight:GLoader;

    protected getResList(): Array<string> {
        return ["ui/FightCore"];
    }

    protected onInit(): void {
        // UICore.registerExtension("StoryWindow", "StoryRender", RenderGushi);
        // 资源已经在 loadRes() 中加载完成，直接创建视图
        let view = UICore.createObject("FightCore", "WindowFightCore").asCom;
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
        let comPlayer = this.view.asCom.getChild("comPlayer1");
        if (comPlayer) {
            this.comPlayer1 = comPlayer as GComponent;
        }
        let comBoss = this.view.asCom.getChild("comBoss1");
        if (comBoss) {
            this.comBoss1 = comBoss as GComponent;
        }
        this.loaderFight = this.view.asCom.getChild("loaderFight") as GLoader;
    }

    private onCloseClick():void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.comPlayer1.getChild("txtName").text = "玩家111";
        this.comPlayer1.getChild("txtLevel").text = "111";
        this.comPlayer1.getChild("txtFight").text = "111";
        this.comBoss1.getChild("txtName").text = "boss111";
        this.comBoss1.getChild("txtLevel").text = "111";
        this.comBoss1.getChild("txtFight").text = "111";
    }

    protected onClose(): void {
        super.onClose();
    }
}