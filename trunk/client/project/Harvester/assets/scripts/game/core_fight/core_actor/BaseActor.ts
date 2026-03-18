import { BaseSkill } from "../core_skill/BaseSkill";

export class BaseActor {
    public name:string;                // 名称
    public heroID:number;             // 英雄ID
    public hp:number;                 // 生命值
    public mp:number;                 // 魔法值
    public attackPower:number;
    public magicPower:number;         // 魔法强度
    public armor:number;              // 护甲
    public shield:number;             // 护盾
    public magicResist:number;        // 魔法抗性
    public critRate:number;
    public critDmg:number;           // 暴击伤害
    public dodgeRate:number;          // 闪避率
    public hitRate:number;            // 命中率
    public skillList:BaseSkill[]      // 技能列表

    constructor(heroID:number) {
        this.heroID = heroID;
    }
}