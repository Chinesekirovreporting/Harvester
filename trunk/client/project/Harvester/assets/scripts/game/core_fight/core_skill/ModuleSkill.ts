import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { GameModules } from "../../gameModule/GameModules";
import { ModuleRoundEvent } from "../core_round/ModuleRoundEvent";
import { BaseSkill } from "./BaseSkill";
import { ModuleSkillEvent } from "./ModuleSkillEvent";
import { SkillFireBall } from "./skills/SkillFireBall";
import { SkillVo } from "./SkillVo";

export class ModuleSkill extends AbstractModule{

    public static readonly ON_SKILL_CAST:string = "ON_SKILL_CAST";
    public static readonly ON_SKILL_END:string = "ON_SKILL_END";

    protected init():void {
        console.log("初始化ModuleSkill")
    } 
    
    // public addSkill(player:Player, skillId:number):void{

    // }

    public useSkill(index:number, skillId:number):void {
        let baseSkill:BaseSkill = new SkillFireBall(new SkillVo());
        baseSkill.spellSkill();
        GameModules.skill.dispatchEventWithData(ModuleSkillEvent.ON_SKILL_CAST, baseSkill);
    }
}