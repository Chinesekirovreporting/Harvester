import { App } from "../../../framework/managers/App";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { $Tables } from "../../gameModel/table/$Tables";
import { SkillCFG } from "../../gameModel/table/tableClass/SkillCFG";
import { GameModules } from "../../gameModule/GameModules";
import { BaseActor } from "../core_actor/BaseActor";
import { ModuleRoundEvent } from "../core_round/ModuleRoundEvent";
import { BaseSkill } from "./BaseSkill";
import { ModuleSkillEvent } from "./ModuleSkillEvent";
import { EnumSkill } from "./skills/EnumSkill";
import { SkillFireBall } from "./skills/SkillFireBall";
import { SkillVo } from "./SkillVo";

export class ModuleSkill extends AbstractModule{

    public static readonly ON_SKILL_CAST:string = "ON_SKILL_CAST";
    // public static readonly ON_SKILL_END:string = "ON_SKILL_END";

    protected init():void {
        console.log("初始化ModuleSkill")
    } 
    
    // public addSkill(player:Player, skillId:number):void{

    // }

    public getSkillListByHero(heroId:number):BaseSkill[] {
        return [];//App.tableManager.getTables($Tables.SkillCFG, heroId);
    }

    // 使用技能
    public useSkill(skillId:EnumSkill, useUnit:BaseActor):void {
        GameModules.round.curRound.energy -= App.tableManager.getTable($Tables.SkillCFG, skillId).Cost;
        if (GameModules.round.curRound.energy < 0) {
            return;
        }
        if (skillId == EnumSkill.SKILL_FIRE_BALL ) {
            let skillVo:SkillVo = new SkillVo(App.tableManager.getTable($Tables.SkillCFG, skillId) as SkillCFG);
            let baseSkill:SkillFireBall = new SkillFireBall(skillVo, useUnit);
            baseSkill.spellSkill();
            GameModules.skill.dispatchEventWithData(ModuleSkillEvent.ON_SKILL_CAST, baseSkill);
        }
    }

    // 敌方使用技能
    public enemyUseSkill(skillId:EnumSkill, enemyActor:BaseActor):void {
        // 敌方使用技能时，暂不设置能量消耗
        // GameModules.round.curRound.energy -= App.tableManager.getTable($Tables.SkillCFG, skillId).Cost;
        // if (GameModules.round.curRound.energy < 0) {
        //     return;
        // }
        // 敌方使用技能时，释放技能
        if (skillId == EnumSkill.SKILL_FIRE_BALL ) {
            let skillVo:SkillVo = new SkillVo(App.tableManager.getTable($Tables.SkillCFG, skillId) as SkillCFG);
            let baseSkill:SkillFireBall = new SkillFireBall(skillVo, enemyActor);
            baseSkill.spellSkill();
            GameModules.skill.dispatchEventWithData(ModuleSkillEvent.ON_ENEMY_SKILL_CAST, baseSkill);
        }
    }
}