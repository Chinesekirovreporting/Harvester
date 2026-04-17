import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 战斗：释放技能；targetName 为空表示仅自身释放 */
export class FightCoreLogSkillCastVo implements IFightCoreLogSubVo {
    public casterName: string;
    public skillName: string;
    public targetName: string | null;

    public constructor(casterName: string, skillName: string, targetName: string | null = null) {
        this.casterName = casterName;
        this.skillName = skillName;
        this.targetName = targetName;
    }

    public getLogString(): string {
        if (this.targetName != null && this.targetName.length > 0) {
            return `战斗：「${this.casterName}」 对 「${this.targetName}」 释放 【${this.skillName}】`;
        }
        return `战斗：「${this.casterName}」 释放 【${this.skillName}】`;
    }
}
