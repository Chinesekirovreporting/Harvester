import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 状态/效果：受到伤害与剩余生命（行首「状态」/「效果」由 isStatusLine 区分） */
export class FightCoreLogDamageLineVo implements IFightCoreLogSubVo {
    public targetName: string;
    public sourceName: string;
    /** true：来自【技能名】；false：来自 (Buff 名) */
    public sourceIsSkillBracket: boolean;
    public damage: number;
    public hpRemain: number;
    public hpAttrLabel: string;
    /** true：行首为「状态」；false：「效果」 */
    public isStatusLine: boolean;

    public constructor(
        targetName: string,
        sourceName: string,
        sourceIsSkillBracket: boolean,
        damage: number,
        hpRemain: number,
        hpAttrLabel: string = "生命值",
        isStatusLine: boolean = false
    ) {
        this.targetName = targetName;
        this.sourceName = sourceName;
        this.sourceIsSkillBracket = sourceIsSkillBracket;
        this.damage = damage;
        this.hpRemain = hpRemain;
        this.hpAttrLabel = hpAttrLabel;
        this.isStatusLine = isStatusLine;
    }

    public getLogString(): string {
        const src = this.sourceIsSkillBracket ? `【${this.sourceName}】` : `(${this.sourceName})`;
        const head = this.isStatusLine ? "状态" : "效果";
        return `${head}：「${this.targetName}」受到 来自${src}的 ${this.damage}伤害，剩余 |${this.hpAttrLabel}| ${this.hpRemain}`;
    }
}
