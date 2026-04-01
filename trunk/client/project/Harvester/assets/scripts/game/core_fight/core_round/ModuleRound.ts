import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BaseActor } from "../core_actor/BaseActor";
import { BattleBase } from "../core_battle/battle/BattleBase";
import { EnumRoundType } from "./EnumRoundType";
import { ModuleRoundEvent } from "./ModuleRoundEvent";
import { RoundBase } from "./RoundBase";

export class ModuleRound extends AbstractModule {
    public curRound:RoundBase;
    protected init():void {
        console.log("初始化ROUND模块");
    }

    public createRound( roundID:number, battleBase:BattleBase ):RoundBase {
        let round:RoundBase = new RoundBase();
        round.roundID = roundID;
        round.roundType = EnumRoundType.NORMAL;
        return round;
    }

    // 回合开始
    // public roundStart(roundBase:RoundBase):void {
    //     this.curRound = roundBase;
    //     this.curRound.roundStart();
    // }

    // 进入友方回合
    public friendRoundStart(roundBase:RoundBase):void {
        this.curRound = roundBase;
        this.curRound.friendRoundStart();
    }

    // 进入敌方回合
    public enemyRoundStart(roundBase:RoundBase):void {
        this.curRound = roundBase;
        this.curRound.enemyRoundStart();
    }

    // 回合结束
    public roundEnd(roundBase:RoundBase):void {
        roundBase.roundEnd();
        if( roundBase == this.curRound ) {
            this.curRound = null;
        }
    }

    public updateRound():void { 
        if( this.curRound != null ) {
            this.curRound.roundUpdate();
        }
    }

    protected show():void {
        // console.log("moduleRound SHOW");
    }
        
    protected remove():void {
        // console.log("moduleRound REMOVE");
    }
}