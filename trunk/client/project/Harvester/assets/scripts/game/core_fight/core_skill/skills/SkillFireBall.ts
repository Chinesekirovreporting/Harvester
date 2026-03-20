import { GameModules } from "../../../gameModule/GameModules";
import { BaseSkill } from "../BaseSkill";
import { SkillVo } from "../SkillVo";

export class SkillFireBall extends BaseSkill {
    constructor(skillVo:SkillVo) {
        super(skillVo);
    }

    protected onSpellStart():void {
        console.log("SkillFireBall spell start");
        // GameModules.buff.addBuff(this.useUnit.id,this.targetUnit.id,this.buffList[0].buffVo.buffID);
        for (const buff of this.buffList) {
            // GameModules.buff.addBuff(this.useUnit.id,this.targetUnit.id,buff.buffVo.buffID);
            // GameModules.buff.addBuff(buff.buffVo);
        }
    }
}