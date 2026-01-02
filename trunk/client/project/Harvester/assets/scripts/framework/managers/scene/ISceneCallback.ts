import { IScene } from "./IScene";

/**
 * 场景回调接口
 */
export interface ISceneCallback {
    (scene:IScene):void;
}