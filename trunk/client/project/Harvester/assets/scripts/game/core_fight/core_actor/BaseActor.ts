import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { AttrVo } from "../core_attr/AttrVo";
import { EnumAttr } from "../core_attr/EnumAttr";
import { BaseSkill } from "../core_skill/BaseSkill";
import { EnumFaction } from "./EnumFaction";
// 战斗单位基类。属性构成：配置基础属性+装备属性。
export class BaseActor {
    public name:string;                 // 名称
    public faction:EnumFaction;         // 阵营
    public heroID:number;               // 英雄ID
    public skillList:BaseSkill[]        // 技能列表
    public attrVo:AttrVo;               // 属性结构体
    public hp:number;                   // 当前血量
    public shield:number;               // 当前护盾
    public mp:number;                   // 当前法力

    constructor(heroID:number, faction:EnumFaction) {
        this.heroID = heroID;
        this.faction = faction;
        this.name = App.tableManager.getTable($Tables.HeroBookCFG, heroID).Name;
        this.initAttrVo();
        this.hp = this.attrVo.HP;
        this.shield = this.attrVo.SHIELD;
        this.mp = this.attrVo.MP;
    }

    // 初始化属性结构体
    private initAttrVo():void {
        this.attrVo = new AttrVo(this);
    }

    public getAttr(attrType:EnumAttr):number {
        return this.attrVo.getAttr(attrType);
    }

    public setAttr(attrType:EnumAttr, value:number):void {
        this.attrVo.setAttr(attrType, value);
    }

    // 添加装备属性
    private addEquipAttr():void {
        // 添加装备属性 
    }

    // 添加特殊属性 
    private addSpecialAttr():void {
        // 添加特殊属性 
    }
}