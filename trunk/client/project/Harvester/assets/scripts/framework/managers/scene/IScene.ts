import { IModule } from "./IModule";
import { ISceneCallback } from "./ISceneCallback";
import { SceneState } from "./SceneState";

/**
 * 场景接口
 */
export interface IScene {

    /**
     * 场景名称
     */
    sceneName:string;

    /**
     * 场景状态
     */
    state:SceneState;

    /**
     * 场景内模块
     */
    modules:Array<IModule>;

    /**
     * 场景进入回调
     */
    enterCallback:ISceneCallback;

    /**
     * 场景退出回调
     */
    exitCallback:ISceneCallback;

    /**
     * 进入场景
     */
    enterScene():void;

    /**
     * 退出场景
     */
    exitScene():void;

    /**
     * 添加模块
     */
    addModule(module:IModule):void;

    /**
     * 移除模块
     */
    removeModule(module:IModule):void;

    /**
     * 是否包含模块
     */
    hasModule(module:IModule):boolean;
}