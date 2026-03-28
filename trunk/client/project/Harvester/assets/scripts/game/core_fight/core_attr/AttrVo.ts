import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { BaseActor } from "../core_actor/BaseActor";

// 属性结构体 
export class AttrVo {
    public owner:BaseActor;
    public HP:number;
    public MP:number;
    public ATTACK_POWER:number;
    public MAGIC_POWER:number;
    public ARMOR:number;
    public SHIELD:number;
    public MAGIC_RESIST:number;
    public CRIT_RATE:number;
    public CRIT_DMG:number;
    public DODGE_RATE:number;
    public HIT_RATE:number;
    public STR:number;
    public AGI:number;
    public INT:number;
    public SPI:number;
    public END:number;
    public WIS:number;

    constructor(owner:BaseActor) {
        this.owner = owner;
        var heroAttrCFG = App.tableManager.getTable($Tables.HeroAttrCFG, owner.heroID);
        this.HP = heroAttrCFG.HP;
        this.MP = heroAttrCFG.MP;
        this.ATTACK_POWER = heroAttrCFG.ATTACK_POWER;
        this.MAGIC_POWER = heroAttrCFG.MAGIC_POWER;
        this.ARMOR = heroAttrCFG.ARMOR;
        this.SHIELD = heroAttrCFG.SHIELD;
        this.MAGIC_RESIST = heroAttrCFG.MAGIC_RESIST;
        this.CRIT_RATE = heroAttrCFG.CRIT_RATE;
        this.CRIT_DMG = heroAttrCFG.CRIT_DMG;
        this.DODGE_RATE = heroAttrCFG.DODGE_RATE;
        this.HIT_RATE = heroAttrCFG.HIT_RATE;
        this.STR = heroAttrCFG.STR;
        this.AGI = heroAttrCFG.AGI;
        this.INT = heroAttrCFG.INT;
        this.SPI = heroAttrCFG.SPI;
        this.END = heroAttrCFG.END;
        this.WIS = heroAttrCFG.WIS;
    }
}