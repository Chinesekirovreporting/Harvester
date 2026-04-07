import { BaseActor } from "../../core_actor/BaseActor";
import { EnumAttr } from "../EnumAttr";

export class ResultTable {
    constructor() {
        this.init();
    }

    protected init():void {
        console.log("ResultTable初始化");
    }
}

export class DamageResultTable extends ResultTable {
    public isCrit:boolean;  // 是否暴击
    public isMiss:boolean;  // 是否未命中
    public caster:BaseActor;  // 施法者
    public target:BaseActor;  // 目标单位
    public damage:number;  // 伤害值
    public beKilled:boolean;  // 是否被击杀

    constructor(isCrit:boolean, isMiss:boolean, caster:BaseActor, target:BaseActor, damage:number, beKilled:boolean) {
        super();
        this.isCrit = isCrit;
        this.isMiss = isMiss;
        this.caster = caster;
        this.target = target;
        this.damage = damage;
        this.beKilled = beKilled;
    }
}

export class HealResultTable extends ResultTable {
    public isCrit:boolean;
    public isMiss:boolean;
    public caster:BaseActor;
    public target:BaseActor;
    public heal:number;

    constructor(isCrit:boolean, isMiss:boolean, caster:BaseActor, target:BaseActor, heal:number) {
        super();
        this.isCrit = isCrit;
        this.isMiss = isMiss;
        this.caster = caster;
        this.target = target;
        this.heal = heal;
    }
}

export class ShieldResultTable extends ResultTable {
    public isCrit:boolean;  // 是否暴击
    public isMiss:boolean;  // 是否未命中
    public caster:number;  // 施法者
    public target:number;  // 目标单位
    public shield:number;  // 护盾值
}

export class AttrModifyResultTable extends ResultTable {
    public attrModifyType:EnumAttr;
    public attrModifyValue:number;
    constructor(attrModifyType:EnumAttr, attrModifyValue:number) {
        super();
        this.attrModifyType = attrModifyType;
        this.attrModifyValue = attrModifyValue;
    }
}

// export class BuffResultTable extends ResultTable {
//     public buffId:number;
//     public buffType:number;
//     public buffValue:number;
//     public buffDuration:number;
//     public buffIcon:string;
//     public buffName:string;
//     public buffDescription:string;
//     public buffTarget:number;
//     public buffSource:number;
// } 

// export class DebuffResultTable extends ResultTable {
//     public debuffId:number;
//     public debuffType:number;
//     public debuffValue:number;
//     public debuffDuration:number;
//     public debuffIcon:string;
//     public debuffName:string;
//     public debuffDescription:string;
//     public debuffTarget:number;
//     public debuffSource:number;
// }