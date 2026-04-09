export enum EnumFightCoreLogType {
    NORMAL = 0,             // 常规日志[消息：xxx]
    ENTER_BATTLE = 1,       // 进入战场日志[系统：进入战场]
    ENTER_ROUND = 2,        // 进入回合日志[系统：进入回合]
    ENTER_SKILL = 4,        // 进入技能日志[战斗：释放技能]
    ENTER_BUFF = 5,         // 进入BUFF日志[状态：受到BUFF]
    ENTER_EFFECT = 6,       // 进入效果日志[效果：谁通过什么方式受到了什么效果]
    ENTER_ATTR = 7,         // 进入属性日志[属性：谁发生了什么属性变化]
    ENTER_ACTOR = 8,        // 进入角色日志[角色：谁发生的什么效果]
}