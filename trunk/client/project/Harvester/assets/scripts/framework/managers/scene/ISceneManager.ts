import { IManager } from "../IManager";
import { IScene } from "./IScene";

/**
 * 场景管理器接口
 */
export interface ISceneManager extends IManager {

    /**
     * 注册场景
     */
    registerScene(scene:IScene):void;

    /**
     * 注销场景
     */
    unregisterScene(scene:IScene):void;

    /**
     * 进入场景
     */
    enterScene(scene:IScene):void;
}