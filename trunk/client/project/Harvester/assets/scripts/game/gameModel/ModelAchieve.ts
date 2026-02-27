import { AbstractModel } from "./AbstractModel";
import { AchieveCFG } from "./table/tableClass/AchieveCFG";

export class ModelAchieve extends AbstractModel {
    protected init() {

    }

    public getAchieveList():AchieveCFG[] {
        return [];
    }
}