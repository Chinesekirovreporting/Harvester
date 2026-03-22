import { GameModules } from "../../../gameModule/GameModules";
import { BaseActor } from "../../core_actor/BaseActor";
import { EffectVo } from "../EffectVo";
import { BaseEffect } from "./BaseEffect";
import { EnumEffectType } from "./EnumEffectType";

export class EffectBuff extends BaseEffect {
    constructor(effectVo:EffectVo, targetActor:BaseActor, useActor:BaseActor) {
        super(effectVo, targetActor, useActor);
    }

    protected onEffectStart():void {
        this.applyBuff(this.effectVo);
    }

    private applyBuff(effectVo:EffectVo):void {
        // 增益逻辑
        GameModules.effect.executeEffect( EnumEffectType.Buff, this.effectVo, this.targetActor, this.useActor );
    }
}