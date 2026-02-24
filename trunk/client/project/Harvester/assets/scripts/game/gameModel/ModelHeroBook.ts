import { App } from "../../framework/managers/App";
import { TableManager } from "../../framework/managers/table/TableManager";
import { ObjectUtil } from "../../framework/utils/ObjectUtil";
import { AbstractModel } from "./AbstractModel";
import { $Tables } from "./table/$Tables";
import { HeroBookCFG } from "./table/tableClass/HeroBookCFG";

export class ModelHeroBook extends AbstractModel {
    protected init() {

    }

    public getHeroBookById(id:number):HeroBookCFG {
        return App.tableManager.getTable($Tables.HeroBookCFG, id) as HeroBookCFG;
    }

    public getHeroBookList():HeroBookCFG[] {
        return ObjectUtil.objectToArray<HeroBookCFG>(App.tableManager.getTables($Tables.HeroBookCFG));
    }
}