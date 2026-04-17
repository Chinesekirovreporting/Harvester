import { App } from "../../../framework/managers/App";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { $Tables } from "../../gameModel/table/$Tables";
import { EffectCFG } from "../../gameModel/table/tableClass/EffectCFG";
import { BaseActor } from "../core_actor/BaseActor";
import { BaseEffect } from "./effects/BaseEffect";
import { EffectAttrModify } from "./effects/EffectAttrModify";
import { EffectDamage } from "./effects/EffectDamage";
import { EffectHeal } from "./effects/EffectHeal";
import { EnumEffectType } from "./effects/EnumEffectType";
import { AttrModifyEffectManager } from "./effectTableManager/AttrModifyEffectManager";
import { DamageEffectManager } from "./effectTableManager/DamageEffectManager";
import { HealEffectManager } from "./effectTableManager/HealEffectManager";
import { EffectVo } from "./EffectVo";

export class ModuleEffect extends AbstractModule {
    // 魔法效果根据大类区分管理器
    public damageEffectManager:DamageEffectManager;
    public healEffectManager:HealEffectManager;
    public attrModifyEffectManager:AttrModifyEffectManager;
    // public buffTableManager:BuffTableManager;   // 增益效果管理器
    // public debuffTableManager:DebuffTableManager;   // 减益效果管理器

    protected init():void {
        console.log("初始化ModuleEffect")
        this.damageEffectManager = new DamageEffectManager();
        this.healEffectManager = new HealEffectManager();
        this.attrModifyEffectManager = new AttrModifyEffectManager();
        // this.buffTableManager = new BuffTableManager();
        // this.debuffTableManager = new DebuffTableManager();
    }

    public onEffectStart():void {
        this.damageEffectManager.onEffectStart();
        this.healEffectManager.onEffectStart();
        this.attrModifyEffectManager.onEffectStart();
    }

    public onEffectTick():void {
        this.damageEffectManager.onEffectTick();
        this.healEffectManager.onEffectTick();
        this.attrModifyEffectManager.onEffectTick();
    }

    public onEffectStop():void {
        this.damageEffectManager.onEffectStop();
        this.healEffectManager.onEffectStop();
        this.attrModifyEffectManager.onEffectStop();
    }

    public applyEffect( effectId:number, buffId:number, targetActor:BaseActor, useActor:BaseActor, bByBuffTick:boolean = false ):void {
        var effectCFG:EffectCFG = App.tableManager.getTable($Tables.EffectCFG, effectId) as EffectCFG;
        var effectVo:EffectVo = new EffectVo(effectId, buffId, bByBuffTick);
        this.executeEffect(effectCFG.EffectType, effectVo, targetActor, useActor);
    }
    
    public executeEffect( enumEffect:EnumEffectType, effectVo:EffectVo, targetActor:BaseActor, useActor:BaseActor ):void {
        if (enumEffect == EnumEffectType.Damage) {
            var damgeEffect:EffectDamage = new EffectDamage(effectVo, targetActor, useActor);
            this.damageEffectManager.executeDamageEffect(damgeEffect);
        } else if (enumEffect == EnumEffectType.Heal) {
            var healEffect:EffectHeal = new EffectHeal(effectVo, targetActor, useActor);
            this.healEffectManager.executeHealEffect(healEffect);
        } else if (enumEffect == EnumEffectType.AttrModify) {
            var attrModifyEffect:EffectAttrModify = new EffectAttrModify(effectVo, targetActor, useActor);
            this.attrModifyEffectManager.executeAttrModifyEffect(attrModifyEffect);
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