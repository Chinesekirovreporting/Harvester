import { ObjectPoolManager } from "../../../framework/utils/objectPool/ObjectPoolManager";
import { BattleBase } from "./battle/BattleBase";
import { BattleMoltenCore } from "./battle/BattleMoltenCore";
import { EnumBattleType } from "./battle/EnumBattleType";

// 用于创建和管理战斗相关的模块和对象的工厂类
export class BattleFactory {
    /**
     * 创建资源
     */
    public static createBattle(battleType:EnumBattleType, data:Object):BattleBase {
        var battleBase:BattleBase;
        switch (battleType) {
            case EnumBattleType.NORMAL:
                // battleBase = new BattleBase();  
                battleBase = ObjectPoolManager.inst.getObject(BattleBase) as BattleBase;
                break;
            case EnumBattleType.MOLTEN_CORE:
                battleBase = new BattleMoltenCore();  // ObjectPoolManager.inst.getObject(BattleMoltenCore) TODO
                break;
        }

        if (battleBase != null) {
            battleBase.data = data;
        }
        return battleBase;
    }
}