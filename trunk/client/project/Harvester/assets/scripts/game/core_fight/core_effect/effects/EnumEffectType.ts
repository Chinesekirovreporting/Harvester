// 魔法效果枚举,每种魔法效果对应一种效果的计算类型和表现形式
export enum EnumEffectType {
    // 伤害
    Damage = 1,
    // 治疗
    Heal = 2,
    // 护盾
    Shield = 3,
    // 属性增益
    AttrModify = 4,
    // 特殊效果（用于一些特殊限制类效果，如眩晕、沉默、恐惧等）
    SpecialEffect = 5,
}