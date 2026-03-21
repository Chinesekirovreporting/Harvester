import { GameModules } from "../../../gameModule/GameModules";
import { EffectVo } from "../EffectVo";
import { BaseEffect } from "./BaseEffect";
import { EnumEffectType } from "./EnumEffectType";

export class EffectHeal extends BaseEffect {
    constructor(effectVo:EffectVo) {
        super(effectVo);
    }

    protected onEffectStart():void {
        this.applyHeal(this.effectVo);
    }

    private applyHeal(effectVo:EffectVo):void {
        // 治疗逻辑
        GameModules.effect.executeEffect( EnumEffectType.Heal, effectVo );
    }
}