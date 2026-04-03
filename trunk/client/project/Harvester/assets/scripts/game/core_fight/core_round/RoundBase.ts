// 回合基类，每个回合包含当前回合，所有角色的所有动作，所有的BUFF生效等
import { GameModules } from "../../gameModule/GameModules";
import { RoundActionBase } from "../core_action/RoundActionBase";
import { BaseActor } from "../core_actor/BaseActor";
import { EnumRoundState } from "./EnumRoundState";
import { EnumRoundType } from "./EnumRoundType";
import { ModuleRoundEvent } from "./ModuleRoundEvent";
import { BaseRoundState } from "./RoundState/BaseRoundState";
import { RoundStateEnemy } from "./RoundState/RoundStateEnemy";
import { RoundStateFriend } from "./RoundState/RoundStateFriend";
import { RoundStateRoundStart } from "./RoundState/RoundStateRoundStart";

export class RoundBase {
    public roundID:number;
    public roundType:EnumRoundType;
    public energy:number;
    public curRoundState:EnumRoundState = EnumRoundState.NONE;
    public roundStateDict:Record<number, BaseRoundState> = {};

    constructor() {
        this.roundType = EnumRoundType.NORMAL;
        this.initRoundEneny();
        this.registerRoundState();
    }

    private initRoundEneny():void {
        this.energy = 6;
    }

    private registerRoundState():void {
        this.roundStateDict[EnumRoundState.ROUND_START] = new RoundStateRoundStart(this);
        this.roundStateDict[EnumRoundState.FRIEND_ROUND] = new RoundStateFriend(this);
        this.roundStateDict[EnumRoundState.ENEMY_ROUND] = new RoundStateEnemy(this);
    }

    public getRoundEnergy():number {
        return this.energy;
    }

    public roundStart():void {
        // this.oundStart();
        // GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_START, this);
        this.changeRound(EnumRoundState.ROUND_START)
    }

    public friendRoundStart():void { 
        this.changeRound(EnumRoundState.FRIEND_ROUND)
    }

    public enemyRoundStart():void { 
        this.changeRound(EnumRoundState.ENEMY_ROUND)
    }
    
    private changeRound(roundState:EnumRoundState):void { 
        if (this.curRoundState != EnumRoundState.NONE) {
            this.roundStateDict[this.curRoundState].exitState();
        }
        this.curRoundState = roundState;
        this.roundStateDict[this.curRoundState].enterState();
    }  

    public roundEnd():void { 
        // 大回合结束，结束当前小回合状态
        if(this.curRoundState == EnumRoundState.FRIEND_ROUND){
            this.roundStateDict[this.curRoundState].exitState();
        }else if(this.curRoundState == EnumRoundState.ENEMY_ROUND){
            this.roundStateDict[this.curRoundState].exitState();
        }
        // 判断是否需要进入下一回合，敌方阵亡或友方阵亡则结束游戏
        GameModules.round.dispatchEventWithData(ModuleRoundEvent.ON_ROUND_END, this);
    }

    public roundUpdate():void {
        this.roundStateDict[this.curRoundState].updateState();
    }
}