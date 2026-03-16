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