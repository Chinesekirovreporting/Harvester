/** 战斗日志节点类型（对应文案前缀：系统 / 回合 / 状态 / 战斗 / 属性 / 效果） */
export enum EnumFightCoreLogType {
    NORMAL = 0,
    /** 系统：进入战场 */
    SYSTEM_ENTER_BATTLE = 1,
    /** 回合：进入回合 - 第 N 回合循环 */
    ROUND_ENTER_LOOP = 2,
    /** 回合：进入回合前 BUFF 结算 */
    ROUND_PRE_BUFF = 3,
    /** 回合：进入友方回合 */
    ROUND_FRIEND = 4,
    /** 回合：进入敌方回合 */
    ROUND_ENEMY = 5,
    /** 回合：回合结束 */
    ROUND_END = 6,
    /** 状态：来自 Buff 的持续伤害等 */
    STATUS_DOT_DAMAGE = 7,
    /** 状态：受到 DEBUFF */
    STATUS_DEBUFF_APPLY = 8,
    /** 战斗：释放技能 */
    BATTLE_SKILL_CAST = 9,
    /** 属性：属性变化 */
    ATTR_CHANGE = 10,
    /** 效果：技能或 Buff 造成的伤害结果 */
    EFFECT_DAMAGE = 11,
    /** 效果：技能或 Buff 造成的治疗结果 */
    EFFECT_HEAL = 12,
}
