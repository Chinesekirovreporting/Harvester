import { BaseEffect } from "../core_effect/effects/BaseEffect";
import { BuffVo } from "./BuffVo";
import { EnumBuffType } from "./EnumBuffType";

export class BaseBuff {
    public name:string;                 // 技能名称
    public icon:string;                     // 图标
    public buffID:number;                   // 技能ID
    public duration:number;                 // 持续时间
    public isDebuff:boolean;                // 是否是减益效果
    public effectList:BaseEffect[] = [];    // 效果列表
    public buffVo:BuffVo;                   // 技能元数据
    public buffType:EnumBuffType;            // BUFF类型
    constructor(buffVo:BuffVo) { 
        this.buffVo = buffVo;
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