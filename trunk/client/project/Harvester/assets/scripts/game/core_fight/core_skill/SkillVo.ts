import { SkillCFG } from "../../gameModel/table/tableClass/SkillCFG";
import { BaseBuff } from "../core_buff/BaseBuff";
import { ISkillVo } from "./ISkillVo";

export class SkillVo implements ISkillVo {  
    public skillCFG:SkillCFG;
    constructor(skillCFG:SkillCFG) {
        this.skillCFG = skillCFG;

    }

    public getBuffIdList():number[] {
        return this.skillCFG.BuffIds;
    }
}