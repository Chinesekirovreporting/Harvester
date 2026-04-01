import { BaseActor } from "../../core_actor/BaseActor";
import { RoundBase } from "../../core_round/RoundBase";
import { BattleStateManager } from "../battleState/BattleStateManager";
import { AbstractBattle } from "./AbstractBattle";
import { EnumBattleState } from "./EnumBattleState";

// 普通战斗场景
export class BattleBase extends AbstractBattle {
    public friendActorList:BaseActor[];     // 战斗双方角色列表 
    public enemyActorList:BaseActor[];      // 敌方角色列表 
    public roundList:RoundBase[];           // 大循环回合列表 
    public curRound:RoundBase;              // 当前大循环回合 
    public battleStageMgr:BattleStateManager;
    constructor() {
        super();
        this.initBattle();
    }
    
    public initBattle():void {
        this.roundList = [];
        this.battleStageMgr = new BattleStateManager(this);
    }

    public updateBattleInfo():void {
        this.friendActorList = [this.battleVo.battleActor];
        this.enemyActorList = [this.battleVo.battleTarget];
    }

    // 战场开始战斗
    public startBattle():void {
        this.battleStageMgr.startBattle();
    }

    // 改变大循环回合
    public changeRound( round:RoundBase ):void {
        this.roundList.push(round);
        this.curRound = round;
        this.changeState(EnumBattleState.BATTLE_ROUND_FRIEND_START);
    }

    public changeEnemyRound(round:RoundBase):void {
        this.changeState(EnumBattleState.BATTLE_ROUND_ENEMY_START);
    }

    // 改变战场状态
    public changeState(state:EnumBattleState):void {
        this.battleStageMgr.changeState(state);
    }

    // 战场结束战斗
    public stopBattle():void {
        this.battleStageMgr.stopBattle();
    }

    // 战场销毁
    public destroyBattle():void {
        this.stopBattle();
        this.battleVo = null;
    }

    public update():void {
        // 战场更新逻辑，主要是处理战斗流程和状态的更新等
    }
}