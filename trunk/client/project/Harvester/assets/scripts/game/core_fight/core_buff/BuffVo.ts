import { BaseEffect } from "../core_effect/BaseEffect";

export class BuffVo {
    public buffID:number;
    public name:string
    public icon:string;
    public duration:number;
    public isDebuff:boolean;
    public effectList:BaseEffect[];

    constructor(buffID:number, name:string, icon:string, duration:number, isDebuff:boolean, effectList:BaseEffect[]) {
        this.buffID = buffID;
        this.name = name;
        this.icon = icon;
        this.duration = duration;
        this.isDebuff = isDebuff;
        this.effectList = effectList;
    }

    public getEffectList():BaseEffect[] {
        return [];
    }
}