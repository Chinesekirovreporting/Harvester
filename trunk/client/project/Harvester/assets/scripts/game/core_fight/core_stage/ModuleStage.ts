import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";

export class ModuleStage extends AbstractModule {
    public static readonly ON_STAGE_START:string = "ON_STAGE_START";
	public static readonly ON_STAGE_END:string = "ON_STAGE_END";
    protected init():void {
        console.log("初始化STAGE模块");
    }
    
    protected show():void {
        console.log("modulestage SHOW");
    }
        
    protected remove():void {
        console.log("modulestage REMOVE");
    }
}