import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { SkillCFG } from "../../gameModel/table/tableClass/SkillCFG";
import { BaseActor } from "../core_actor/BaseActor";
import { BaseBuff } from "./BaseBuff";
import { BuffManager } from "./BuffManager";
import { BuffVo } from "./BuffVo";

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
    }

    public removeBuff(buff:BaseBuff):void {
        this.buffMgr.removeBuff(buff);
    }

    public applyBuffTick():void {
        this.buffMgr.onBuffTick();
    }
}