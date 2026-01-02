import { App } from "../../framework/managers/App";
import { IScene } from "../../framework/managers/scene/IScene";
import { SceneMain } from "./SceneMain";

/**
 * 场景
 */
export class GameScenes {
	
	public static readonly SCENE_LOGIN:string = "login";
	public static readonly SCENE_MAIN:string = "main";
	public static readonly SCENE_CREATE_ROLE:string = "createRole";

	// public static login:SceneLogin;
	public static main:SceneMain;
	// public static createRole:SceneCreateRole;

	// /**
	//  * 初始化登录
	//  */
	// public static initLogin():void {
	// 	GameScenes.login = new SceneLogin(GameScenes.SCENE_LOGIN);

	// 	App.sceneManager.registerScene(GameScenes.login);
	// }

	// /**
	//  * 初始化创角
	//  */
	// public static initCreateRole():void {
	// 	GameScenes.createRole = new SceneCreateRole(GameScenes.SCENE_CREATE_ROLE);

	// 	App.sceneManager.registerScene(GameScenes.createRole);
	// }

	/**
	 * 初始化
	 */
	public static init():void {
		GameScenes.main = new SceneMain(GameScenes.SCENE_MAIN);

		App.sceneManager.registerScene(GameScenes.main);
	}

	/**
	 * 进入场景
	 */
	public static enterScene(scene:IScene):void {
		App.sceneManager.enterScene(scene);
	}
}