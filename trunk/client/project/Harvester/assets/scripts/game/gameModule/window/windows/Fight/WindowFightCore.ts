import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { Controller, GButton, GComponent, GLoader, GTextField } from "fairygui-cc";
import { GameModules } from "../../../GameModules";
import { ModuleEffectEvent } from "../../../../core_fight/core_effect/ModuleEffectEvent";
import { DamageResultTable } from "../../../../core_fight/core_attr/FightCalcResultTables/FightCalcResourceTables";
import { ModuleBattleEvent } from "../../../../core_fight/core_battle/ModuleBattleEvent";
import { BattleBase } from "../../../../core_fight/core_battle/battle/BattleBase";
import { ModuleRoundEvent } from "../../../../core_fight/core_round/ModuleRoundEvent";
import { RoundBase } from "../../../../core_fight/core_round/RoundBase";
import { ModuleSkillEvent } from "../../../../core_fight/core_skill/ModuleSkillEvent";
import { BaseSkill } from "../../../../core_fight/core_skill/BaseSkill";
import { App } from "db://assets/scripts/framework/managers/App";
import { EnumFaction } from "../../../../core_fight/core_actor/EnumFaction";
import { BattleRewardDropItemVo } from "../../../../gameModel/data/BattleRewardDropItemVo";
import { UIComFightSkill } from "./Components/UIComFightSkill";
import { UIComFightActor } from "./Components/UIComFightActor";
import { UIComFightCoreLog } from "./Components/UIComFightCoreLog";
import { RenderFightCoreLog } from "./RenderFightCoreLog";

export class WindowFightCore extends AbstractUIWindow {

    private btnClose: GButton;
    private loaderFight:GLoader;
    private comFightCore:GComponent
    // private lblEnergy:GTextField;
    private lblStep:GTextField;
    private btnEndRound:GButton;
    private btnEndBattle:GButton
    private controllerStep:Controller;
    private _fightSkillUI: UIComFightSkill;
    private _fightActorUI: UIComFightActor;
    private _fightCoreLogUI: UIComFightCoreLog;

    protected getResList(): Array<string> {
        return ["ui/FightCore","ui/Common"];
    }

    protected onInit(): void {
        // 资源已经在 loadRes() 中加载完成，直接创建视图
        UICore.registerExtension("FightCore", "RenderFightCoreLog", RenderFightCoreLog);
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
        this.loaderFight = this.view.asCom.getChild("loaderFight") as GLoader;
        this.comFightCore = this.view.asCom.getChild("comFightCore") as GComponent;
        // this.lblEnergy = this.comFightCore.getChild("lblEnergy") as GTextField;
        this.lblStep = this.comFightCore.getChild("lblStep") as GTextField;
        this.btnEndRound = this.comFightCore.getChild("btnEndRound") as GButton;
        this.btnEndRound.onClick(this.onBtnEndRoundClick, this);
        this.btnEndBattle = this.comFightCore.getChild("btnEndBattle") as GButton;
        this.btnEndBattle.onClick(this.onBtnEndBattleClick, this);
        this.controllerStep = this.comFightCore.getController("controllerStep");
        this.controllerStep.setSelectedIndex(0);
        this.controllerStep.onChanged((index:number) => {
            console.log("onChanged", index);
        });
        this._fightSkillUI = new UIComFightSkill(this.view);
        this._fightActorUI = new UIComFightActor(this.view);
        this._fightCoreLogUI = new UIComFightCoreLog(this.view);
        
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
    
    private updateEnergy():void {
        // this.lblEnergy.text = GameModules.round.curRound.getRoundEnergy().toString();
    }

    ///////////////////////////////// 事件订阅 /////////////////////////////////////////
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
        this.onFightCoreEventBind();
        // 游戏流程控制，准备 ~ 开始战斗！(战场开启阶段)
        GameModules.battle.battleStart();
        this._fightActorUI.startBossFloatLoop();
        this._fightActorUI.updateFightActor();
        this._fightCoreLogUI.updateFightCoreLog(true);
    }

    /////////////////////////////////// 游戏流程控制 /////////////////////////////////////////
    private setStep(index:number):void {
        switch (index) {
            case 0:
                this.lblStep.text = "进入战场阶段";
                this.controllerStep.setSelectedIndex(index);
                break;
            case 1:
                this.lblStep.text = "进入回合开始前准备阶段";
                this.controllerStep.setSelectedIndex(index);
                break;
            case 2:
                this.lblStep.text = "进入回合循环阶段";
                this.controllerStep.setSelectedIndex(index);
                break;
            case 3:
                this.lblStep.text = "执行回合BUFF";
                this.controllerStep.setSelectedIndex(index);
                break;
            case 4:
                this.lblStep.text = "友方回合阶段";
                this.controllerStep.setSelectedIndex(index);
                break;
            case 5:
                this.lblStep.text = "敌方回合阶段";
                this.controllerStep.setSelectedIndex(index);
                break;
            case 6:
                this.lblStep.text = "当前回合结束";
                this.controllerStep.setSelectedIndex(index);
                break;
            case 7:
                this.lblStep.text = "进入战场结束阶段";
                this.controllerStep.setSelectedIndex(index);
                break;
        }
    }
///////////////////////////// 事件回调 /////////////////////////////////////////
    private onBattleStart(battle:BattleBase):void {
        console.log("onBattleStart", battle);
        this.setStep(0);
        // 进入游戏回合开始前准备阶段(回合开始前准备阶段)
        App.timerManager.registerOnce(3000, () => {
            this.setStep(1);
            GameModules.battle.battlePreRoundStart();
        }, this);
        App.timerManager.registerOnce(6000, () => {
            this.setStep(2);
            GameModules.battle.battleRoundStart();
        }, this);
    }

    // 回合开始
    private onRoundStart(round:RoundBase):void {
        console.log("onRoundStart", round);
        this.setStep(3);
        // 刷新血量和能量
        this.updateEnergy();
        this._fightActorUI.updateFightActor();
        App.timerManager.registerOnce(2000, () => {     
            GameModules.battle.battleFriendRoundStart();
        }, this);
    }

    private onFriendRoundStart(battle:BattleBase):void {
        // this.refreshFightSkill()
        this.setStep(4);
        // this.lblEnergy.text = GameModules.round.curRound.energy.toString();
        console.log("onFriendRoundStart", battle);
        for (let i = 1; i <= 5; i++) {
            this._fightSkillUI.createNextFightSkillPop(1);
        }
    }

    private onEnemyRoundStart(battle:BattleBase):void {
        this.setStep(5);
        console.log("onEnemyRoundStart", battle);
    }

    private onSkillCast(skill:BaseSkill):void {
        console.log("onSkillCast", skill.skillVo.skillCFG.Name);
        this.updateEnergy();
        this._fightActorUI.updateFightActor();
    }

    private onDamageEffect(result:DamageResultTable):void {
        console.log("onDamageEffect", result);
        this._fightActorUI.trySpawnEnemyDamageFloat(result);
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
        this.setStep(6);
        this.updateEnergy();
        this._fightActorUI.updateFightActor();
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
        this.setStep(7);
        console.log("onBattleEnd", battle);
        if (battle && battle.battleVo) {
            GameModules.window.showWindowByName("WindowBattleReward", true, false, false, true, undefined, undefined, [battle.battleVo]);
        }
    }

///////////////////////////// 事件取消订阅 /////////////////////////////////////////
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
        if (this._fightSkillUI != null) {
            this._fightSkillUI.clearAll();
        }
    }

    protected onDispose(): void {
        if (this._fightActorUI != null) {
            this._fightActorUI.dispose();
            this._fightActorUI = null;
        }
        if (this._fightSkillUI != null) {
            this._fightSkillUI.dispose();
            this._fightSkillUI = null;
        }
        if (this._fightCoreLogUI != null) {
            this._fightCoreLogUI.dispose();
            this._fightCoreLogUI = null;
        }
    }
}