import { AbstractScene } from "../../framework/managers/scene/AbstractScene";
import { GameModules } from "../gameModule/GameModules";

/**
 * 主游戏场景
 */
export class SceneMain extends AbstractScene {

	protected init():void {
		super.init();

		// UICore.addPackage("UILib");
        // UICore.addPackage("MainUI");
        // UICore.addPackage("ViewUI");
        // UICore.addPackage("UIButton");
        // UICore.addPackage("Fight");
		// UICore.addNecessaryRes("UILib");
		// UICore.addNecessaryRes("MainUI");
        // UICore.addNecessaryRes("ViewUI");
        // UICore.addNecessaryRes("UIButton");
        // UICore.addNecessaryRes("Fight");
        // UIHelper.init();
        
		this.addModule(GameModules.world);
		this.addModule(GameModules.mainUI);
		this.addModule(GameModules.window);
		// this.addModule(GameModules.viewUI);
		// this.addModule(GameModules.window);
		// this.addModule(GameModules.notice);
		// this.addModule(GameModules.guide);
		// this.addModule(GameModules.inactivate);
		// this.addModule(GameModules.role);
		// this.addModule(GameModules.map);
		// this.addModule(GameModules.scene);
		// this.addModule(GameModules.effect);
	}

	public enterScene():void {
		this.OnSceneEntered();
	}

	public exitScene():void {
		this.OnSceneExited();
	}
}