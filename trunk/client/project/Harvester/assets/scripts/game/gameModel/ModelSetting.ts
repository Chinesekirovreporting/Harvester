import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { StorageKeys } from "./storage/StorageKeys";
import { IGameSettings } from "./storage/StorageTypes";

export class ModelSetting extends AbstractModel {
    protected init() {
        this.loadSettings();

    }

    /** 保存游戏内设置 2. 对象结构 */
    private saveSettings(): void {
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

    public loadSettings(): IGameSettings {
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
}