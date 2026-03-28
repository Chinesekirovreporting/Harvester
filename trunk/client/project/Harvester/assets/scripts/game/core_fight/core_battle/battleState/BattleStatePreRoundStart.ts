import { GameModules } from "../../../gameModule/GameModules";
import { BattleBase } from "../battle/BattleBase";
import { EnumBattleState } from "../battle/EnumBattleState";
import { ModuleBattleEvent } from "../ModuleBattleEvent";
import { BattleStateBase } from "./BattleStateBase";

export class BattleStatePreRoundStart extends BattleStateBase {
    constructor(battle:BattleBase, state:EnumBattleState) {
        super(battle, state);
    }

    protected onEnterState():void {
        // console.log(`进入状态: ${this.state}`);
        GameModules.battle.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_PRE_ROUND_START, this.battle);
    }

    protected onExitState():void {
        // console.log(`退出状态: ${this.state}`);
        GameModules.battle.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_PRE_ROUND_START_EXIT, this.battle);
    }
}