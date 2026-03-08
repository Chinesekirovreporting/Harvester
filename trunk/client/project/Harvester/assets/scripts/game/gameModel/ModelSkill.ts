import { App } from "../../framework/managers/App";
import { ObjectUtil } from "../../framework/utils/ObjectUtil";
import { AbstractModel } from "./AbstractModel";
import { StorageKeys } from "./storage/StorageKeys";
import { SkillLevelDict } from "./storage/StorageTypes";
import { $Tables } from "./table/$Tables";
import { SkillCFG } from "./table/tableClass/SkillCFG";

export class ModelSkill extends AbstractModel {
    protected init() {

    }

    public getSkillList(): SkillCFG[] {
        return ObjectUtil.objectToArray<SkillCFG>(App.tableManager.getTables($Tables.SkillCFG));
    }

    /** 5. 字典/映射结构 Record<K, V> */
    public saveSkillLevelDict(): void {
        const dict: SkillLevelDict = {
            2001: 5,   // skillId -> level
            2002: 3,
            2003: 1,
        };
        App.cookieManager.set(StorageKeys.SKILL_LEVEL_DICT, dict);
    }

    public loadSkillLevelDict(): SkillLevelDict {
        return App.cookieManager.get<SkillLevelDict>(StorageKeys.SKILL_LEVEL_DICT) == null ? {} : App.cookieManager.get<SkillLevelDict>(StorageKeys.SKILL_LEVEL_DICT);
    }
}
