import { BaseActor } from "../core_actor/BaseActor";
import { DamageResultTable } from "./FightCalcResultTables/FightCalcResourceTables";
// 魔法效果的几大要素汇总，damage计算伤害，heal计算治疗，buff计算增益，debuff计算减益。

// 战斗计算器，静态函数，里面包含各种属性计算的函数，伤害计算，治疗计算，增益计算，减益计算等。
// 注：用于梳理最终的魔法效果，概率不在这里计算，只计算属性值和伤害值公式。
export class FightCalcFunc {

    // 是否是GM伤害，用于测试
    public static bIsGMDamage:boolean = true;       
    // /**
    //  * 计算属性值
    //  * @param baseValue 基础属性值
    //  * @param percent 增加百分比
    //  * @param flat 增加固定值
    //  * @returns 计算后的属性值
    //  */
    // public static calculateAttr(baseValue:number, percent:number, flat:number):number {
    //     return baseValue * (1 + percent) + flat;
    // }

    /**
     * 计算伤害
     * @param attacker 攻击者
     * @param defender 防御者
     * @returns 伤害值
     */
    public static calculateAttackPowerDamage(attacker:BaseActor, defender:BaseActor, damage:number):DamageResultTable {
        // 属性模块优先处理数据运算，将结果返回给魔法效果管理器,从而将数据和表现进行分离
        // 伤害值 = （攻强- 护甲）/100 * 伤害值
        var damage:number = damage * (  attacker.attrVo.ATTACK_POWER - defender.attrVo.ARMOR) / 100;
        if (FightCalcFunc.bIsGMDamage) {
            damage = 1000;
        }
        // 优先扣除护盾 
        if (defender.attrVo.SHIELD > 0) {
            if (damage > defender.attrVo.SHIELD) {
                damage -= defender.attrVo.SHIELD;
                defender.attrVo.SHIELD = 0;
            } else {
                defender.attrVo.SHIELD -= damage;
                damage = 0;
            }
        }
        // 扣除护盾后，再扣除血量,血量归零则阵亡
        defender.attrVo.HP -= damage;
        var beKilled = false;
        if (defender.attrVo.HP <= 0) {
            defender.attrVo.HP = 0;
            beKilled = true;
        }
        return new DamageResultTable( false, false, attacker, defender, damage, beKilled );
    }
}