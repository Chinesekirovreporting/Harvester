import { ObjectPoolManager } from "../../utils/objectPool/ObjectPoolManager";
import { Manager } from "../Manager";
import { IScene } from "./IScene";
import { ISceneManager } from "./ISceneManager";
import { SceneState } from "./SceneState";

/**
 * 场景管理器
 */
export class SceneManager extends Manager implements ISceneManager {
    
    public static readonly ENTERING_SCENE = "EnteringScene";
    public static readonly ENTER_SCENE = "EnterScene";
    public static readonly EXITING_SCENE = "ExitingScene";
    public static readonly EXIT_SCENE = "ExitScene";

    private _scenes:Object;
    private _currentScene:IScene;
    private _nextScene:IScene;

    public constructor() {
        super();
        this.init()
    }

    protected init():void {
        this._scenes = {};
    }

    /**
     * 注册场景
     */
    public registerScene(scene:IScene):void {
        if (this._scenes[scene.sceneName] == null) {
            scene.enterCallback = (scene:IScene) => {
                this.onSceneEntered(scene);
            };
            scene.exitCallback = (scene:IScene) => {
                this.onSceneExited(scene);
            };
            this._scenes[scene.sceneName] = scene;
        }
    }

    /**
     * 注销场景
     */
    public unregisterScene(scene:IScene):void {
        delete this._scenes[scene.sceneName];
    }

    /**
     * 进入场景
     */
    public enterScene(scene:IScene):void {
        // 不能重复进入同一场景
        if (this._currentScene != null && this._currentScene.sceneName == scene.sceneName) {
            return;
        }
        // 下一场景进入中不能进入场景
        if (this._nextScene != null && this._nextScene.state == SceneState.ENTERING) {
            return;
        }
        this._nextScene = scene;
        // 退出当前场景
        if (this._currentScene == null) {
            this.enterNextScene();
        } else {
            this.exitCurrentScene();
        }
    }

    /**
     * 进入场景回调
     */
    private onSceneEntered(scene:IScene):void {
        if (this._nextScene == scene) {
            this._nextScene.state = SceneState.RUNNING;
            this.dispatchEventWithData(SceneManager.ENTER_SCENE, this._nextScene);
            this._currentScene = this._nextScene;
            this._nextScene = null;
        }
    }

    /**
     * 离开场景回调
     */
    private onSceneExited(scene:IScene):void {
        if (this._currentScene == scene) {
            this._currentScene.state = SceneState.IDLE;
            this.dispatchEventWithData(SceneManager.EXIT_SCENE, this._currentScene);
            this.enterNextScene();
        }
    }

    /**
     * 退出当前场景
     */
    private exitCurrentScene():void {
        if (this._currentScene.state == SceneState.RUNNING) {
            this._currentScene.state = SceneState.EXITING;
            this._currentScene.exitScene();
            this.dispatchEventWithData(SceneManager.EXITING_SCENE, this._currentScene);
        }
    }

    /**
     * 进入下一场景
     */
    private enterNextScene():void {
        if (this._nextScene == null) {
            return;
        }
        // 退出当前场景
        if (this._currentScene != null) {
            // 退出当前场景模块
            for (var module of this._currentScene.modules) {
                if (this._nextScene.hasModule(module) == false) {
                    module.exitModule();
                }
            }
        }
        // 进入下一场景
        for (var module of this._nextScene.modules) {
            if (module.scene != this._nextScene) {
                module.changeScene(this._nextScene);
            }
            if (this._currentScene == null || this._currentScene.hasModule(module) == false) {
                module.enterModule();
            }
        }
        this._nextScene.state = SceneState.ENTERING;
        this._nextScene.enterScene();
        this.dispatchEventWithData(SceneManager.ENTERING_SCENE, this._nextScene);
    }

    /**
     * 对象池派发事件
     */
    public dispatchEventWithData(type:string, scene:IScene):void {
        // var event:SceneManagerEvent = ObjectPoolManager.inst.getObject(SceneManagerEvent) as SceneManagerEvent;
        // event.$type = type;
        // event.scene = scene;
        // this.dispatchEvent(type, scene);
        this.emit(type, scene);
        // ObjectPoolManager.inst.releaseObject(event);
    }
}