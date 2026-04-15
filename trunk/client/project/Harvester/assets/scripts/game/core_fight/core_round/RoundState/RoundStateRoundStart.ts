import { GameModules } from "../../../gameModule/GameModules";
import { EnumAttr } from "../../core_attr/EnumAttr";
import { ModuleRoundEvent } from "../ModuleRoundEvent";
import { RoundBase } from "../RoundBase";
import { BaseRoundState } from "./BaseRoundState";

export class RoundStateRoundStart extends BaseRoundState {
    constructor(roundBase:RoundBase) {
        super(roundBase);
    }

    protected onEnterState():void {
        // 回合开始 所有角色状态效果-1 
        for (const actor of GameModules.battle.curBattle.friendActorList) {
            actor.reduceEffect(EnumAttr.STUN);
            actor.reduceEffect(EnumAttr.SILENCE);
        }
        for (const actor of GameModules.battle.curBattle.enemyActorList) {
            actor.reduceEffect(EnumAttr.STUN);
            actor.reduceEffect(EnumAttr.SILENCE);
        }
        // 回合开始 所有BUFF生效一次Tick
        GameModules.buff.applyBuffTick();
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_START, this.roundBase);
    }

    protected onExitState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_START_EXIT, this.roundBase);
    }

    protected onUpdateState():void {
    }
}