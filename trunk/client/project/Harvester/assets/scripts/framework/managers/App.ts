
import { IManager } from "./IManager";
import { TimerManager } from "./timer/TimerManager";
import { EventManager } from "./EventManager";
import { StageManager } from "./StageManager";
import { LogManager } from "./LogManager";
import { AssetManager } from "./asset/AssetManager";
import { LoadManager } from "./load/LoadManager";
import { TableManager } from "./table/TableManager";
import { SceneManager } from "./scene/SceneManager";
import { AudioManager } from "./AudioManager";
import { KeyBoardManager } from "./KeyBoardManager";
import { CookieManager } from "./CookieManager";
import { Component, Node, Scene } from "cc";

export class App{
    // framework App是是架构层入口 架构层不放置游戏等相关内容 
    private static _inst:App;

    private _stage:Scene
    private _rootCom:Component
    private _managerList:Array<IManager>;

    // 管理器
    public static timerManager:TimerManager;
    public static eventManager:EventManager;
    public static stageManager:StageManager;
    public static logManager:LogManager;
    public static assetManager:AssetManager;
    public static loadManager:LoadManager;
    public static tableManager:TableManager;
    public static sceneManager:SceneManager;
    public static audioManager:AudioManager;
    public static keyboardManager:KeyBoardManager;
    public static cookieManager:CookieManager;


    public static get inst():App{
        if(this._inst == null) {
            this._inst = new App()
        }
        return App._inst;
    }

    public get stage():Scene {
		return this._stage;
	}

    public get rootCom():Component {
        return this._rootCom
    }

    constructor() {
        this._managerList = new Array<IManager>();
    }

    public startApp($rootScene:Scene, $rootScriptCom:Component):void {
        App._inst._stage = $rootScene;
        App._inst._rootCom = $rootScriptCom;
        this.initDefaultManagers();
    }

    /**
     * 更新管理器
     * @param deltaTime 时间间隔 毫秒
     */
    public updateTick(deltaTime:number) {
		for (var manager of this._managerList) {
			manager.update(deltaTime);
		}
    }

	/**
	 * 添加管理器
	 */
	public addManager(manager:any):void {
		if (this._managerList.indexOf(manager) == -1) {
			this._managerList.push(manager);
		}
	}

	/**
	 * 移除管理器
	 */
	public removeManager(manager:IManager):void {
		var index:number = this._managerList.indexOf(manager);
		if (index != -1) {
			this._managerList.splice(index, 1);
		}
	}

    /**
	 * 初始化默认管理器
	 */
	public initDefaultManagers():void {
		App.timerManager = new TimerManager();
		this.addManager(App.timerManager);
        App.eventManager = new EventManager();
        this.addManager(App.eventManager);   
		App.stageManager = new StageManager();
		this.addManager(App.stageManager);
		App.logManager = new LogManager();
		this.addManager(App.logManager);
		App.assetManager = new AssetManager();
		this.addManager(App.assetManager);
		App.loadManager = new LoadManager();
		this.addManager(App.loadManager);
		App.tableManager = new TableManager();
		this.addManager(App.tableManager);
		App.sceneManager = new SceneManager();
		this.addManager(App.sceneManager);
		// App.socketManager = new SocketManager();
		// this.addManager(App.inst._socketManager);
		App.audioManager = new AudioManager();
		this.addManager(App.audioManager);
		App.keyboardManager = new KeyBoardManager();
		this.addManager(App.keyboardManager);
		App.cookieManager = new CookieManager();
		this.addManager(App.cookieManager);
	}
}