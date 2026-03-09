import { App } from "../../framework/managers/App";
import { TableManager } from "../../framework/managers/table/TableManager";
import { ObjectUtil } from "../../framework/utils/ObjectUtil";
import { AbstractModel } from "./AbstractModel";
import { StorageKeys } from "./storage/StorageKeys";
import { $Tables } from "./table/$Tables";
import { HeroBookCFG } from "./table/tableClass/HeroBookCFG";

export class ModelHeroBook extends AbstractModel {

    constructor() {
        super();
        this.init();
    }
    
    protected init() {
        this.loadUnlockedHeroIds();
    }

    public getHeroBookById(id:number):HeroBookCFG {
        return App.tableManager.getTable($Tables.HeroBookCFG, id) as HeroBookCFG;
    }

    public getHeroBookList():HeroBookCFG[] {
        return ObjectUtil.objectToArray<HeroBookCFG>(App.tableManager.getTables($Tables.HeroBookCFG));
    }

    /** 保存已解锁英雄 3. 数组结构 */
    private saveUnlockedHeroIds(): void {
        const heroIds = [1001, 1002, 1003, 1005];
        App.cookieManager.set(StorageKeys.UNLOCKED_HERO_IDS, heroIds);
    }

    public loadUnlockedHeroIds(): number[] {
        const ids = App.cookieManager.get<number[]>(StorageKeys.UNLOCKED_HERO_IDS);
        return ids == null ? [] : ids;
    }
}