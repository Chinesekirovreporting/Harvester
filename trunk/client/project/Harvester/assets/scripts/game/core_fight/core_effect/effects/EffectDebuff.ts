import { GameModules } from "../../../gameModule/GameModules";
import { EffectVo } from "../EffectVo";
import { BaseEffect } from "./BaseEffect";
import { EnumEffectType } from "./EnumEffectType";

export class EffectDebuff extends BaseEffect{
    constructor(effectVo:EffectVo) {
        super(effectVo);
    }

    protected onEffectStart():void {
        this.applyDebuff(this.effectVo);
    }

    private applyDebuff(effectVo:EffectVo):void {
        // 减益逻辑
        GameModules.effect.executeEffect( EnumEffectType.Debuff, effectVo );
    }
}