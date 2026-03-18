import { AbstractBattle } from "./AbstractBattle";

// 普通战斗场景
export class BattleBase extends AbstractBattle {
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