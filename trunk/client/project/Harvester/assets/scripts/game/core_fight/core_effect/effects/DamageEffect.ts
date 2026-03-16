import { BaseEffect } from "./BaseEffect";
import { EnumEffect } from "./EnumEffect";

export class DamageEffect extends BaseEffect {
    public type:EnumEffect;
    constructor() {
        super(EnumEffect.Damage);
    }
}