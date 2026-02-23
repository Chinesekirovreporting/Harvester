import { EventTarget } from "cc";
import { IModule } from "./IModule";
import { IScene } from "./IScene";

/**
 * 模块抽象类
 */
export class AbstractModule extends EventTarget implements IModule {

    protected _moduleName:string;
    protected _inited:boolean = false;
    protected _scene:IScene;
    protected _lastScene:IScene;

    // ESC
    protected isECS:boolean;
    // protected systems:Array<AbstractSystem>;
    // protected entitys:Array<AbstractEntity>;

    public constructor(moduleName:string) {
        super();
        this._moduleName = moduleName;
    }

    /**
     * 模块名称
     */
    public get moduleName():string {
        return this._moduleName;
    }

    public set moduleName(value:string) {
        this._moduleName = value;
    }

     /**
     * 是否已完成初始化
     */
    public get inited():boolean {
        return this._inited;
    }

    public set inited(value:boolean) {
        this._inited = value;
    }

    /**
     * 当前所属场景
     */
    public get scene() {
        return this._scene;
    }

    /**
     * 上一所属场景
     */
    public get lastScene() {
        return this._lastScene;
    }

    /**
     * 进入模块
     */
    public enterModule():void {
        if (!this._inited) {
            this.init();
            this._inited = true;
        }
        this.show();
    }

    /**
     * 退出模块
     */
    public exitModule():void {
        this.remove();
    }

    /**
     * 改变场景
     */
    public changeScene(scene:IScene):void {
        this._lastScene = this._scene;
        this._scene = scene;
        this.onSceneChange();
    }

    /**
     * 重置
     */
    public reset():void {

    }

    /**
     * 初始化
     */
    protected init():void {

    }

    /**
     * 显示
     */
    protected show():void {

    }

    /**
     * 移除
     */
    protected remove():void {

    }

    /**
     * 场景放生改变
     */
    protected onSceneChange():void {

    }

    // 派发事件
	public dispatchEventWithData(type:string, data:Object ):void {
		this.emit(type, data);
	}
}