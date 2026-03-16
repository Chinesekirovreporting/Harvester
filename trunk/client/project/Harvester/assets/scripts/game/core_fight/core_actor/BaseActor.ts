import { BaseSkill } from "../core_skill/BaseSkill";

export class BaseActor {
    public name:string;
    public hp:number
    public mp:number;
    public attackPower:number;
    public magicPower:number;
    public armor:number;
    public shield:number;
    public magicResist:number;
    public critRate:number;
    public critDmg:number;
    public dodgeRate:number;
    public hitRate:number;
    public skillList:BaseSkill[]
}