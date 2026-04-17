import { FightCoreLogRoundIndexVo } from "../../../gameModel/data/FightCoreLog/FightCoreLogRoundIndexVo";
import { FightCoreLogRoundPreBuffVo } from "../../../gameModel/data/FightCoreLog/FightCoreLogRoundPreBuffVo";
import { EnumFightCoreLogType } from "../../../gameModel/enum/EnumFightCoreLogType";
import { GameModels } from "../../../gameModel/GameModels";
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
        // 回合：进入回合 - 第 N 回合循环
        GameModels.fightLog.showLogByType(EnumFightCoreLogType.ROUND_ENTER_LOOP, new FightCoreLogRoundIndexVo(this.roundBase.roundID));
        // 回合：进入回合前 BUFF 结算
        GameModels.fightLog.showLogByType(EnumFightCoreLogType.ROUND_PRE_BUFF, new FightCoreLogRoundPreBuffVo());
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_START, this.roundBase);
    }

    protected onExitState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_START_EXIT, this.roundBase);
    }
    
    protected onUpdateState():void {
        
    }
}