import { BaseBuff } from "./BaseBuff";

export class BuffManager{
    public buffList:BaseBuff[];
    constructor() {
        this.buffList = [];
    }

    public addBuff(buff:BaseBuff):void {
        // 执行创建时效果
        this.buffList.push(buff);
        buff.applyBuff();
        // 如果BUFF是顺发技能，则触发后立即移除
        if(buff.buffVo.buffCFG.IsDot == 0) {
            this.removeBuff(buff);
        }
        console.log("添加BUFF", this.buffList.length);
    }

    public removeBuff(buff:BaseBuff):void {
        buff.removeBuff();
        this.buffList.splice(this.buffList.indexOf(buff), 1);
        console.log("移除BUFF", this.buffList.length);
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