import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { ModuleActionEvent } from "./ModuleActionEvent";
import { RoundActionBase } from "./RoundActionBase";

export class ModuleAction extends AbstractModule {
    protected init():void {
        console.log("初始化MainUI模块")
    }
    
    public doAction(actionBase:RoundActionBase):void {
        actionBase.doAction();
        this.dispatchEventWithData(ModuleActionEvent.ON_ACTION_START, actionBase);
    }

    protected show():void {
        console.log("modulebattle SHOW")
    }
        
    protected remove():void {
            
    }
}