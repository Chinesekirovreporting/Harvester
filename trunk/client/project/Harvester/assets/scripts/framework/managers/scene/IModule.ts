import { IScene } from "./IScene";

/**
 * 模块接口
 */
export interface IModule {
    
    /**
     * 模块名称
     */
    moduleName:string;

    /**
     * 当前所属场景
     */
    scene:IScene;

    /**
     * 上一所属场景
     */
    lastScene:IScene;

    /**
     * 进入模块
     */
    enterModule():void;

    /**
     * 退出模块
     */
    exitModule():void;

    /**
     * 改变场景
     */
    changeScene(scene:IScene):void;
}