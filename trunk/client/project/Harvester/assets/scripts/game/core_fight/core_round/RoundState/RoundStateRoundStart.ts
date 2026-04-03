import { GameModules } from "../../../gameModule/GameModules";
import { ModuleRoundEvent } from "../ModuleRoundEvent";
import { RoundBase } from "../RoundBase";
import { BaseRoundState } from "./BaseRoundState";

export class RoundStateRoundStart extends BaseRoundState {
    constructor(roundBase:RoundBase) {
        super(roundBase);
    }

    protected onEnterState():void {
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