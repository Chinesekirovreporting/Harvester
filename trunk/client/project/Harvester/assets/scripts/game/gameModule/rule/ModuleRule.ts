import { App } from "../../../framework/managers/App";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { RuleDemo } from "./RuleDemo";

export class ModuleRule extends AbstractModule {
    public demoRule:RuleDemo;
    public int1:number = 0;

    protected init():void {
        console.log("初始化ModuleRule，包括垂直切片")
        this.demoRule = new RuleDemo();
    }

    protected show():void {
        console.log("ModuleRule SHOW，垂直切片show");
        App.timerManager.registerFrameLoop(60, this.update, this);
    }

    private update():void {
        // console.log("update", App.timerManager.currentTime);
        // console.log(this.int1++);
        this.demoRule.updateSec();
    }

    protected remove():void {
        console.log("ModuleRule REMOVE，包括垂直接片remove");
        App.timerManager.unregister(this.update, this);
    }
    
}