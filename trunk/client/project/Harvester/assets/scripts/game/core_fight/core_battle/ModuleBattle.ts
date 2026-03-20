import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BattleBase } from "./battle/BattleBase";
import { EnumBattleType } from "./battle/EnumBattleType";
import { BattleFactory } from "./BattleFactory";
import { BattleVo } from "./BattleVo";
import { ModuleBattleEvent } from "./ModuleBattleEvent";

export class ModuleBattle extends AbstractModule{
    public curBattle:BattleBase;                   // 当前战场
    protected init():void {
        console.log("初始化moduleBattle模块")
    }
    
    public battleStart():void {
        this.curBattle = BattleFactory.createBattle(EnumBattleType.NORMAL, new BattleVo());
        this.curBattle.startBattle();
        this.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_START, this.curBattle);
    }

    public battleEnd():void {
        this.curBattle.stopBattle();
        this.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_END, this.curBattle);
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