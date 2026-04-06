import { BaseActor } from "../../core_actor/BaseActor";
import { BaseSkill } from "../BaseSkill";
import { SkillVo } from "../SkillVo";

export class SkillHeal extends BaseSkill {
    constructor(skillVo:SkillVo, useUnit:BaseActor) {
        super(skillVo, useUnit);
    }

    protected onSpellStart():void {
        console.log("SkillHeal spell start");
        super.onSpellStart();
    }
}
