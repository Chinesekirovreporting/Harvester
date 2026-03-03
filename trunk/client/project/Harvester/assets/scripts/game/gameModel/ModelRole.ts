import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { StorageKeys } from "./data/StorageKeys";

export class ModelRole extends AbstractModel{
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