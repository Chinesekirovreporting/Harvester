import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";

export class ModuleAction extends AbstractModule {
    protected init():void {
        console.log("初始化MainUI模块")
    }
    
    protected show():void {
        console.log("modulebattle SHOW")
    }
        
    protected remove():void {
            
    }
}