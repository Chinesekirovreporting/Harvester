import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { HeroAttrCFG } from "../../gameModel/table/tableClass/HeroAttrCFG";
import { BaseActor } from "../core_actor/BaseActor";
import { EnumEffectType } from "../core_effect/effects/EnumEffectType";
import { EnumAttr } from "./EnumAttr";
import { AttrModifyResultTable, DamageResultTable, HealResultTable } from "./FightCalcResultTables/FightCalcResourceTables";
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
        if (defender.shield > 0) {
            if (damage > defender.shield) {
                damage -= defender.shield;
                defender.shield = 0;
            } else {
                defender.shield -= damage;
                damage = 0;
            }
        }
        // 扣除护盾后，再扣除血量,血量归零则阵亡
        defender.hp -= damage;
        var beKilled = false;
        if (defender.hp <= 0) {
            defender.hp = 0;
            beKilled = true;
        }
        return new DamageResultTable( false, false, attacker, defender, damage, beKilled );
    }

    /**
     * 治疗结算：增加目标 HP，不超过英雄表中的生命上限（与 AttrVo 初始 HP 同源）。
     */
    public static calculateHeal(caster:BaseActor, target:BaseActor, baseHeal:number):HealResultTable {
        var heal:number = baseHeal * caster.attrVo.MAGIC_POWER / 100;
        if (heal <= 0) {
            heal = baseHeal;
        }
        var heroAttr:HeroAttrCFG = App.tableManager.getTable($Tables.HeroAttrCFG, target.heroID) as HeroAttrCFG;
        var maxHp:number = target.attrVo.HP;
        var before:number = target.hp;
        var after:number = Math.min(maxHp, before + heal);
        var applied:number = after - before;
        target.hp = after;
        return new HealResultTable(false, false, caster, target, applied);
    }

    /**
     * 属性修改器
     * @param caster 施法者
     * @param target 目标
     * @param attrType 属性类型
     * @param baseValue 基础属性修改值
     * @param effectType 效果类型
     * @returns 
     */
    public static calculateAttrModify(caster:BaseActor, target:BaseActor, attrType:EnumAttr, baseValue:number, valueScale:number):AttrModifyResultTable {
        var baseAttr:number = target.getAttr(attrType);   // 原属性 
        var valueAttr:number = baseAttr * valueScale + baseValue;   // 修正后属性
        target.setAttr(attrType, valueAttr); // 乘法修正+加法修正
        var resultAttr:number = baseAttr + valueAttr;   // 修正后属性 = 原属性 + 修正后属性
        return new AttrModifyResultTable(attrType, resultAttr);
    }
}