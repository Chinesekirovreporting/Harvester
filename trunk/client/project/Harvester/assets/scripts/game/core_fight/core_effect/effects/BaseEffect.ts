import { GameModules } from "../../../gameModule/GameModules";
import { BaseActor } from "../../core_actor/BaseActor";
import { EffectVo } from "../EffectVo";
import { EnumEffectType } from "./EnumEffectType";

// 魔法效果类,用于处理单一效果
export class BaseEffect {
    public effectType:EnumEffectType;       // 魔法效果枚举
    public effectVo:EffectVo;               // 魔法效果数据
    public targetActor:BaseActor;           // 目标角色
    public useActor:BaseActor;              // 使用者
    constructor(effectVo:EffectVo, targetActor:BaseActor, useActor:BaseActor) {
        this.effectVo = effectVo;
        this.effectType = effectVo.effectCFG.EffectType;
        this.targetActor = targetActor;
        this.useActor = useActor;
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