import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";

export class ModuleEffect extends AbstractModule {
    
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