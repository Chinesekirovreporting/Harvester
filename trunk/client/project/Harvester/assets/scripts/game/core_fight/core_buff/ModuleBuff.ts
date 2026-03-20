import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { BaseBuff } from "./BaseBuff";
import { BuffManager } from "./BuffManager";
import { BuffVo } from "./BuffVo";

export class ModuleBuff extends AbstractModule{
    public buffMgr:BuffManager;

    protected init():void {
        console.log("初始化ModuleBuff")
    }

    public addBuff(skillId:number,buffId:number):void {
        // let buffVo:BuffVo = new BuffVo(buffId,"",icon,duration,isDebuff,effectList);
        let buffVo:BuffVo;
        let baseBuff:BaseBuff = new BaseBuff(buffVo);
        baseBuff.applyBuff();
    }

    public removeBuff(skillId:number,buffId:number):void {
    }
}