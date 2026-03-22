import { BaseActor } from "../../core_actor/BaseActor";
import { RoundBase } from "../../core_round/RoundBase";
import { AbstractBattle } from "./AbstractBattle";

// 普通战斗场景
export class BattleBase extends AbstractBattle {
    public friendActorList:BaseActor[];     // 战斗双方角色列表 
    public enemyActorList:BaseActor[];      // 敌方角色列表 
    public roundList:RoundBase[];           // 回合列表 
    public curRound:RoundBase;              // 当前回合 
    constructor() {
        super();
    }

    public initBattle():void {

    }

    public startBattle():void {

    }

    public stopBattle():void {

    }

    public destroyBattle():void {
        this.stopBattle();
        this.data = null;
    }

    public update():void {
        // 战场更新逻辑，主要是处理战斗流程和状态的更新等
    }
}