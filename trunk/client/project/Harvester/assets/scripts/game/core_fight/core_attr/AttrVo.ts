// 属性结构体 
export class AttrVo {
    public attrId:number;
    public owner:number;
    public HP:number;
    public ATK:number;
    public DEF:number; 
    public SPD:number;
    public CRIT_RATE:number;
    public CRIT_DMG:number;
    public DODGE_RATE:number;
    public HIT_RATE:number;

    constructor(attrId:number, owner:number) {
        this.attrId = attrId;
        this.owner = owner;
    }
}

// // 生命
// public static HP:number = 1
// // 攻击
// public static ATK:number = 2
// // 防御
// public static DEF:number = 3
// // 速度
// public static SPD:number = 4
// // 暴击率    public static CRIT_RATE:number = 5
// public static CRIT_RATE:number = 5
// // 暴击伤害
// public static CRIT_DMG:number = 6
// // 闪避率
// public static DODGE_RATE:number = 7
// // 命中率
// public static HIT_RATE:number = 8