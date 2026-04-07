import { App } from "../../../framework/managers/App";
import { $Tables } from "../../gameModel/table/$Tables";
import { HeroAttrCFG } from "../../gameModel/table/tableClass/HeroAttrCFG";
import { BaseActor } from "../core_actor/BaseActor";
import { EnumAttr } from "./EnumAttr";

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
        var heroAttrCFG:HeroAttrCFG = App.tableManager.getTable($Tables.HeroAttrCFG, owner.heroID);
        this.HP = heroAttrCFG.HP;
        this.MP = heroAttrCFG.MP;
        this.ATTACK_POWER = heroAttrCFG.AttackPower;
        this.MAGIC_POWER = heroAttrCFG.MagicPower;
        this.ARMOR = heroAttrCFG.Armor;
        this.SHIELD = heroAttrCFG.Shield;
        this.MAGIC_RESIST = heroAttrCFG.MagicResist;
        this.CRIT_RATE = heroAttrCFG.CritRate;
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

    public getAttr(attrType:EnumAttr):number {
        switch (attrType) {
            case EnumAttr.HP:
                return this.HP;
            case EnumAttr.MP:
                return this.MP;
            case EnumAttr.ATTACK_POWER:
                return this.ATTACK_POWER;
            case EnumAttr.MAGIC_POWER:
                return this.MAGIC_POWER;
            case EnumAttr.ARMOR:
                return this.ARMOR;
            case EnumAttr.SHIELD:
                return this.SHIELD;
            case EnumAttr.MAGIC_RESIST:
                return this.MAGIC_RESIST;
            case EnumAttr.CRIT_RATE:
                return this.CRIT_RATE;
            case EnumAttr.CRIT_DMG:
                return this.CRIT_DMG;
            case EnumAttr.DODGE_RATE:
                return this.DODGE_RATE;
            case EnumAttr.HIT_RATE:
                return this.HIT_RATE;
            case EnumAttr.STR:
                return this.STR;
            case EnumAttr.AGI:
                return this.AGI;
            case EnumAttr.INT:
                return this.INT;
            case EnumAttr.SPI:
                return this.SPI;
            case EnumAttr.END:
                return this.END;
            case EnumAttr.WIS:
                return this.WIS;
            default:
                return 0;
        }
    }

    public setAttr(attrType:EnumAttr, value:number):void {
        switch (attrType) {
            case EnumAttr.HP:
                this.HP = value;
                break;
            case EnumAttr.MP:
                this.MP = value;
                break;
            case EnumAttr.ATTACK_POWER:
                this.ATTACK_POWER = value;
                break;
            case EnumAttr.MAGIC_POWER:
                this.MAGIC_POWER = value;
                break;
            case EnumAttr.ARMOR:
                this.ARMOR = value;
                break;
            case EnumAttr.SHIELD:
                this.SHIELD = value;
                break;
            case EnumAttr.MAGIC_RESIST:
                this.MAGIC_RESIST = value;
                break;
            case EnumAttr.CRIT_RATE:
                this.CRIT_RATE = value;
                break;
            case EnumAttr.CRIT_DMG:
                this.CRIT_DMG = value;
                break;
            case EnumAttr.DODGE_RATE:
                this.DODGE_RATE = value;
                break;
            case EnumAttr.HIT_RATE:
                this.HIT_RATE = value;
                break;
            case EnumAttr.STR:
                this.STR = value;
                break;
            case EnumAttr.AGI:
                this.AGI = value;
                break;
            case EnumAttr.INT:
                this.INT = value;
                break;
            case EnumAttr.SPI:
                this.SPI = value;
                break;
            case EnumAttr.END:
                this.END = value;
                break;
            case EnumAttr.WIS:
                this.WIS = value;
                break;
        }
    }
}