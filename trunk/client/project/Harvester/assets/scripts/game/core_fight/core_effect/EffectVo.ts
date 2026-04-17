import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { EffectCFG } from "../../gameModel/table/tableClass/EffectCFG";

export class EffectVo {
    public effectID:number;        // 魔法效果唯一ID
    public buffID:number;          // 关联BUFFID 
    public effectCFG:EffectCFG;
    public bByBuffTick:boolean = false;   // 是否由BUFFTick触发
    constructor( effectID:number, buffID:number, bByBuffTick:boolean = false ) { 
        this.effectID = effectID;   
        this.buffID = buffID;
        this.effectCFG = App.tableManager.getTable($Tables.EffectCFG, this.effectID) as EffectCFG; 
    }
}