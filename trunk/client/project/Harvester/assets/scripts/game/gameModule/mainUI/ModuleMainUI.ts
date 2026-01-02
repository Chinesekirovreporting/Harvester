import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { GButton, GComponent, GObject, GRoot, UIPackage } from "fairygui-cc";
import { MainUITopView } from "./MainUITopView";
import { GameModules } from "../GameModules";
import { UICore } from "../../../framework/core/ui/UICore";

export class ModuleMainUI extends AbstractModule {
    public top:MainUITopView;

    protected init():void {
        console.log("初始化MainUI模块")
        GRoot.create();
        UICore.init();
        UICore.loadPackage("ui/MainUI", (err) => {
            let view = UICore.createObject("MainUI", "MainUI").asCom;
            this.top = new MainUITopView(view);  // 这里的 this 正确指向外层
            UICore.root.addChild(this.top.view);
            this.top.show();    // 此处嵌套异步代码，无法使用下面show函数，在返回中强插
        });
    }
 
    protected show():void {
        console.log("modulemainui SHOW")
        // this.top.show();     // 此处嵌套异步代码，无法使用下面show函数，在返回中强插
    }
    
    protected remove():void {
        
    }
}