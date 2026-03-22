import { App } from "../../../framework/managers/App";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { $Tables } from "../../gameModel/table/$Tables";
import { EffectCFG } from "../../gameModel/table/tableClass/EffectCFG";
import { BaseActor } from "../core_actor/BaseActor";
import { BaseEffect } from "./effects/BaseEffect";
import { EffectDamage } from "./effects/EffectDamage";
import { EnumEffectType } from "./effects/EnumEffectType";
import { DamageEffectManager } from "./effectTableManager/DamageEffectManager";
import { EffectVo } from "./EffectVo";

export class ModuleEffect extends AbstractModule {
    // 魔法效果根据大类区分管理器
    public damageEffectManager:DamageEffectManager;   // 伤害效果管理器
    // public healTableManager:HealTableManager;   // 治疗效果管理器
    // public buffTableManager:BuffTableManager;   // 增益效果管理器
    // public debuffTableManager:DebuffTableManager;   // 减益效果管理器

    protected init():void {
        console.log("初始化ModuleEffect")
        this.damageEffectManager = new DamageEffectManager();
        // this.healTableManager = new HealTableManager();
        // this.buffTableManager = new BuffTableManager();
        // this.debuffTableManager = new DebuffTableManager();
    }


    public onEffectStart():void {
        this.damageEffectManager.onEffectStart();
    }

    public onEffectTick():void {
        this.damageEffectManager.onEffectTick();
    }

    public onEffectStop():void {
        this.damageEffectManager.onEffectStop();
    }

    public applyEffect( effectId:number, buffId:number, targetActor:BaseActor, useActor:BaseActor ):void {
        var effectCFG:EffectCFG = App.tableManager.getTable($Tables.EffectCFG, effectId) as EffectCFG;
        var effectVo:EffectVo = new EffectVo(effectId, buffId);
        this.executeEffect(effectCFG.EffectType, effectVo, targetActor, useActor);
        // if (effectCFG.EffectType == EnumEffectType.Damage) {
        //     this.damageEffectManager.applyDamageEffect(targetActor, useActor);
        // } else {
        //     console.error("不支持的效果类型：", effectCFG.EffectType);
        // }
    }
    
    public executeEffect( enumEffect:EnumEffectType, effectVo:EffectVo, targetActor:BaseActor, useActor:BaseActor ):void {
        if (enumEffect == EnumEffectType.Damage) {
            var damgeEffect:EffectDamage = new EffectDamage(effectVo, targetActor, useActor);
            this.damageEffectManager.executeDamageEffect(damgeEffect);
        // } else if (enumEffect === EnumEffect.Heal) {
        //     this.healEffectManager.executeHealEffect();
        // } else if (enumEffect === EnumEffect.Shield) {
        //     this.shieldEffectManager.executeShieldEffect();
        // } else if (enumEffect === EnumEffect.Buff) {
        //     this.buffEffectManager.executeBuffEffect();
        } else {
            console.error("不支持的效果类型：", enumEffect);
        }
    }

    protected show():void {
        console.log("moduleeffect SHOW")
        this.onEffectStart();
        // 启动effect逻辑循环
        App.timerManager.registerLoop(1000, this.onEffectTick, this);
    }

    protected remove():void {
        console.log("moduleeffect REMOVE")
        this.onEffectStop();
    }

    public reset():void {
        console.log("moduleeffect RESET")
    }
}