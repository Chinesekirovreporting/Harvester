import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 状态：受到某 DEBUFF */
export class FightCoreLogStatusDebuffVo implements IFightCoreLogSubVo {
    public targetName: string;
    public buffName: string;

    public constructor(targetName: string, buffName: string) {
        this.targetName = targetName;
        this.buffName = buffName;
    }

    public getLogString(): string {
        return `状态：「${this.targetName}」受到 (${this.buffName}) DEBUFF`;
    }
}
