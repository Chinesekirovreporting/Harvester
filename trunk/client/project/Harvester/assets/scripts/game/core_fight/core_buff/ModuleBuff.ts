import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BuffManager } from "./BuffManager";

export class ModuleBuff extends AbstractModule{
    public buffMgr:BuffManager;

    public addBuff(skillId:number,buffId:number):void {

    }
}