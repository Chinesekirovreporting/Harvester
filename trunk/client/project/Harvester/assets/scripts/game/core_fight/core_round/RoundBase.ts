// 回合基类，每个回合包含当前回合，所有角色的所有动作，所有的BUFF生效等
import { RoundActionBase } from "../core_action/RoundActionBase";
import { BaseActor } from "../core_actor/BaseActor";

export class RoundBase {
    public roundID:number;
    public roundType:number;
    public roundTarget:BaseActor;
    public roundActionList:RoundActionBase[];
}