import { BaseBuff } from "./BaseBuff";

export class BuffManager{
    public buffList:BaseBuff[];
    constructor() {
        this.buffList = [];
    }

    public addBuff(buff:BaseBuff):void {
        // 执行创建时效果
        buff.applyBuff();
        this.buffList.push(buff);
    }

    public removeBuff(buff:BaseBuff):void {
        buff.removeBuff();
        this.buffList.splice(this.buffList.indexOf(buff), 1);
    }

    public getBuffList():BaseBuff[] {
        return this.buffList;
    }

    public onBuffTick():void {
        for (const buff of this.buffList) {
            buff.applyTick();
        }
    }
}