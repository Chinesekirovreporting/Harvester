import { BattleBase } from "../battle/BattleBase";
import { EnumBattleState } from "../battle/EnumBattleState";

export class BattleStateBase {
    public battle:BattleBase;
    public state:EnumBattleState;
    
    constructor(battle:BattleBase, state:EnumBattleState) {
        this.battle = battle;
        this.state = state;
    }

    public enterState():void {
        // console.log(`进入状态: ${this.state}`);
        this.onEnterState();
    }

    protected onEnterState():void {
        // console.log(`进入状态: ${this.state}`);
    }

    public exitState():void {
        // console.log(`退出状态: ${this.state}`);
        this.onExitState();
    }

    protected onExitState():void {
        // console.log(`退出状态: ${this.state}`);
    }
}