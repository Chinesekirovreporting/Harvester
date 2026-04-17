import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { SkillCFG } from "../../gameModel/table/tableClass/SkillCFG";
import { GameModules } from "../../gameModule/GameModules";
import { BaseActor } from "../core_actor/BaseActor";
import { BaseEffect } from "../core_effect/effects/BaseEffect";
import { EnumEffectType } from "../core_effect/effects/EnumEffectType";
import { EffectVo } from "../core_effect/EffectVo";
import { BuffVo } from "./BuffVo";
import { EnumBuffType } from "./EnumBuffType";

export class BaseBuff {
    public buffVo:BuffVo;                               // BUFF元数据
    public buffType:EnumBuffType;                       // BUFF类型
    public startEffectList:number[] = [];               // BUFF开始时触发的效果列表
    public cycleEffectList:number[] = [];               // BUFF每个回合结束后触发的效果列表
    public endEffectList:number[] = [];                 // BUFF移除时触发的效果列表
    public useActor:BaseActor;                          // 使用者
    public targetActor:BaseActor;                       // 目标角色
    public skillCFG:SkillCFG;                           // 技能配置
    public durationTimes:number = 0;                    // BUFF持续触发次数

    constructor(buffVo:BuffVo, targetActor:BaseActor, useActor:BaseActor, skillCFGId:number) { 
        this.buffVo = buffVo;
        this.buffType = buffVo.buffCFG.BuffType;
        this.targetActor = targetActor;
        this.useActor = useActor;
        this.skillCFG = App.tableManager.getTable($Tables.SkillCFG, skillCFGId) as SkillCFG;
        this.initEffectList();
    }

    private initEffectList():void {
        for (const effectId of this.buffVo.buffCFG.StartEffs) {
            this.startEffectList.push(effectId);
        }
        for (const effectId of this.buffVo.buffCFG.CycleEffs) {
            this.cycleEffectList.push(effectId);
        }
        for (const effectId of this.buffVo.buffCFG.EndEffs) {
            this.endEffectList.push(effectId);
        }
    }
    
    // 触发BUFF效果
    public applyBuff():void {
        this.onBuffCreated();
    }
    
    // 每回合触发
    public applyTick():void {
        this.onBuffTick();
    }

    // BUFF移除时触发
    public removeBuff():void {
        this.onBuffRemoved();
    }

    // BUFF创建时首次触发
    protected onBuffCreated():void {
        for (const effectId of this.startEffectList) {
            GameModules.effect.applyEffect(effectId, this.buffVo.buffID, this.targetActor, this.useActor );
        }
    }

    // 每个回合结束后触发一次BUFFTick
    protected onBuffTick():void {
        // 如果BUFF是顺发，不是DOT则直接移除
        if(this.buffVo.buffCFG.IsDot == 0) {
            return;
        }
        for (const effectId of this.cycleEffectList) {
            GameModules.effect.applyEffect(effectId, this.buffVo.buffID, this.targetActor, this.useActor );
        }
        this.durationTimes++;
        // 如果BUFF持续效果次数结束，则移除
        if (this.buffVo.buffCFG.Duration > 0 && this.durationTimes >= this.buffVo.buffCFG.Duration) {
            GameModules.buff.removeBuff(this);
        }
    }

    // BUFF移除时触发
    protected onBuffRemoved():void {
        for (const effectId of this.endEffectList) {
            GameModules.effect.applyEffect(effectId, this.buffVo.buffID, this.targetActor, this.useActor );
        }
    }
} 