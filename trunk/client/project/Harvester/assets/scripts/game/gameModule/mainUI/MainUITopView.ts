import { GComponent } from "fairygui-cc";
import { AbstractUIView } from "../../../framework/core/ui/AbstractUIView";
import { GameModules } from "../GameModules";

export class MainUITopView extends AbstractUIView {
    public btnTest:GComponent;
    public btnGushi:GComponent;
    public btnRogue:GComponent; 
    public btnZhuangbei:GComponent;
    public btnWupin:GComponent;
    public btnTalent:GComponent;
    public btnSkill:GComponent;
    public btnHeroExchange:GComponent;
    public btnHeroBook:GComponent;
    public btnAchievement:GComponent;
    public btnSkillBook:GComponent;
    public btnRole:GComponent;

    public onInit(): void {
        this.btnTest = this.view.asCom.getChild("btnTest").asCom;
        this.btnTest.onClick(this.onTestClick, this);
        this.btnGushi = this.view.asCom.getChild("btnGushi").asCom;
        this.btnGushi.onClick(this.onGushiClick, this);
        this.btnRogue = this.view.asCom.getChild("btnRogue").asCom;
        this.btnZhuangbei = this.view.asCom.getChild("btnZhuangbei").asCom;
        this.btnWupin = this.view.asCom.getChild("btnWupin").asCom;
        this.btnTalent = this.view.asCom.getChild("btnTalent").asCom;
        this.btnSkill = this.view.asCom.getChild("btnSkill").asCom;
        this.btnHeroExchange = this.view.asCom.getChild("btnHeroExchange").asCom;
        this.btnHeroBook = this.view.asCom.getChild("btnHeroBook").asCom;
        this.btnHeroBook.onClick(this.onHeroBookClick, this);
        this.btnAchievement = this.view.asCom.getChild("btnAchievement").asCom;
        this.btnAchievement.onClick(this.onAchievementClick, this);
        this.btnSkillBook = this.view.asCom.getChild("btnSkillBook").asCom;
        this.btnSkillBook.onClick(this.onSkillBookClick, this);
        this.btnRole = this.view.asCom.getChild("btnRole").asCom;
        this.btnRole.onClick(this.onRoleClick, this);
    }
    
    private onTestClick():void {
        console.log("点击测试战斗按钮，打开测试战斗窗口");
        GameModules.window.showWindowByName("WindowFightCore", true);
    }

    private onGushiClick():void {
        console.log("点击故事模式按钮，打开故事模式窗口");
        GameModules.window.showWindowByName("WindowGushi", true);
    }

    private onHeroBookClick():void {
        console.log("点击英雄图鉴按钮，打开英雄图鉴窗口");
        GameModules.window.showWindowByName("WindowHeroBook", true);
    }

    private onAchievementClick():void {
        console.log("点击成就按钮，打开成就窗口");
        GameModules.window.showWindowByName("WindowAchieve", true);
    }

    private onSkillBookClick():void {
        console.log("点击技能图鉴按钮，打开技能图鉴窗口");
        GameModules.window.showWindowByName("WindowSkillBook", true);
    }

    private onRoleClick():void {
        console.log("点击打开人物面板按钮，打开人物面板");
        GameModules.window.showWindowByName("WindowRole", true);
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