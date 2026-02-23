import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";

export class ModuleSkill extends AbstractModule{

    public static readonly ON_SKILL_CAST:string = "ON_SKILL_CAST";
    public static readonly ON_SKILL_END:string = "ON_SKILL_END";

    protected init():void {
        console.log("初始化ModuleSkill")
    } 
    
    // public addSkill(player:Player, skillId:number):void{

    // }

    // public useSkill(unit:Unit, skillId:number):void {

    // }
}