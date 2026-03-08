import { App } from "../../framework/managers/App";
import { Dictionary } from "../../framework/utils/Dictionary";
import { AbstractModel } from "./AbstractModel";
import { StorageKeys } from "./storage/StorageKeys";
import { HeroBookCFG } from "./table/tableClass/HeroBookCFG";

export class ModelRole extends AbstractModel{
    // 角色数据
    public roleAccount:number;
    public roleName:string;
    public roleCreateTime:number;
    public roleLevel:number;
    public roleExp:number;
    public roleGold:number;
    public roleDiamond:number;
    public roleVip:number;
    // 角色英雄数据 英雄ID:英雄结构体HeroVo
    public heroDic:Record<number,HeroBookCFG> = {}; // 英雄字典

    protected init() {
        // 初始化直接加载本地数据
        this.loadLocalRoleData();
        // 加载用户缓存数据
        this.loadUserData();
    }

    private loadLocalRoleData():void {
        // 加载本地数据
        // const data = App.cookieManager.get<IRoleData>(StorageKeys.PLAYER_SAVE_DATA);
        // if (data == null) {
        //     return;
        // }
    }

    private saveLocalRoleData():void {
        
    }

    /** 存储用户缓存数据  类型1：number / string / boolean */
    private saveUserData(): void {
        App.cookieManager.set(StorageKeys.LAST_LOGIN_TIME, Date.now());
        App.cookieManager.set(StorageKeys.USER_NAME, "玩家001");
        App.cookieManager.set(StorageKeys.MUSIC_ENABLED, true);
    }

    /** 加载用户缓存数据 */
    private loadUserData(): void {
        const loginTime = App.cookieManager.getNumber(StorageKeys.LAST_LOGIN_TIME, 0);
        const userName = App.cookieManager.getString(StorageKeys.USER_NAME, "游客");
        const musicOn = App.cookieManager.getBoolean(StorageKeys.MUSIC_ENABLED, true);

        console.log(loginTime, userName, musicOn);
    }
}