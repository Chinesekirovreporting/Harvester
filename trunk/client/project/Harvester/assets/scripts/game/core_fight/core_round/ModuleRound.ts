import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BaseActor } from "../core_actor/BaseActor";
import { EnumRoundType } from "./EnumRoundType";
import { ModuleRoundEvent } from "./ModuleRoundEvent";
import { RoundBase } from "./RoundBase";

export class ModuleRound extends AbstractModule {

    public curRound:RoundBase;

    protected init():void {
        console.log("初始化ROUND模块");
    }

    public createRound(roundID:number):RoundBase {
        let round:RoundBase = new RoundBase();
        round.roundID = roundID;
        round.roundType = EnumRoundType.NORMAL;
        return round;
    }

    public roundStart(roundBase:RoundBase):void {
        this.curRound = roundBase;
        this.curRound.roundStart();
        this.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_START, roundBase);
    }

    public roundEnd(roundBase:RoundBase):void {
        this.curRound.roundEnd();
        this.curRound = null;
        this.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_END, roundBase);
    }

    public updateRound():void { 
        if( this.curRound != null ) {
            this.curRound.roundUpdate();
        }
    }

    protected show():void {
        console.log("moduleRound SHOW");
    }
        
    protected remove():void {
        console.log("moduleRound REMOVE");
    }
}