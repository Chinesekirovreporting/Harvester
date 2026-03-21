import { EffectCFG } from "../../gameModel/table/tableClass/EffectCFG";

export class EffectVo {
    public effectID:number;        // 魔法效果唯一ID
    public buffID:number;          // 关联BUFFID 
    public effectCFG:EffectCFG;
    constructor( effectID:number, effectCFG:EffectCFG ) { 
        this.effectID = effectID;   
        this.effectCFG = effectCFG; 
    }
}