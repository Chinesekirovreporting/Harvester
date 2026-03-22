import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BaseActor } from "../core_actor/BaseActor";
import { EffectDamage } from "../core_effect/effects/EffectDamage";
import { FightCalcFunc } from "./FightCalcFunc";
import { DamageResultTable, ResultTable } from "./FightCalcResultTables/FightCalcResourceTables";

// 属性模块负责封装复杂属性的逻辑运算，与ModuleEffect模块协同工作。
export class ModuleAttr extends AbstractModule {

    protected init():void {
        console.log("初始化ModuleAttr")
    }

    public calcByDamageEffect(effectDamage:EffectDamage):ResultTable {
        console.log("ModuleAttr计算伤害效果", effectDamage)
        return this.attackPowerCalc(effectDamage.useActor, effectDamage.targetActor, effectDamage.effectVo.effectCFG.BaseValue);
    }

    // 进攻属性计算,包含命中概率,暴击概率,闪避概率,命中率等。命中率计算包含闪避概率。
    /**
     * 计算攻击强度伤害
     * @param attacker 攻击者
     * @param defender 防御者
     * @param damage 伤害值
     * @returns 计算后的伤害值
     */
    public attackPowerCalc(attacker:BaseActor, defender:BaseActor, damage:number):ResultTable {
        var result:ResultTable = FightCalcFunc.calculateAttackPowerDamage(attacker, defender, damage);
        return result;
    }
}