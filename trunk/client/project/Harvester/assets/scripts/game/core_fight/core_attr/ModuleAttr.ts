import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { FightCalcFunc } from "./FightCalcFunc";

// 属性模块负责封装复杂属性的逻辑运算
export class ModuleAttr extends AbstractModule {
    protected init():void {
        console.log("初始化ModuleAttr")
    }
}