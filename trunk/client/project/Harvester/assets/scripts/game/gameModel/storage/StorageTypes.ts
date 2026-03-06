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

//
/**
 * 技能等级映射 { skillId: level }，注：这行代码定义了一个类型别名，表示“以数字为键、数字为值的对象”。
 */
export type SkillLevelMap = Record<number, number>;
