import { FightCoreLogSystemEnterVo } from "../../../gameModel/data/FightCoreLog/FightCoreLogSystemEnterVo";
import { EnumFightCoreLogType } from "../../../gameModel/enum/EnumFightCoreLogType";
import { GameModels } from "../../../gameModel/GameModels";
import { GameModules } from "../../../gameModule/GameModules";
import { BattleBase } from "../battle/BattleBase";
import { EnumBattleState } from "../battle/EnumBattleState";
import { ModuleBattleEvent } from "../ModuleBattleEvent";
import { BattleStateBase } from "./BattleStateBase";
    
export class BattleStateStart extends BattleStateBase {
    
    constructor(battle:BattleBase, state:EnumBattleState) {
        super(battle, state);
    }
    
    protected onEnterState():void { 
        console.log(`进入状态: ${this.state}`);
        const bv = this.battle.battleVo;
        GameModels.fightLog.showLogByType(
            EnumFightCoreLogType.SYSTEM_ENTER_BATTLE,
            new FightCoreLogSystemEnterVo(bv.getBattleSceneName(), bv.getBattleTargetName())
        );
        GameModules.battle.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_START, this.battle);
    }
    
    protected onExitState():void { 
        console.log(`退出状态: ${this.state}`);
        GameModules.battle.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_START_EXIT, this.battle);
    }
    
}