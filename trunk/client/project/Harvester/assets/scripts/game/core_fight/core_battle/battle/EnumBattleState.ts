export enum EnumBattleState {
    BATTLE_NONE = 0,                // 
    BATTLE_START = 1,               // 战场开始阶段
    BATTLE_PRE_ROUND_START = 2,     // 回合开始前准备阶段
    BATTLE_ROUND_FRIEND_START = 3,  // 友方回合开始 -- 大循环
    BATTLE_ROUND_ENEMY_START = 4,   // 敌方回合开始 -- 大循环
    BATTLE_END = 5,                 // 战场结束阶段
    // BATTLE_ROUND_FRIEND_END = 4,    // 友方回合结束 -- 大循环
    // BATTLE_ROUND_ENEMY_END = 6,     // 敌方回合结束 -- 大循环
}