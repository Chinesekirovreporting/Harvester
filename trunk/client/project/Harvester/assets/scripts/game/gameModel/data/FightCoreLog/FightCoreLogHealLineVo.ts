import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 效果：治疗与剩余生命 */
export class FightCoreLogHealLineVo implements IFightCoreLogSubVo {
    public targetName: string;
    public sourceName: string;
    /** true：来自【技能名】；false：来自 (Buff 名) */
    public sourceIsSkillBracket: boolean;
    public heal: number;
    public hpRemain: number;
    public hpAttrLabel: string;

    public constructor(
        targetName: string,
        sourceName: string,
        sourceIsSkillBracket: boolean,
        heal: number,
        hpRemain: number,
        hpAttrLabel: string = "生命值"
    ) {
        this.targetName = targetName;
        this.sourceName = sourceName;
        this.sourceIsSkillBracket = sourceIsSkillBracket;
        this.heal = heal;
        this.hpRemain = hpRemain;
        this.hpAttrLabel = hpAttrLabel;
    }

    public getLogString(): string {
        const src = this.sourceIsSkillBracket ? `【${this.sourceName}】` : `(${this.sourceName})`;
        return `效果：「${this.targetName}」获得 来自${src}的 ${this.heal}治疗，剩余 |${this.hpAttrLabel}| ${this.hpRemain}`;
    }
}
