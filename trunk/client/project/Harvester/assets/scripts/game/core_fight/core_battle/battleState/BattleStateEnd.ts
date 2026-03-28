import { GameModules } from "../../../gameModule/GameModules";
import { BattleBase } from "../battle/BattleBase";
import { EnumBattleState } from "../battle/EnumBattleState";
import { ModuleBattleEvent } from "../ModuleBattleEvent";
import { BattleStateBase } from "./BattleStateBase";

export class BattleStateEnd extends BattleStateBase {
    constructor(battle:BattleBase, state:EnumBattleState) {
        super(battle, state);
    }

    protected onEnterState():void {
        // console.log(`进入状态: ${this.state}`);
        GameModules.battle.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_END, this.battle);
    }

    protected onExitState():void {
        // console.log(`退出状态: ${this.state}`);
        GameModules.battle.dispatchEventWithData(ModuleBattleEvent.ON_BATTLE_END_EXIT, this.battle);
    }
}