import { FightCoreLogRoundFriendVo } from "../../../gameModel/data/FightCoreLog/FightCoreLogRoundFriendVo";
import { EnumFightCoreLogType } from "../../../gameModel/enum/EnumFightCoreLogType";
import { GameModels } from "../../../gameModel/GameModels";
import { GameModules } from "../../../gameModule/GameModules";
import { ModuleRoundEvent } from "../ModuleRoundEvent";
import { RoundBase } from "../RoundBase";
import { BaseRoundState } from "./BaseRoundState";

export class RoundStateFriend extends BaseRoundState{
    constructor(roundBase:RoundBase) {
        super(roundBase);
    }

    protected onEnterState():void {
        // 回合：进入友方回合
        GameModels.fightLog.showLogByType(EnumFightCoreLogType.ROUND_FRIEND, new FightCoreLogRoundFriendVo());
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_FRIEND_ROUND_START, this.roundBase);
    }

    protected onExitState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_FRIEND_ROUND_END, this.roundBase);
    }
    
    protected onUpdateState():void {

    }
}