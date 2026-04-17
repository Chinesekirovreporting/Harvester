import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 属性：|某属性| 提升/降低（delta 正为提升，负为降低） */
export class FightCoreLogAttrChangeVo implements IFightCoreLogSubVo {
    public actorName: string;
    public attrName: string;
    public delta: number;

    public constructor(actorName: string, attrName: string, delta: number) {
        this.actorName = actorName;
        this.attrName = attrName;
        this.delta = delta;
    }

    public getLogString(): string {
        const verb = this.delta >= 0 ? "提升" : "降低";
        const abs = Math.abs(this.delta);
        return `属性：「${this.actorName}」 |${this.attrName}| ${verb} ${abs} 点`;
    }
}
