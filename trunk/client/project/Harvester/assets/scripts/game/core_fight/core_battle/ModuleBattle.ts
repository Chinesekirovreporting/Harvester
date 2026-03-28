import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { GameModules } from "../../gameModule/GameModules";
import { RoundBase } from "../core_round/RoundBase";
import { BattleBase } from "./battle/BattleBase";
import { EnumBattleState } from "./battle/EnumBattleState";
import { EnumBattleType } from "./battle/EnumBattleType";
import { BattleFactory } from "./BattleFactory";
import { BattleVo } from "./BattleVo";
import { ModuleBattleEvent } from "./ModuleBattleEvent";

export class ModuleBattle extends AbstractModule{
    public curBattle:BattleBase;                   // 当前战场
    protected init():void {
        console.log("初始化moduleBattle模块")
    }
    
    // 战斗开始，先进入战场准备阶段
    public battleStart():void {
        this.curBattle = BattleFactory.createBattle(EnumBattleType.NORMAL, new BattleVo());
        this.curBattle.startBattle();
    }

    // 进入战场回合开始前准备阶段
    public battlePreRoundStart():void {
        this.curBattle.changeState(EnumBattleState.BATTLE_PRE_ROUND_START);
    }

    // 进入战场回合循环（生成roundBase列表，直到战斗结束）
    public battleRoundStart():void {
        var roundBase:RoundBase = GameModules.round.createRound(this.curBattle.roundList.length + 1, this.curBattle);
        this.curBattle.changeRound(roundBase);
    }

    // 进入敌方回合阶段
    public battleEnemyRoundStart():void {
        var roundBase = this.curBattle.curRound;
        this.curBattle.changeEnemyRound(roundBase);
    }
    
    // 战场结束阶段
    public battleEnd():void {
        this.curBattle.stopBattle();
    }

    public battleDesdroy():void {
        this.curBattle.stopBattle();
        this.curBattle.destroyBattle();
        this.curBattle = null;
    }
    
    public showBattleByType(battleType:EnumBattleType):void {
        // 根据战斗类型创建对应的战斗实例并显示
        let battleInstance:any;
    }

    protected show():void {
        console.log("modulebattle SHOW")
    }
    
    protected remove():void {
        this.battleDesdroy();
        console.log("modulebattle REMOVE")
    }
}