// BUFF类型，包含增益类型和减益类型，相同类型后者覆盖前者
export enum EnumBuffType {
    // 增加生命上限，增加法力上限，增加攻击强度，增加法术强度，增加护甲，增加护盾，增加法术抗性，增加暴击率，增加暴击伤害，增加闪避率，增加命中率
    // 增益类型
    ADD_HP = 1,
    ADD_MP = 2,
    ADD_ATTACK_POWER = 3,
    ADD_MAGIC_POWER = 4,
    ADD_ARMOR = 5,
    ADD_SHIELD = 6,
    ADD_MAGIC_RESIST = 7,
    ADD_CRIT_RATE = 8,
    ADD_CRIT_DMG = 9,
    ADD_DODGE_RATE = 10,
    ADD_HIT_RATE = 11,
    // DEBUFF = 1,
}