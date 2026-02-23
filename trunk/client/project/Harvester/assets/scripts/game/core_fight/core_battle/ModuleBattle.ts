import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { EnumBattleType } from "./battle/EnumBattleType";

export class ModuleBattle extends AbstractModule{
	public static readonly ON_BATTLE_START:string = "ON_BATTLE_START";
	public static readonly ON_BATTLE_END:string = "ON_BATTLE_END";
    protected init():void {
        console.log("初始化moduleBattle模块")
    }
    
    protected show():void {
        console.log("modulebattle SHOW")
    }
    
    protected remove():void {
            
    }
    
    public showBattleByType(battleType:EnumBattleType):void {
        // 根据战斗类型创建对应的战斗实例并显示
        let battleInstance:any;
        this.dispatchEventWithData(ModuleBattle.ON_BATTLE_START, battleType);

    }
}