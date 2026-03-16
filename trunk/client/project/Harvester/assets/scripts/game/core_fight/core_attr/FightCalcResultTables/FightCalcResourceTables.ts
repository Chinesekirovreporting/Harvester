export class ResultTable {

}

export class DamageResultTable extends ResultTable {
    public isCrit:boolean;  // 是否暴击
    public isMiss:boolean;  // 是否未命中
    public caster:number;  // 施法者
    public target:number;  // 目标单位
    public damage:number;  // 伤害值
}

export class HealResultTable extends ResultTable {
    public isCrit:boolean;  // 是否暴击
    public isMiss:boolean;  // 是否未命中
    public caster:number;  // 施法者
    public target:number;  // 目标单位
    public heal:number;  // 治疗值
}

export class ShieldResultTable extends ResultTable {
    public isCrit:boolean;  // 是否暴击
    public isMiss:boolean;  // 是否未命中
    public caster:number;  // 施法者
    public target:number;  // 目标单位
    public shield:number;  // 护盾值
}

export class BuffResultTable extends ResultTable {
    public buffId:number;
    public buffType:number;
    public buffValue:number;
    public buffDuration:number;
    public buffIcon:string;
    public buffName:string;
    public buffDescription:string;
    public buffTarget:number;
    public buffSource:number;
} 

export class DebuffResultTable extends ResultTable {
    public debuffId:number;
    public debuffType:number;
    public debuffValue:number;
    public debuffDuration:number;
    public debuffIcon:string;
    public debuffName:string;
    public debuffDescription:string;
    public debuffTarget:number;
    public debuffSource:number;
}