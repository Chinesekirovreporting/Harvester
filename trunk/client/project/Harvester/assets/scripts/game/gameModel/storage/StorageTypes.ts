// 此文件定义所有存储数据的类型

/**
 * 游戏设置
 */
export interface IGameSettings {
    musicVolume: number;      // 0-1
    sfxVolume: number;        // 0-1
    musicEnabled: boolean;
    sfxEnabled: boolean;
    language: string;         // "zh" | "en"
    quality: number;          // 0=低 1=中 2=高
}

/**
 * 英雄进度
 */
export interface IHeroProgress {
    heroId: number;
    level: number;
    star: number;
    unlockTime: number;
}

/**
 * 玩家存档（嵌套结构）
 */
export interface IPlayerSaveData {
    version: number;
    gold: number;
    diamond: number;
    level: number;
    exp: number;
    lastSaveTime: number;
    heroList: IHeroProgress[];
    completedStageIds: number[];
}

/**
 * 技能等级映射字典 { skillId: level }，注：这行代码定义了一个类型别名，表示“以数字为键、数字为值的对象”。
 */
export type SkillLevelDict = Record<number, number>;

/** 物品格子数据；注:在物品的持久化描述中，只有存在于格子的数据才有持久化的意义 */
export interface IItemSlot {
    gridId: number;
    itemId: number;
    count: number;
}

/**
 * 背包物品字典 { itemId: IItemSlot }
 */
export type ItemBagDict = Record<number, IItemSlot>;