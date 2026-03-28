import { GameModules } from "../../../gameModule/GameModules";
import { ModuleRoundEvent } from "../ModuleRoundEvent";
import { RoundBase } from "../RoundBase";
import { BaseRoundState } from "./BaseRoundState";

export class RoundStateFriend extends BaseRoundState{
    constructor(roundBase:RoundBase) {
        super(roundBase);
    }

    protected onEnterState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_FRIEND_ROUND_START, this.roundBase);
    }

    protected onExitState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_FRIEND_ROUND_END, this.roundBase);
    }
    
    protected onUpdateState():void {

    }
}