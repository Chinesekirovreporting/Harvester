export enum EnumTargetType {
    SELF = 0,                       // 自身
    ENEMY = 1,                      // 敌人
    ALLY = 2,                       // 友军
    ALL = 3,                        // 所有
    RANDOM = 4,                     // 随机
    NEAREST = 5,                    // 最近
    FARTHEST = 6,                   // 最远
    LOWEST_HP = 7,                  // 血量最低
    HIGHEST_HP = 8,                 // 血量最高
    LOWEST_MP = 9,                  // 法力最低
    HIGHEST_MP = 10,                // 法力最高
    LOWEST_ARMOR = 11,              // 护甲最低
    HIGHEST_ARMOR = 12,             // 护甲最高
    LOWEST_SHIELD = 13,             // 护盾最低
    HIGHEST_SHIELD = 14,            // 护盾最高
    LOWEST_MAGIC_RESIST = 15,       // 法术抗性最低
    HIGHEST_MAGIC_RESIST = 16,      // 法术抗性最高
}