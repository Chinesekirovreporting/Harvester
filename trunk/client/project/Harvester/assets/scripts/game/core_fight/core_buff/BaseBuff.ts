import { BaseEffect } from "../core_effect/effects/BaseEffect";
import { BuffVo } from "./BuffVo";
import { EnumBuffType } from "./EnumBuffType";

export class BaseBuff {
    public buffVo:BuffVo;                       // BUFF元数据
    public buffType:EnumBuffType;               // BUFF类型
    public effectList:BaseEffect[] = [];        // 效果列表
    public targetId:number;                     // 目标ID
    constructor(buffVo:BuffVo) { 
        this.buffVo = buffVo;
        this.buffType = buffVo.buffCFG.BuffType;
    }
    
    // 触发BUFF效果
    public applyBuff():void {
        for (const effect of this.effectList) {
            effect.applyEffect();
        }
    }
    
    // BUFF创建时首次触发
    protected onBuffCreated():void {
        this.applyBuff();
    }

    protected onBuffTick():void {
        // for (const effect of this.effectList) {
        //     effect.update();
        // }
    }

    protected onBuffRemoved():void {
        // for (const effect of this.effectList) {
        //     effect.removeEffect();
        // }
    }
} 