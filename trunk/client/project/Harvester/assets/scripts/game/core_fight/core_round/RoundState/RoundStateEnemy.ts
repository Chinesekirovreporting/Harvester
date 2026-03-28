import { BaseRoundState } from "./BaseRoundState";
import { RoundBase } from "../RoundBase";
import { GameModules } from "../../../gameModule/GameModules";
import { ModuleRoundEvent } from "../ModuleRoundEvent";

export class RoundStateEnemy extends BaseRoundState{
    constructor(roundBase:RoundBase) {
        super(roundBase);
    }

    protected onEnterState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ENEMY_ROUND_START, this.roundBase);
    }

    protected onExitState():void {
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ENEMY_ROUND_END, this.roundBase);
    }

    protected onUpdateState():void {

    }
    
}