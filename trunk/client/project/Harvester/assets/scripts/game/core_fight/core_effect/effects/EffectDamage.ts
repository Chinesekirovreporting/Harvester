import { GameModules } from "../../../gameModule/GameModules";
import { EffectVo } from "../EffectVo";
import { BaseEffect } from "./BaseEffect";
import { EnumEffectType } from "./EnumEffectType";

export class EffectDamage extends BaseEffect {
    constructor(effectVo:EffectVo) {
        super(effectVo);
    }

    protected onEffectStart():void {
        this.applyDamage(this.effectVo);
    }

    private applyDamage(effectVo:EffectVo):void {
        // 伤害逻辑
        GameModules.effect.executeEffect( EnumEffectType.Damage, this.effectVo );
    }
}