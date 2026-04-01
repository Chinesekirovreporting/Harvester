import { IPooledObject } from "db://assets/scripts/framework/utils/objectPool/IPooledObjpect";
import { BattleVo } from "../BattleVo";

export class AbstractBattle implements IPooledObject{
    public battleVo:BattleVo;   // 战斗数据，包含战斗双方的角色信息、战斗环境信息等
    constructor() {

    }
    public initBattle():void {

    }

    public startBattle():void {

    }

    public stopBattle():void {

    }

    public update():void {
        // 战场更新逻辑，主要是处理战斗流程和状态的更新等
    }

    // 对象池借口
    public onPoolGet(): void {

    }

    public onPoolReset(): void {

    }  
    
    public onPoolDispose(): void {

    }
}