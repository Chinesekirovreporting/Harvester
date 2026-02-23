// 战斗计算器，静态函数，里面包含各种属性计算的函数，伤害计算，治疗计算，增益计算，减益计算等
export class FightCalcFunc {
    /**
     * 计算属性值
     * @param baseValue 基础属性值
     * @param percent 增加百分比
     * @param flat 增加固定值
     * @returns 计算后的属性值
     */
    public static calculateAttr(baseValue:number, percent:number, flat:number):number {
        return baseValue * (1 + percent) + flat;
    }
}