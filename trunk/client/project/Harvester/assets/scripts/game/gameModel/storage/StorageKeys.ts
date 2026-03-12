/**
 * 本地存储 Key 常量
 * 统一管理，避免硬编码
 */
export const StorageKeys = {
    VERSION: "storage_version",                                     // number 基础类型 - 存储版本号，用于数据迁移
    LAST_LOGIN_TIME: "last_login_time",                             // number 基础类型 - 上次登录时间
    USER_NAME: "user_name",                                         // string 基础类型 - 用户名
    MUSIC_ENABLED: "music_enabled",                                 // boolean 基础类型 - 是否开启音乐
    UNLOCKED_HERO_IDS: "unlocked_hero_ids",                         // number[] 数组结构 - 已解锁英雄ID列表 
    SETTINGS: "settings",                                           // IGameSettings 单一对象结构 - 游戏设置
    
    SKILL_LEVEL_DICT: "skill_level_dict",                          // SkillLevelDict 字典结构 - 技能等级映射 
    ITEM_BAG_DICT: "item_bag_dict",                                // ItemBagDict 字典结构 - 背包物品 { itemId: IItemSlot }

    HERO_EQUIP_DICT: "hero_equip_dict",                           // HeroEquipMap 字典结构 - 英雄装备 { heroId: { slotType: itemId } }
    PLAYER_SAVE_DATA: "player_save_data",                         // IPlayerSaveData 嵌套对象 - 玩家完整存档 
    TALENT_POINTS_DICT: "talent_points_dict",                     // TalentPointsMap 字典结构 - 天赋加点 { treeId: { talentId: rank } }
} as const;
