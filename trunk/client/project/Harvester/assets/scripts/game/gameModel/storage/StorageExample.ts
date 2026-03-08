import { App } from "../../../framework/managers/App";
import { GameModels } from "../GameModels";
import { StorageKeys } from "./StorageKeys";
import type { IGameSettings, IPlayerSaveData } from "./StorageTypes";

/**
 * 存储使用示例 - 展示不同数据结构的读写
 */
export class StorageExample {

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

    /** 6. 合并更新（部分更新对象） */
    static updateSettingsPartial(partial: Partial<IGameSettings>): void {
        const current = GameModels.setting.loadSettings();
        const merged = { ...current, ...partial };
        App.cookieManager.set(StorageKeys.SETTINGS, merged);
    }

    /** 7. 数组追加 */
    static addUnlockedHero(heroId: number): void {
        const ids = GameModels.heroBook.loadUnlockedHeroIds();
        if (ids.indexOf(heroId) === -1) {
            ids.push(heroId);
            App.cookieManager.set(StorageKeys.UNLOCKED_HERO_IDS, ids);
        }
    }
}
