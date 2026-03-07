import { GButton, GComponent } from "fairygui-cc";
import { AbstractUIView } from "../../../framework/core/ui/AbstractUIView";
import { GameModules } from "../GameModules";

export class MainUITopView extends AbstractUIView {
    public btnTest:GButton;
    public btnGushi:GButton;
    public btnRogue:GButton; 
    public btnChallenge:GButton;
    public btnZhuangbei:GButton;
    public btnWupin:GButton;
    public btnTalent:GComponent;
    public btnSkill:GButton;
    public btnHeroExchange:GButton;
    public btnHeroBook:GButton;
    public btnAchievement:GButton;
    public btnSkillBook:GButton;
    public btnRole:GButton;
    public btnTravel:GButton;
    public btnTestStep:GButton;

    public onInit(): void {
        this.btnTest = this.view.asCom.getChild("btnTest");
        this.btnTest.onClick(this.onTestClick, this);
        this.btnGushi = this.view.asCom.getChild("btnGushi");
        this.btnGushi.onClick(this.onGushiClick, this);
        this.btnRogue = this.view.asCom.getChild("btnRogue");
        this.btnRogue.onClick(this.onRogueClick, this);
        this.btnChallenge = this.view.asCom.getChild("btnChallenge");
        this.btnChallenge.onClick(this.onChallengeClick, this);
        this.btnZhuangbei = this.view.asCom.getChild("btnZhuangbei");
        this.btnWupin = this.view.asCom.getChild("btnWupin");
        this.btnTalent = this.view.asCom.getChild("btnTalent");
        this.btnTalent.onClick(this.onTalentClick, this);
        this.btnSkill = this.view.asCom.getChild("btnSkill");
        this.btnHeroExchange = this.view.asCom.getChild("btnHeroExchange");
        this.btnHeroBook = this.view.asCom.getChild("btnHeroBook");
        this.btnHeroBook.onClick(this.onHeroBookClick, this);
        this.btnAchievement = this.view.asCom.getChild("btnAchievement");
        this.btnAchievement.onClick(this.onAchievementClick, this);
        this.btnSkillBook = this.view.asCom.getChild("btnSkillBook");
        this.btnSkillBook.onClick(this.onSkillBookClick, this);
        this.btnRole = this.view.asCom.getChild("btnRole");
        this.btnRole.onClick(this.onRoleClick, this);
        this.btnTravel = this.view.asCom.getChild("btnTravel");
        this.btnTravel.onClick(this.onTravelClick, this);
        this.btnTestStep = this.view.asCom.getChild("btnTestStep");
        this.btnTestStep.onClick(this.onTestStepClick, this);
    }
    
    private onTestClick():void {
        console.log("点击测试战斗按钮，打开测试战斗窗口");
        GameModules.window.showWindowByName("WindowFightCore", true);
    }

    private onGushiClick():void {
        console.log("点击故事模式按钮，打开故事模式窗口");
        GameModules.window.showWindowByName("WindowStory", true);
    }

    private onRogueClick():void {
        console.log("点击 Rogue 模式按钮，打开 Rogue 模式窗口");
        GameModules.window.showWindowByName("WindowRogue", true);
    }

    private onChallengeClick():void {
        console.log("点击挑战模式按钮，打开挑战模式窗口");
        GameModules.window.showWindowByName("WindowChallenge", true);
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

    private onTravelClick():void {
        console.log("点击旅行按钮，打开旅行窗口");
        GameModules.window.showWindowByName("WindowTravel", true);
    }

    private onTestStepClick():void {
        console.log("点击测试步骤按钮，打开测试步骤窗口");
        GameModules.window.showWindowByName("WindowStepTree", true);
    }

    private onTalentClick():void {
        console.log("点击天赋按钮，打开天赋树窗口");
        GameModules.window.showWindowByName("WindowTalent", true, false, false, true);
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