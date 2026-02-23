import { EnumEffect } from "./EnumEffect";

// 魔法效果类,用于处理单一效果
export class BaseEffect {
    public effectType:EnumEffect;   // 魔法效果枚举
    
    constructor(effectType:EnumEffect) {
        this.effectType = effectType;
    }

    public applyEffect(target:any):void {
        if (this.effectType === EnumEffect.Damage) {
            this.applyDamage(target);
        } else if (this.effectType === EnumEffect.Heal) {
            this.applyHeal(target);
        } else if (this.effectType === EnumEffect.Buff) {
            this.applyBuff(target);
        } else if (this.effectType === EnumEffect.Debuff) {
            this.applyDebuff(target);
        }
    }

    public update():void {
        // 更新效果状态，例如持续时间减少等
    }

    private applyDamage(target:any):void {
        // 伤害逻辑
    } 
    
    private applyHeal(target:any):void {
        // 治疗逻辑
    }

    private applyBuff(target:any):void {
        // 增益逻辑
    }

    private applyDebuff(target:any):void {
        // 减益逻辑
    }
}