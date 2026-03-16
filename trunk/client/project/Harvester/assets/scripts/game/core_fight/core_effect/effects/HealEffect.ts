import { BaseEffect } from "./BaseEffect";
import { EnumEffect } from "./EnumEffect";

export class HealEffect extends BaseEffect {
    
    public type:EnumEffect;
    constructor() {
        super(EnumEffect.Heal);
    }
}