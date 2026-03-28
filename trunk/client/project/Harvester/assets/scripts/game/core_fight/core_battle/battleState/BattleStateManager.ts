import { BattleBase } from "../battle/BattleBase";
import { EnumBattleState } from "../battle/EnumBattleState";
import { BattleStateBase } from "./BattleStateBase";
import { BattleStateEnd } from "./BattleStateEnd";
import { BattleStatePreRoundStart } from "./BattleStatePreRoundStart";
import { BattleStateRoundEnemyStart } from "./BattleStateRoundEnemyStart";
import { BattleStateRoundFriendStart } from "./BattleStateRoundFriendStart";
import { BattleStateStart } from "./BattleStateStart";

export class BattleStateManager {
    public battle:BattleBase;
    public curBattleState:EnumBattleState;
    public battleStateDict:Record<number, BattleStateBase> = {}

    constructor(battle:BattleBase) {
        this.battle = battle;
        this.registerBattleState();
        this.curBattleState = EnumBattleState.BATTLE_NONE;
    }

    private registerBattleState():void {
        this.battleStateDict[EnumBattleState.BATTLE_START] = new BattleStateStart(this.battle, EnumBattleState.BATTLE_START);
        this.battleStateDict[EnumBattleState.BATTLE_PRE_ROUND_START] = new BattleStatePreRoundStart(this.battle, EnumBattleState.BATTLE_PRE_ROUND_START);
        this.battleStateDict[EnumBattleState.BATTLE_ROUND_FRIEND_START] = new BattleStateRoundFriendStart(this.battle, EnumBattleState.BATTLE_ROUND_FRIEND_START);
        this.battleStateDict[EnumBattleState.BATTLE_ROUND_ENEMY_START] = new BattleStateRoundEnemyStart(this.battle, EnumBattleState.BATTLE_ROUND_ENEMY_START);
        this.battleStateDict[EnumBattleState.BATTLE_END] = new BattleStateEnd(this.battle, EnumBattleState.BATTLE_END);
    }

    public startBattle():void {
        this.changeState(EnumBattleState.BATTLE_START)
    }

    public changeState(state:EnumBattleState):void {
        if( this.curBattleState == state ) {
            return;
        }
        // 如果存在当前的状态，则先退出当前的状态
        if (this.curBattleState != EnumBattleState.BATTLE_NONE) {
            this.battleStateDict[this.curBattleState].exitState();
        }
        this.curBattleState = state;
        this.battleStateDict[state].enterState();
    }

    public stopBattle():void {
        this.changeState(EnumBattleState.BATTLE_END)
    }
    
}