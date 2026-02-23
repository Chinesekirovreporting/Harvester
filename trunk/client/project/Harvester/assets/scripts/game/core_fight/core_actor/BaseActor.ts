import { BaseSkill } from "../core_skill/BaseSkill";

export class BaseActor {
    public name:string;
    public hp:number
    public mp:number;
    public attack:number;
    public defense:number;
    public speed:number;
    public skillList:BaseSkill[]
}