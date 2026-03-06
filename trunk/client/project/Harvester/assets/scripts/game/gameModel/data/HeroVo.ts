import { HeroBookCFG } from "../table/tableClass/HeroBookCFG";

export class HeroVo {
    public heroCFG:HeroBookCFG;
    public heroId:number;
    public heroName:string;
    public heroLevel:number;
    public heroExp:number;
    public heroGold:number;
    public heroDiamond:number;
    public heroVip:number;
    public heroVipExp:number;
    public heroVipLevel:number;
    public heroVipLevelExp:number;
    public heroVipLevelMax:number;
    public heroVipLevelMaxExp:number;
    constructor(heroCFG:HeroBookCFG) {
        this.heroCFG = heroCFG;
    }
}