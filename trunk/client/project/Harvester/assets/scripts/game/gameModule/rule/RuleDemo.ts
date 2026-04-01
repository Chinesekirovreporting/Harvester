import { App } from "../../../framework/managers/App";
import { RoundActionBase } from "../../core_fight/core_action/RoundActionBase";
import { GameModules } from "../GameModules";
// 规则模块的垂直切片，用于模拟战斗，特殊规则定制，等垂直切片功能
export class RuleDemo {
    
    public int1:number = 0;
    constructor() {
        App.timerManager.registerFrameLoop(60, this.updateSec, this);
    }

    // 模拟战斗开始事件
    public simBattleStart():void {
        GameModules.battle.battleStart();
    }

    // 模拟回合开始事件
    public simRoundStart():void {
        // GameModules.round.roundStart(GameModules.round.curRound);
    }

    // 模拟玩家动作事件
    public simPlayerAction(actionBase:RoundActionBase):void {
        // GameModules.action.createAction(1);
        GameModules.action.doAction(actionBase);
    }

    // 模拟敌方动作事件
    public simBossAction(actionBase:RoundActionBase):void {
        GameModules.action.doAction(actionBase);
    }

    // 模拟回合结束事件
    public simRoundEnd():void {
        GameModules.round.roundEnd(GameModules.round.curRound);
    }

    //模拟战斗结束时间
    public simBattleEnd():void {
        GameModules.battle.battleEnd();
    }

    public onShow():void {
        
    }

    public onRemove():void {

    }

    // 每秒更新一次 
    public updateSec():void {

    }
}