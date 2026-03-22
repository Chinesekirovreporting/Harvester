import { GameModules } from "../../../gameModule/GameModules";
import { BaseActor } from "../../core_actor/BaseActor";
import { BaseSkill } from "../BaseSkill";
import { SkillVo } from "../SkillVo";

export class SkillFireBall extends BaseSkill {
    constructor(skillVo:SkillVo, useUnit:BaseActor) {
        super(skillVo, useUnit);
    }

    protected onSpellStart():void {
        console.log("SkillFireBall spell start");
        super.onSpellStart();
    }
}