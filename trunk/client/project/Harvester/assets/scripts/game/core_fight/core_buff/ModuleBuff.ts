import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BuffManager } from "./BuffManager";

export class ModuleBuff extends AbstractModule{
    public buffMgr:BuffManager;

    protected init():void {
        console.log("初始化ModuleBuff")
    }

    public addBuff(skillId:number,buffId:number):void {

    }

    public removeBuff(skillId:number,buffId:number):void {
    }
}