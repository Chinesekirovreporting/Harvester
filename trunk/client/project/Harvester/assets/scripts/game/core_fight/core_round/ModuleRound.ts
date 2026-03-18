import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BaseActor } from "../core_actor/BaseActor";
import { EnumRoundType } from "./EnumRoundType";
import { RoundBase } from "./RoundBase";

export class ModuleRound extends AbstractModule {
    protected init():void {
        console.log("初始化ROUND模块");
    }
 
    public createRound(roundID:number):void {
        let round:RoundBase = new RoundBase();
        round.roundID = roundID;
        round.roundType = EnumRoundType.NORMAL;
        // round.roundTarget = BaseActor.createRoundTarget();
        // round.roundTarget = BaseActor.createRoundTarget();
    }

    public updateRound():void {
        let round:RoundBase = new RoundBase();
        // round.roundID = roundID;
        // round.roundType = EnumRoundType.ROUND_TYPE_1;
        // round.roundTarget = BaseActor.createRoundTarget();
        // round.roundTarget = BaseActor.createRoundTarget();
    }

    protected show():void {
        console.log("moduleRound SHOW");
    }
        
    protected remove():void {
        console.log("moduleRound REMOVE");
    }
}