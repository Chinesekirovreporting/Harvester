import { GameModules } from "../../gameModule/GameModules";
import { BaseActor } from "../core_actor/BaseActor";
import { BaseBuff } from "../core_buff/BaseBuff";
import { EnumSkillCastType } from "./EnumSkillCastType";
import { EnumTargetType } from "./EnumTargetType";
import { SkillVo } from "./SkillVo";

export class BaseSkill {
    public skillCastType:EnumSkillCastType;          // 技能施法类型
    public targetType:EnumTargetType;                // 施法目标类型
    public skillVo:SkillVo;
    public useUnit:BaseActor;                        // 使用者
    public targetActor:BaseActor;                    // 目标
    constructor(skillVo:SkillVo, useUnit:BaseActor) {
        this.skillVo = skillVo;
        this.useUnit = useUnit;
    }
    
    public spellSkill():void {
        this.onSpellStart();
    }

    //////////// 技能事件 //////////////////////
    protected onSpellStart():void {
        // TODO 技能效果，每一个技能有独立的技能效果，也可以进行汇总，一般来说，如果是点目标就给点目标释放BUFF，AOE就给区域目标释放BUFF
        // GameModules.moduleBuff.addBuff(this.useUnit.id,this.targetUnit.id,this.buffList[0].buffVo.buffID);
        // GammModuels.mo
        if(this.skillVo.skillCFG.TargetType == EnumTargetType.SELF){
            this.targetActor = this.useUnit;
            // 为友军添加BUFF
            for (let buffId of this.skillVo.skillCFG.BuffIds) {
                GameModules.buff.addBuff(buffId, this.targetActor, this.useUnit, this.skillVo.skillCFG.ID);
            }
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.ENEMY){
            this.targetActor = GameModules.actor.getActorEnemy(this.useUnit);  // 敌对目标
            // 为敌方添加BUFF
            for (let buffId of this.skillVo.skillCFG.BuffIds) {
                GameModules.buff.addBuff(buffId, this.targetActor, this.useUnit, this.skillVo.skillCFG.ID);
            }
            // GameModules.buff.addBuff(this.skillVo.skillCFG.BuffIds[0], this.targetActor, this.useUnit, this.skillVo.skillCFG.ID);
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.ALLY){
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.ALL){
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.RANDOM){
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.NEAREST){
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.FARTHEST){
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.LOWEST_HP){
        }else if(this.skillVo.skillCFG.TargetType == EnumTargetType.HIGHEST_HP){

        }
    }

    // protected onSpellUpdate():void {
        
    // }

    // protected onSpellEnd():void {

    // }
}