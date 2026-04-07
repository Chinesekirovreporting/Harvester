import { BaseActor } from "../../core_actor/BaseActor";
import { BaseSkill } from "../BaseSkill";
import { SkillVo } from "../SkillVo";

export class SkillBerserk extends BaseSkill {
    constructor(skillVo:SkillVo, useUnit:BaseActor) {
        super(skillVo, useUnit);
    }

    protected onSpellStart():void {
        console.log("SkillBerserk spell start");
        super.onSpellStart();
    }
}
