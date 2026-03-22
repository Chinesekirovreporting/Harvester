import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { BuffCFG } from "../../gameModel/table/tableClass/BuffCFG";
import { BaseEffect } from "../core_effect/effects/BaseEffect";

export class BuffVo {
    public buffID:number;
    public buffCFG:BuffCFG;

    constructor( buffId:number ) {
        this.buffID = buffId;
        this.buffCFG = App.tableManager.getTable($Tables.BuffCFG, this.buffID) as BuffCFG;
    }

}