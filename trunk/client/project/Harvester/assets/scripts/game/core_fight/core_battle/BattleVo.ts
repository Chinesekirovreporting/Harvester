import { BaseActor } from "../core_actor/BaseActor";
import { EnumBattleType } from "./battle/EnumBattleType";

// 战场信息结构体，包含开启一个战场相关信息
export class BattleVo {
    // 战场ID，战场类型，战场单位列表，战场效果列表，战场时间，战斗日志
    public battleID:number;
    public battleType:EnumBattleType;
    public battleTarget:BaseActor;
}