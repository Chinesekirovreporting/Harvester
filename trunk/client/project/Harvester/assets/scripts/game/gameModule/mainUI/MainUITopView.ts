import { GComponent } from "fairygui-cc";
import { AbstractUIView } from "../../../framework/core/ui/AbstractUIView";
import { GameModules } from "../GameModules";

export class MainUITopView extends AbstractUIView {
    public btnGushi:GComponent;
    public btnRogue:GComponent;
    public btnZhuangbei:GComponent;
    public btnWupin:GComponent;
    public btnTalent:GComponent;
    public btnSkill:GComponent;
    public btnHeroExchange:GComponent;
    public btnHeroBook:GComponent;
    public btnAchievement:GComponent;

    public onInit(): void {
        this.btnGushi = this.view.asCom.getChild("btnGushi").asCom;
        this.btnRogue = this.view.asCom.getChild("btnRogue").asCom;
        this.btnZhuangbei = this.view.asCom.getChild("btnZhuangbei").asCom;
        this.btnWupin = this.view.asCom.getChild("btnWupin").asCom;
        this.btnTalent = this.view.asCom.getChild("btnTalent").asCom;
        this.btnSkill = this.view.asCom.getChild("btnSkill").asCom;
        this.btnHeroExchange = this.view.asCom.getChild("btnHeroExchange").asCom;
        this.btnHeroBook = this.view.asCom.getChild("btnHeroBook").asCom;
        this.btnAchievement = this.view.asCom.getChild("btnAchievement").asCom;
        this.btnGushi.onClick(this.onGushiClick, this);
    }

    private onGushiClick():void {
        console.log("点击故事模式按钮，打开故事模式窗口");
        GameModules.window.showWindowByName("WindowGushi", true);
    }

    protected onShow(): void {
        // GameModels.role.addEventListener(ModelRoleEvent.UPDATE_INFO, this.onRefreshInfo, this);
        console.log("viewShow");
    }

    protected onClose(): void {
        // GameModels.role.removeEventListener(ModelRoleEvent.UPDATE_INFO, this.onRefreshInfo, this);
    }

    protected onDispose(): void {

    }

}