import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { EnumAttr } from "../core_attr/EnumAttr";
import { FightCoreLogDamageLineVo } from "../../gameModel/data/FightCoreLog/FightCoreLogDamageLineVo";
import { EnumFightCoreLogType } from "../../gameModel/enum/EnumFightCoreLogType";
import { GameModels } from "../../gameModel/GameModels";
import { SkillCFG } from "../../gameModel/table/tableClass/SkillCFG";
import { BaseActor } from "../core_actor/BaseActor";
import { BaseBuff } from "./BaseBuff";
import { BuffManager } from "./BuffManager";
import { BuffVo } from "./BuffVo";
import { FightCoreLogStatusDebuffVo } from "../../gameModel/data/FightCoreLog/FightCoreLogStatusDebuffVo";

export class ModuleBuff extends AbstractModule{
    public buffMgr:BuffManager;

    protected init():void {
        console.log("初始化ModuleBuff")
        this.buffMgr = new BuffManager();
    }

    /**
     * 添加BUFF 参数应包含施加BuffID，BUFF的单位，目标单位，源技能
     * @param skillVo 技能VO
     * @param targetActor 目标角色
     */
    public addBuff(buffId:number, targetActor:BaseActor, useUnit:BaseActor, skillCFGId:number):void {
        let buffVo:BuffVo = new BuffVo(buffId);
        let baseBuff:BaseBuff = new BaseBuff(buffVo, targetActor, useUnit, skillCFGId);
        this.buffMgr.addBuff(baseBuff);
        // 记录日志
        if (buffVo.buffCFG.IsDot == 1) {
            GameModels.fightLog.showLogByType(EnumFightCoreLogType.STATUS_DEBUFF_APPLY, new FightCoreLogStatusDebuffVo(targetActor.name, buffVo.buffCFG.Name));
        }
    }

    public removeBuff(buff:BaseBuff):void {
        this.buffMgr.removeBuff(buff);
    }

    public applyBuffTick():void {
        this.buffMgr.onBuffTick();
    }
    
    // 注释
    // 状态分类
    // 属性修改型：如“+20%攻击力”、“-30%移动速度”
    // 行为限制型：如“眩晕”（禁用行动）、“沉默”（禁用技能）
    // 持续效果型：如“每秒掉血”、“每回合回蓝”
    // 触发器型：如“受到攻击时反击”、“生命低于30%时释放护盾”
    // 形态转换型：如“变身巨兽”、“进入隐身”
}