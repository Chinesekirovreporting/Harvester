export class ModuleBattleEvent {
    public static readonly ON_BATTLE_START:string = "ON_BATTLE_START";                                              // 战斗开始阶段
    public static readonly ON_BATTLE_START_EXIT:string = "ON_BATTLE_START_EXIT";                                    // 战斗开始阶段退出
    public static readonly ON_BATTLE_PRE_ROUND_START:string = "ON_BATTLE_PRE_ROUND_START";                          // 战斗回合开始前准备阶段
    public static readonly ON_BATTLE_PRE_ROUND_START_EXIT:string = "ON_BATTLE_PRE_ROUND_START_EXIT";                // 战斗回合开始前准备阶段退出
    public static readonly ON_BATTLE_ROUND_START:string = "ON_BATTLE_ROUND_START";                                  // 战斗回合开始阶段 -- 大循环
    public static readonly ON_BATTLE_ROUND_START_EXIT:string = "ON_BATTLE_ROUND_START_EXIT";                        // 战斗回合开始阶段 -- 大循环退出
    public static readonly ON_BATTLE_FRIEND_ROUND_START:string = "ON_BATTLE_FRIEND_ROUND_START";                    // 战斗友方回合开始阶段 -- 大循环
    public static readonly ON_BATTLE_FRIEND_ROUND_START_EXIT:string = "ON_BATTLE_FRIEND_ROUND_START_EXIT";          // 战斗友方回合开始阶段 -- 大循环退出
    public static readonly ON_BATTLE_ENEMY_ROUND_START:string = "ON_BATTLE_ENEMY_ROUND_START";                      // 战斗敌方回合开始阶段 -- 大循环
    public static readonly ON_BATTLE_ENEMY_ROUND_START_EXIT:string = "ON_BATTLE_ENEMY_ROUND_START_EXIT";            // 战斗敌方回合开始阶段 -- 大循环退出
    public static readonly ON_BATTLE_END:string = "ON_BATTLE_END";                                                  // 战斗结束阶段
    public static readonly ON_BATTLE_END_EXIT:string = "ON_BATTLE_END_EXIT";                                        // 战斗结束阶段退出
}