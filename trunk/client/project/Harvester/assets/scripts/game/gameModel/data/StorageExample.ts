import { App } from "../../../framework/managers/App";
import { StorageKeys } from "./StorageKeys";
import type { IGameSettings, IPlayerSaveData, SkillLevelMap } from "./StorageTypes";

/**
 * 存储使用示例 - 展示不同数据结构的读写
 */
export class StorageExample {

    /** 1. 基础类型：number / string / boolean */
    static savePrimitives(): void {
        const cookie = App.cookieManager;

        cookie.set(StorageKeys.LAST_LOGIN_TIME, Date.now());
        cookie.set(StorageKeys.USER_NAME, "玩家001");
        cookie.set(StorageKeys.MUSIC_ENABLED, true);
    }

    static loadPrimitives(): void {
        const cookie = App.cookieManager;

        const loginTime = cookie.getNumber(StorageKeys.LAST_LOGIN_TIME, 0);
        const userName = cookie.getString(StorageKeys.USER_NAME, "游客");
        const musicOn = cookie.getBoolean(StorageKeys.MUSIC_ENABLED, true);

        console.log(loginTime, userName, musicOn);
    }

    /** 2. 对象结构 */
    static saveSettings(): void {
        const settings: IGameSettings = {
            musicVolume: 0.8,
            sfxVolume: 1.0,
            musicEnabled: true,
            sfxEnabled: true,
            language: "zh",
            quality: 2,
        };
        App.cookieManager.set(StorageKeys.SETTINGS, settings);
    }

    static loadSettings(): IGameSettings {
        const defaultSettings: IGameSettings = {
            musicVolume: 0.5,
            sfxVolume: 0.5,
            musicEnabled: true,
            sfxEnabled: true,
            language: "zh",
            quality: 1,
        };
        return App.cookieManager.get<IGameSettings>(StorageKeys.SETTINGS, defaultSettings) == null ? defaultSettings : App.cookieManager.get<IGameSettings>(StorageKeys.SETTINGS, defaultSettings);
    }

    /** 3. 数组结构 */
    static saveUnlockedHeroIds(): void {
        const heroIds = [1001, 1002, 1003, 1005];
        App.cookieManager.set(StorageKeys.UNLOCKED_HERO_IDS, heroIds);
    }

    static loadUnlockedHeroIds(): number[] {
        const ids = App.cookieManager.get<number[]>(StorageKeys.UNLOCKED_HERO_IDS);
        return ids == null ? [] : ids;
    }

    /** 4. 嵌套对象（复杂存档） */
    static savePlayerData(): void {
        const data: IPlayerSaveData = {
            version: 1,
            gold: 9999,
            diamond: 100,
            level: 10,
            exp: 2500,
            lastSaveTime: Date.now(),
            heroList: [
                { heroId: 1001, level: 5, star: 3, unlockTime: Date.now() - 86400000 },
                { heroId: 1002, level: 3, star: 2, unlockTime: Date.now() },
            ],
            completedStageIds: [1, 2, 3, 4, 5],
        };
        App.cookieManager.set(StorageKeys.PLAYER_SAVE_DATA, data);
    }

    static loadPlayerData(): IPlayerSaveData | null {
        return App.cookieManager.get<IPlayerSaveData>(StorageKeys.PLAYER_SAVE_DATA);
    }

    /** 5. 字典/映射结构 Record<K, V> */
    static saveSkillLevelMap(): void {
        const map: SkillLevelMap = {
            2001: 5,   // skillId -> level
            2002: 3,
            2003: 1,
        };
        App.cookieManager.set(StorageKeys.SKILL_LEVEL_MAP, map);
    }

    static loadSkillLevelMap(): SkillLevelMap {
        return App.cookieManager.get<SkillLevelMap>(StorageKeys.SKILL_LEVEL_MAP) == null ? {} : App.cookieManager.get<SkillLevelMap>(StorageKeys.SKILL_LEVEL_MAP);
    }

    /** 6. 合并更新（部分更新对象） */
    static updateSettingsPartial(partial: Partial<IGameSettings>): void {
        const current = StorageExample.loadSettings();
        const merged = { ...current, ...partial };
        App.cookieManager.set(StorageKeys.SETTINGS, merged);
    }

    /** 7. 数组追加 */
    static addUnlockedHero(heroId: number): void {
        const ids = StorageExample.loadUnlockedHeroIds();
        if (ids.indexOf(heroId) === -1) {
            ids.push(heroId);
            App.cookieManager.set(StorageKeys.UNLOCKED_HERO_IDS, ids);
        }
    }
}
