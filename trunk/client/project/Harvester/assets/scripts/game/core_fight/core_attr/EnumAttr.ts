export enum EnumAttr {
    // 战斗属性，一级属性
    // 生命
    HP = 1,
    // 当前血量
    CUR_HP = 2,
    // 法力
    MP = 3,
    // 当前法力
    CUR_MP = 4,
    // 攻击强度
    ATTACK_POWER = 5,
    // 法术强度
    MAGIC_POWER = 6,
    // 护甲（物理防御）
    ARMOR = 7,
    // 护盾（过量生命）
    SHIELD = 8,
    // 法术抗性（法术防御）
    MAGIC_RESIST = 9,
    // 暴击率
    CRIT_RATE = 10,
    // 暴击伤害
    CRIT_DMG = 11,
    // 闪避率
    DODGE_RATE = 12,
    // 命中率
    HIT_RATE = 13,

    // 人物基础属性，二级属性
    // 力量
    STR = 101,
    // 敏捷
    AGI = 102,
    // 智力
    INT = 103,
    // 精神
    SPI = 104,
    // 耐力
    END = 105,
    // 智慧（每个回合的抽牌数量）
    WIS = 106,

    // 状态效果枚举（数值表示状态效果的持续回合数）
    // 眩晕
    STUN = 201,
    // 沉默
    SILENCE = 202,
}