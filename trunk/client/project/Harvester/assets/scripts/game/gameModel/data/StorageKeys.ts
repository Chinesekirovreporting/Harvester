/**
 * 本地存储 Key 常量
 * 统一管理，避免硬编码
 */
export const StorageKeys = {
    /** 存储版本号，用于数据迁移 */
    VERSION: "harvester_storage_version",

    /** 基础类型示例 */
    LAST_LOGIN_TIME: "harvester_last_login_time",   // number
    USER_NAME: "harvester_user_name",               // string
    MUSIC_ENABLED: "harvester_music_enabled",       // boolean

    /** 对象结构 - 游戏设置 */
    SETTINGS: "harvester_settings",

    /** 数组结构 - 已解锁英雄ID列表 */
    UNLOCKED_HERO_IDS: "harvester_unlocked_hero_ids",

    /** 嵌套对象 - 玩家完整存档 */
    PLAYER_SAVE_DATA: "harvester_player_save_data",

    /** 字典结构 - 技能等级映射 */
    SKILL_LEVEL_MAP: "harvester_skill_level_map",
} as const;
