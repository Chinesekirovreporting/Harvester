export class AbstractBuff {
    public name:string;
    public icon:string;
    public buffID:number;
    public duration:number; 
    public isDebuff:boolean;
    public effectList:Effect[];
    public buffVo:BuffVo;
    constructor(buffVo:BuffVo) { 
        this.buffVo = buffVo;
        this.effectList = this.buffVo.getEffectList();
    }
    
    protected onCreated():void {

    }

    protected onUpdate():void {
        for (const effect of this.effectList) {
            effect.update();
        }
    }

    protected onOneTick():void {

    }

    protected onDestroy():void {
        
    }
} 