import { GameModules } from "../../../gameModule/GameModules";
import { EffectVo } from "../EffectVo";
import { EnumEffectType } from "./EnumEffectType";

// 魔法效果类,用于处理单一效果
export class BaseEffect {
    public effectType:EnumEffectType;   // 魔法效果枚举
    public effectVo:EffectVo;           // 魔法效果数据

    constructor(effectVo:EffectVo) {
        this.effectVo = effectVo;
        this.effectType = effectVo.effectCFG.EffectType;
    }

    // 魔法效果触发执行
    public applyEffect():void {
        this.onEffectStart();
    }

    protected onEffectStart():void {

    }

    // protected update():void {
    //     // 更新效果状态，例如持续时间减少等
    // }
}