export class AbstractSkill {
    // 技能元数据，尽量由SkillVo集中管理
    public name:string; // 技能名称
    public icon:string; // 图标
    public skillType:number; // 技能目标类型 无|点|范围|持续施法|引导法术|开关
    public targetType:number; // 施法目标类型
    public skillAction:number;  // 施法动作
    public skillCooldown:number; // 技能冷却
    public skillCost:number; // 技能消耗
    public skillDistance:number; // 技能距离
    public buffList:Buff[];
    public skillVo:SkillVo;
    // 技能动态数据
    public useUnit:Unit;
    constructor(skillVo:SkillVo) {
        this.skillVo = skillVo;
        this.buffList = this.skillVo.getBuffList();
    }

    //////////// 技能事件 //////////////////////
    protected onSpellStart():void {
        // TODO 技能效果，每一个技能有独立的技能效果，也可以进行汇总，一般来说，如果是点目标就给点目标释放BUFF，AOE就给区域目标释放BUFF
        GameModules.moduleBuff.addBuff(casterId,targetId,buffID);
        // GammModuels.mo
    }

    protected onSpellUpdate():void {
        
    }

    protected onSpellEnd():void {

    }
}