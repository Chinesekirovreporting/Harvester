import { App } from "../../framework/managers/App";
import { ObjectUtil } from "../../framework/utils/ObjectUtil";
import { AbstractModel } from "./AbstractModel";
import { AchieveCFG } from "./table/tableClass/AchieveCFG";

export class ModelAchieve extends AbstractModel {
    
    constructor() {
        super();
        this.init();
    }

    protected init() {

    }

    public getAchieveList():AchieveCFG[] {
        return ObjectUtil.objectToArray<AchieveCFG>(App.tableManager.getTables("AchieveCFG"));
    }
}