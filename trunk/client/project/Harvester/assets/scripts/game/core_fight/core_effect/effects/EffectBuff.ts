import { GameModules } from "../../../gameModule/GameModules";
import { EffectVo } from "../EffectVo";
import { BaseEffect } from "./BaseEffect";
import { EnumEffectType } from "./EnumEffectType";

export class EffectBuff extends BaseEffect {
    constructor(effectVo:EffectVo) {
        super(effectVo);
    }

    protected onEffectStart():void {
        this.applyBuff(this.effectVo);
    }

    private applyBuff(effectVo:EffectVo):void {
        // 增益逻辑
        GameModules.effect.executeEffect( EnumEffectType.Buff, effectVo );
    }
}