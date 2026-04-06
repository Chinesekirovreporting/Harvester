import { GameModules } from "../../../gameModule/GameModules";
import { BaseActor } from "../../core_actor/BaseActor";
import { EffectVo } from "../EffectVo";
import { BaseEffect } from "./BaseEffect";
import { EnumEffectType } from "./EnumEffectType";

export class EffectHeal extends BaseEffect {
    constructor(effectVo:EffectVo, targetActor:BaseActor, useActor:BaseActor) {
        super(effectVo, targetActor, useActor);
    }

    protected onEffectStart():void {
        this.applyHeal(this.effectVo);
    }

    private applyHeal(effectVo:EffectVo):void {
        GameModules.effect.executeEffect(EnumEffectType.Heal, effectVo, this.targetActor, this.useActor);
    }
}