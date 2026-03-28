import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { AttrVo } from "../core_attr/AttrVo";
import { BaseSkill } from "../core_skill/BaseSkill";

export class BaseActor {
    public name:string;                 // 名称
    public heroID:number;               // 英雄ID
    public skillList:BaseSkill[]        // 技能列表
    public attrVo:AttrVo;              // 属性结构体

    constructor(heroID:number) {
        this.heroID = heroID;
        this.name = App.tableManager.getTable($Tables.HeroBookCFG, heroID).Name;
        this.initAttrVo();
    }

    private initAttrVo():void {
        this.attrVo = new AttrVo(this);
    }
}