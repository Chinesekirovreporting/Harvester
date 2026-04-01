import { BaseRoundState } from "./BaseRoundState";
import { RoundBase } from "../RoundBase";
import { GameModules } from "../../../gameModule/GameModules";
import { ModuleRoundEvent } from "../ModuleRoundEvent";
import { App } from "db://assets/scripts/framework/managers/App";
import { EnumSkill } from "../../core_skill/skills/EnumSkill";

export class RoundStateEnemy extends BaseRoundState{
    constructor(roundBase:RoundBase) {
        super(roundBase);
    }

    protected onEnterState():void {
        // 释放火球术
        GameModules.skill.enemyUseSkill(EnumSkill.SKILL_FIRE_BALL, GameModules.battle.curBattle.enemyActorList[0]);
        // 三秒后结束回合
        App.timerManager.registerOnce(3000, () => {
            GameModules.round.roundEnd(this.roundBase);
        }, this);
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ENEMY_ROUND_START, this.roundBase);
    }

    protected onExitState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ENEMY_ROUND_END, this.roundBase);
    }

    protected onUpdateState():void {

    }
    
}