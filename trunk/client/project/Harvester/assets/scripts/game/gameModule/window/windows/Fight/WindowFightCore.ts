import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton, GComponent, GList, GLoader, GObject, GTextField, UIPackage } from "fairygui-cc";
import { GameModules } from "../../../GameModules";
import { ModuleEffectEvent } from "../../../../core_fight/core_effect/ModuleEffectEvent";
import { DamageResultTable } from "../../../../core_fight/core_attr/FightCalcResultTables/FightCalcResourceTables";
import { ModuleBattleEvent } from "../../../../core_fight/core_battle/ModuleBattleEvent";
import { ModuleRound } from "../../../../core_fight/core_round/ModuleRound";
import { BattleBase } from "../../../../core_fight/core_battle/battle/BattleBase";
import { ModuleRoundEvent } from "../../../../core_fight/core_round/ModuleRoundEvent";
import { RoundBase } from "../../../../core_fight/core_round/RoundBase";
import { TweenUtil } from "db://assets/scripts/framework/utils/TweenUtil";
import { Tween } from "cc";
import { ModuleSkillEvent } from "../../../../core_fight/core_skill/ModuleSkillEvent";
import { BaseSkill } from "../../../../core_fight/core_skill/BaseSkill";
import { App } from "db://assets/scripts/framework/managers/App";
import { BaseActor } from "../../../../core_fight/core_actor/BaseActor";
import { EnumFaction } from "../../../../core_fight/core_actor/EnumFaction";
import { BattleRewardDropItemVo } from "../../../../gameModel/data/BattleRewardDropItemVo";

export class WindowFightCore extends AbstractUIWindow {

    private btnClose: GButton;
    private comPlayer1: GComponent;
    private comBoss1: GComponent;
    private loaderFight:GLoader;
    private comFightCore:GComponent
    private listFightCoreLog:GList;
    private lblEnergy:GTextField;
    private lblStep:GTextField;
    private btnEndRound:GButton;
    private btnEndBattle:GButton;
    private nButtonCount:number = 6;

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
        this.comFightCore = this.view.asCom.getChild("comFightCore") as GComponent;
        this.listFightCoreLog = this.view.asCom.getChild("listFightCoreLog") as GList;
        this.lblEnergy = this.comFightCore.getChild("lblEnergy") as GTextField;
        this.lblStep = this.comFightCore.getChild("lblStep") as GTextField;
        this.btnEndRound = this.comFightCore.getChild("btnEndRound") as GButton;
        this.btnEndRound.onClick(this.onBtnEndRoundClick, this);
        this.btnEndBattle = this.comFightCore.getChild("btnEndBattle") as GButton;
        this.btnEndBattle.onClick(this.onBtnEndBattleClick, this);
        for (let i = 1; i <= this.nButtonCount; i++) {
            let btn = this.comFightCore.getChild("btnPop" + i) as GButton;
            if (btn) {
                btn.onClick(this.onFightCoreButtonClick.bind(this, i), this); 
                btn.touchable = true;
                btn.visible = true;
            } 
        } 
    } 

    private onFightCoreButtonClick(index:number):void {
        console.log("onFightCoreButtonClick", index);
        // 执行技能函数，根据index 执行对应的技能
        var skillId = 1;    // 技能表 //GameModules.round.curRound.getSkillIdBySkillIndex(index);
        var useUnit:BaseActor = GameModules.battle.curBattle.friendActorList[0]
        GameModules.skill.useSkill( skillId, useUnit );
        this.comFightCore.getChild("btnPop" + index).touchable = false;
        // 更新UI 隐藏当前按钮，并显示下一个按钮
        TweenUtil.fadeOut(this.comFightCore.getChild("btnPop" + index) as GObject,0.3,() => {
            this.comFightCore.getChild("btnPop" + index).visible = false;
        });
    }

    private onCloseClick():void {
        this.close();
    }

    private onBtnEndRoundClick():void {
        // 点击回合结束，跳转敌方回合
        GameModules.battle.battleEnemyRoundStart();
    }

    private onBtnEndBattleClick():void {
        this.applyBattleOutcome(false, []);
        GameModules.battle.battleEnd();
    }

    /** 在 `battleEnd()` 之前写入，供结算窗读取 */
    private applyBattleOutcome(victory: boolean, drops?: BattleRewardDropItemVo[]): void {
        const vo = GameModules.battle.curBattle.battleVo;
        vo.isVictory = victory;
        vo.rewardDropList = drops ? drops.slice() : [];
    }
    
    /** 示例：通过动态 UI 模块挂到窗口顶层（飘血、ComBlood 等同理） */
    private createFightCoreButton():void {
        GameModules.dynamicUI.addFromPackage(this.view, "FightCore", "ComBlood",100,100);
    }

    private updateFightActor():void {
        var battleMyActor = GameModules.battle.curBattle.friendActorList[0];
        var battleEnemyActor = GameModules.battle.curBattle.enemyActorList[0];
        if (battleMyActor == null || battleEnemyActor == null) return;
        this.comPlayer1.getChild("lblName").text = battleMyActor.name;
        this.comPlayer1.getChild("lblLevel").text = battleMyActor.name;
        this.comPlayer1.getChild("lblFight").text = battleMyActor.name;
        this.comPlayer1.getChild("lblHp").text = battleMyActor.attrVo.HP.toString();
        this.comPlayer1.getChild("lblMp").text = battleMyActor.attrVo.MP.toString();
        this.comBoss1.getChild("lblName").text = battleEnemyActor.name;
        this.comBoss1.getChild("lblLevel").text = battleEnemyActor.name;
        this.comBoss1.getChild("lblFight").text = battleEnemyActor.name;
        this.comBoss1.getChild("lblHp").text = battleEnemyActor.attrVo.HP.toString();
        this.comBoss1.getChild("lblMp").text = battleEnemyActor.attrVo.MP.toString();
    }

    private updateEnergy():void {
        this.lblEnergy.text = GameModules.round.curRound.getRoundEnergy().toString();
    }

    private updateRound():void {

    }

    private onFightCoreEventBind():void {
        // 订阅战场开始
        GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_START, this.onBattleStart, this);
        // 订阅订阅回合开始事件
        GameModules.round.on(ModuleRoundEvent.ON_ROUND_START, this.onRoundStart, this);
        // 订阅回合友方开始事件
        GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_FRIEND_ROUND_START, this.onFriendRoundStart, this);
        // 订阅回合敌方开始事件
        GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_ENEMY_ROUND_START, this.onEnemyRoundStart, this);
        // 订阅技能释放事件
        GameModules.skill.on(ModuleSkillEvent.ON_SKILL_CAST, this.onSkillCast, this);
        // 订阅敌方技能释放事件
        GameModules.skill.on(ModuleSkillEvent.ON_ENEMY_SKILL_CAST, this.onSkillCast, this);
        // 订阅伤害效果事件
        GameModules.effect.on(ModuleEffectEvent.ON_DAMAGE_EFFECT, this.onDamageEffect, this);
        // 订阅回合结束事件
        GameModules.round.on(ModuleRoundEvent.ON_ROUND_END, this.onRoundEnd, this);
        // 订阅战场事件
        GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_END, this.onBattleEnd, this);
    }

    protected onShow(...args: Array<any>): void {
        TweenUtil.floatEffectLoop(this.comBoss1)
        this.onFightCoreEventBind();
        // 游戏流程控制，准备 ~ 开始战斗！(战场开启阶段)
        GameModules.battle.battleStart();
        this.updateFightActor();
        this.updateRound();
        // 动态创建控件
        this.createFightCoreButton();
    }

    /////////////////////////////////// 游戏流程控制 /////////////////////////////////////////
    private onBattleStart(battle:BattleBase):void {
        console.log("onBattleStart", battle);
        this.lblStep.text = "进入战场阶段";
        // 进入游戏回合开始前准备阶段(回合开始前准备阶段)
        App.timerManager.registerOnce(3000, () => {
            this.lblStep.text = "进入回合开始前准备阶段";
            GameModules.battle.battlePreRoundStart();
        }, this);
        App.timerManager.registerOnce(6000, () => {
            this.lblStep.text = "进入回合循环阶段";
            GameModules.battle.battleRoundStart();
        }, this);
    }

    // 回合开始
    private onRoundStart(round:RoundBase):void {
        console.log("onRoundStart", round);
        this.lblStep.text = "执行BUFF，等待进入友方回合阶段。";
        // 刷新血量和能量
        this.updateEnergy();
        this.updateFightActor();
        App.timerManager.registerOnce(2000, () => {     
            GameModules.battle.battleFriendRoundStart();
        }, this);
    }

    private onFriendRoundStart(battle:BattleBase):void {
        this.refreshFightSkill()
        this.lblStep.text = "进入友方回合阶段";
        this.lblEnergy.text = GameModules.round.curRound.energy.toString();
        console.log("onFriendRoundStart", battle);
    }

    private onEnemyRoundStart(battle:BattleBase):void {
        this.lblStep.text = "进入敌方回合阶段";
        console.log("onEnemyRoundStart", battle);
    }

    private refreshFightSkill():void {
        for (let i = 1; i <= this.nButtonCount; i++) {
            let btn = this.comFightCore.getChild("btnPop" + i) as GButton;
            if (btn) {
                btn.touchable = true;
                btn.visible = true;
                btn.alpha = 1;
            }
        }
    }

    private onSkillCast(skill:BaseSkill):void {
        console.log("onSkillCast", skill.skillVo.skillCFG.Name);
        this.updateEnergy();
        this.updateFightActor();
    }

    private onDamageEffect(result:DamageResultTable):void {
        console.log("onDamageEffect", result);
        // 如果目标被击杀，执行击杀逻辑
        if( result.target.faction == EnumFaction.ENEMY && result.beKilled ) {
            this.applyBattleOutcome(true, [
                new BattleRewardDropItemVo(1, 10),
                new BattleRewardDropItemVo(2, 1),
            ]);
            GameModules.battle.battleEnd();
        }
        // this.loaderFight.progress = result.damage / 100;
    }

    private onRoundEnd(round:RoundBase):void {
        this.lblStep.text = "当前回合结束";
        this.updateEnergy();
        this.updateFightActor();
        // 先做好当前回合结束的表现，判断是否需要进入下一回合，敌方阵亡或友方阵亡则结束游戏
        App.timerManager.registerOnce(2000, () => {     
            var bIsNextRound = true;
            if( bIsNextRound ) {
                GameModules.battle.battleRoundStart();
            } else {
                GameModules.battle.battleEnd();
            }
        }, this);
    }

    private onBattleEnd(battle:BattleBase):void {
        this.lblStep.text = "进入战场结束阶段";
        console.log("onBattleEnd", battle);
        if (battle && battle.battleVo) {
            GameModules.window.showWindowByName("WindowBattleReward", true, false, false, true, undefined, undefined, [battle.battleVo]);
        }
    }

    private onFightCoreEventUnbind():void {
        // 取消订阅回合结束事件
        GameModules.round.off(ModuleRoundEvent.ON_ROUND_END, this.onRoundEnd, this);
        // 取消订阅回合开始事件
        GameModules.round.off(ModuleRoundEvent.ON_ROUND_START, this.onRoundStart, this);
        // 取消订阅回合友方开始事件
        GameModules.battle.off(ModuleBattleEvent.ON_BATTLE_FRIEND_ROUND_START, this.onFriendRoundStart, this);
        // 取消订阅回合敌方开始事件
        GameModules.battle.off(ModuleBattleEvent.ON_BATTLE_ENEMY_ROUND_START, this.onEnemyRoundStart, this);
        // 取消订阅敌方技能释放事件
        GameModules.skill.off(ModuleSkillEvent.ON_ENEMY_SKILL_CAST, this.onSkillCast, this);
        // 订阅技能释放事件
        GameModules.skill.off(ModuleSkillEvent.ON_SKILL_CAST, this.onSkillCast, this);
        // 取消订阅伤害效果事件
        GameModules.effect.off(ModuleEffectEvent.ON_DAMAGE_EFFECT, this.onDamageEffect, this);
        // 取消订阅战场开始事件
        GameModules.battle.off(ModuleBattleEvent.ON_BATTLE_START, this.onBattleStart, this);
        // 取消订阅战场结束事件
        GameModules.battle.off(ModuleBattleEvent.ON_BATTLE_END, this.onBattleEnd, this);
    }

    protected onClose(): void {
        this.onFightCoreEventUnbind();
    }
}