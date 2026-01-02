import { EventTarget } from "cc";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { IModule } from "./IModule";
import { IScene } from "./IScene";
import { ISceneCallback } from "./ISceneCallback";
import { SceneState } from "./SceneState";

/**
 * 抽象场景类
 */
export class AbstractScene extends EventTarget implements IScene {
    
    protected _sceneName:string;
    protected _sceneState:SceneState;
    protected _modules:Array<IModule>;

    protected _enterCallback:ISceneCallback;
    protected _exitCallback:ISceneCallback;

    public constructor(sceneName:string) {
        super();
        this._sceneName = sceneName;
        this._modules = new Array<IModule>();
        this.init();
    }

    /**
     * 场景名称
     */
    public get sceneName():string {
        return this._sceneName;
    }

    public set sceneName(value:string) {
        this._sceneName = value;
    }

    /**
     * 场景状态
     */
    public get state():SceneState {
        return this._sceneState;
    }

    public set state(value:SceneState) {
        this._sceneState = value;
    }

    /**
     * 场景内模块
     */
    public get modules():Array<IModule> {
        return this._modules;
    }

    /**
     * 场景进入回调
     */
    public get enterCallback():ISceneCallback {
        return this._enterCallback;
    }

    public set enterCallback(value:ISceneCallback) {
        this._enterCallback = value;
    }

     /**
     * 场景退出回调
     */
    public get exitCallback():ISceneCallback {
        return this._exitCallback;
    }

    public set exitCallback(value:ISceneCallback) {
        this._exitCallback = value;
    }

    /**
     * 初始化
     */
    protected init():void {

    }

    /**
     * 进入场景
     */
    public enterScene():void {

    }

    /**
     * 退出场景
     */
    public exitScene():void {

    }

    /**
     * 添加模块
     */
    public addModule(module:IModule):void {
        ArrayUtil.addItems(this._modules, module);
    }

    /**
     * 移除模块
     */
    public removeModule(module:IModule):void {
        ArrayUtil.removeItems(this._modules, module);
    }

    /**
     * 是否包含模块
     */
    public hasModule(module:IModule):boolean {
        return this._modules.indexOf(module) != -1;
    }

    /**
     * 场景进入完成回调，需手动调用
     */
    protected OnSceneEntered():void {
        if (this._enterCallback != null) {
            this._enterCallback(this);
        }
    }

    /**
     * 场景退出完成回调，需手动调用
     */
    protected OnSceneExited():void {
        if (this._exitCallback != null) {
            this._exitCallback(this);
        }
    }
}