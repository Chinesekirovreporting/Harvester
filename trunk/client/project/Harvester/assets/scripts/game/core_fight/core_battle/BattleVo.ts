import { BaseActor } from "../core_actor/BaseActor";
import { EnumFaction } from "../core_actor/EnumFaction";
import { EnumBattleType } from "./battle/EnumBattleType";

// 战场信息结构体，包含开启一个战场相关信息
export class BattleVo {
    // 战场ID，战场类型，战场单位列表，战场效果列表，战场时间，战斗日志
    public battleID:number;
    public battleType:EnumBattleType;
    public battleActor:BaseActor;
    public battleTarget:BaseActor;
    constructor(battleID:number,battleType:EnumBattleType) {
        this.battleID = battleID;
        this.battleType = battleType;
        this.battleActor = new BaseActor(1, EnumFaction.FRIEND);
        this.battleTarget = new BaseActor(2, EnumFaction.ENEMY);
    }
}