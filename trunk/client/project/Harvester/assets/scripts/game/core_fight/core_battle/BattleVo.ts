import { BaseActor } from "../core_actor/BaseActor";
import { EnumFaction } from "../core_actor/EnumFaction";
import { EnumBattleType } from "./battle/EnumBattleType";
import { BattleRewardDropItemVo } from "../../gameModel/data/BattleRewardDropItemVo";

// 战场信息结构体，包含开启一个战场相关信息
export class BattleVo {
    // 战场ID，战场类型，战场单位列表，战场效果列表，战场时间，战斗日志
    public battleID:number;
    public battleType:EnumBattleType;
    public battleActor:BaseActor;
    public battleTarget:BaseActor;
    /** 结算是否胜利（战斗流程在结束前写入） */
    public isVictory:boolean;
    /** 结算奖励列表（道具 ID 对应 ItemCFG.ID） */
    public rewardDropList: BattleRewardDropItemVo[];
    constructor(battleID:number,battleType:EnumBattleType) {
        this.battleID = battleID;
        this.battleType = battleType;
        this.battleActor = new BaseActor(1, EnumFaction.FRIEND);
        this.battleTarget = new BaseActor(2, EnumFaction.ENEMY);
        this.isVictory = true;
        this.rewardDropList = [];
    }

    public getBattleSceneName():string {
        return "试炼林地";
    }

    public getBattleTargetName():string {
        return this.battleTarget.name;
    }
}