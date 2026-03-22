import { GameModules } from "../../../gameModule/GameModules";
import { BaseActor } from "../../core_actor/BaseActor";
import { EffectVo } from "../EffectVo";
import { BaseEffect } from "./BaseEffect";
import { EnumEffectType } from "./EnumEffectType";

export class EffectDamage extends BaseEffect {
    constructor(effectVo:EffectVo, targetActor:BaseActor, useActor:BaseActor) {
        super(effectVo, targetActor, useActor);
    }

    protected onEffectStart():void {
        this.applyDamage(this.effectVo);
    }

    private applyDamage(effectVo:EffectVo):void {
        // 伤害逻辑
        GameModules.effect.executeEffect( EnumEffectType.Damage, effectVo, this.targetActor, this.useActor );
    }
}