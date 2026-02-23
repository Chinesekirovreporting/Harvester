import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";

export class ModuleRound extends AbstractModule {
    public static readonly ON_ROUND_START:string = "ON_ROUND_START";
	public static readonly ON_ROUND_END:string = "ON_ROUND_END";
    protected init():void {
        console.log("初始化ROUND模块");
    }
    
    protected show():void {
        console.log("moduleRound SHOW");
    }
        
    protected remove():void {
        console.log("moduleRound REMOVE");
    }
}