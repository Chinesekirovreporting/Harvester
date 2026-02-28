import { App } from "../../framework/managers/App";
import { ObjectUtil } from "../../framework/utils/ObjectUtil";
import { AbstractModel } from "./AbstractModel";
import { $Tables } from "./table/$Tables";
import { SkillCFG } from "./table/tableClass/SkillCFG";

export class ModelSkill extends AbstractModel {
    protected init() {

    }

    public getSkillList(): SkillCFG[] {
        return ObjectUtil.objectToArray<SkillCFG>(App.tableManager.getTables($Tables.SkillCFG));
    }
}
