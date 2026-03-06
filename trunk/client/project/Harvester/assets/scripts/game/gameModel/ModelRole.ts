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
}