import { BaseBuff } from "../core_buff/BaseBuff";
import { ISkillVo } from "./ISkillVo";

export class SkillVo implements ISkillVo {
    public distance: number;
    constructor() {

    }

    public getBuffList():BaseBuff[] {
        return [];
    }
}