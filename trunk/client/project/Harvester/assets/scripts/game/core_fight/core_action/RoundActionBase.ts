import { BaseActor } from "../core_actor/BaseActor";
import { EnumRoundActionType } from "./EnumRoundActionType";

// 回合动作基类，每个回合动作可能是一个技能释放，或者一个buff生效等
export class RoundActionBase {
    public actionID:number;
    public actionType:EnumRoundActionType; // 动作类型
    public actionTarget:BaseActor;
}