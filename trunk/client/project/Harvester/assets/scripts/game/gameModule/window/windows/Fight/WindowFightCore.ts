import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton, GComponent, GLoader } from "fairygui-cc";
import { GameModules } from "../../../GameModules";
import { ModuleEffectEvent } from "../../../../core_fight/core_effect/ModuleEffectEvent";
import { DamageResultTable } from "../../../../core_fight/core_attr/FightCalcResultTables/FightCalcResourceTables";
import { ModuleBattleEvent } from "../../../../core_fight/core_battle/ModuleBattleEvent";
import { ModuleRound } from "../../../../core_fight/core_round/ModuleRound";
import { BattleBase } from "../../../../core_fight/core_battle/battle/BattleBase";
import { ModuleRoundEvent } from "../../../../core_fight/core_round/ModuleRoundEvent";
import { RoundBase } from "../../../../core_fight/core_round/RoundBase";

export class WindowFightCore extends AbstractUIWindow {
    
    private btnClose: GButton;
    private comPlayer1: GComponent;
    private comBoss1: GComponent;
    private loaderFight:GLoader;
    private comFightCore:GComponent

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
    }

    private onCloseClick():void {
        this.close();
    }

    private updateFightActor():void {
        this.comPlayer1.getChild("txtName").text = "玩家111";
        this.comPlayer1.getChild("txtLevel").text = "111";
        this.comPlayer1.getChild("txtFight").text = "111";
        this.comBoss1.getChild("txtName").text = "boss111";
        this.comBoss1.getChild("txtLevel").text = "111";
        this.comBoss1.getChild("txtFight").text = "111";
    }

    private onFightCoreEventBind():void {
        // 订阅战场开始
        GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_START, this.onBattleStart, this);
        // 订阅订阅回合开始事件
        GameModules.round.on(ModuleRoundEvent.ON_ROUND_START, this.onRoundStart, this);
        // 订阅伤害效果事件
        GameModules.effect.on(ModuleEffectEvent.ON_DAMAGE_EFFECT, this.onDamageEffect, this);
        // 订阅回合结束事件
        GameModules.round.on(ModuleRoundEvent.ON_ROUND_END, this.onRoundEnd, this);
        // 订阅战场事件
        GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_END, this.onBattleEnd, this);
    }

    protected onShow(...args: Array<any>): void {
        this.updateFightActor();
        this.onFightCoreEventBind();
    }

    private onBattleStart(battle:BattleBase):void {
        console.log("onBattleStart", battle);
    }

    private onRoundStart(round:RoundBase):void {
        console.log("onRoundStart", round);
    }

    private onDamageEffect(result:DamageResultTable):void {
        console.log("onDamageEffect", result);
        // this.loaderFight.progress = result.damage / 100;
    }

    private onRoundEnd(round:RoundBase):void {

    }

    private onBattleEnd(battle:BattleBase):void {
        console.log("onBattleEnd", battle);
    }


    private onFightCoreEventUnbind():void {
        // 取消订阅伤害效果事件
        GameModules.effect.off(ModuleEffectEvent.ON_DAMAGE_EFFECT, this.onDamageEffect, this);
        // 取消订阅回合结束事件
        GameModules.round.off(ModuleRoundEvent.ON_ROUND_END, this.onRoundEnd, this);
        // 取消订阅回合开始事件
        GameModules.round.off(ModuleRoundEvent.ON_ROUND_START, this.onRoundStart, this);
        // 取消订阅战场开始事件
        GameModules.battle.off(ModuleBattleEvent.ON_BATTLE_START, this.onBattleStart, this);
        // 取消订阅战场结束事件
        GameModules.battle.off(ModuleBattleEvent.ON_BATTLE_END, this.onBattleEnd, this);
    }

    protected onClose(): void {
        this.onFightCoreEventUnbind();
    }
}