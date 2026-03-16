import { App } from "../../../framework/managers/App";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { EnumEffect } from "./effects/EnumEffect";
import { DamageEffectManager } from "./effectTableManager/DamageEffectManager";

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
    
    public executeEffect( enumEffect:EnumEffect, data:any ):void {
        if (enumEffect === EnumEffect.Damage) {
            this.damageEffectManager.executeDamageEffect(data);
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