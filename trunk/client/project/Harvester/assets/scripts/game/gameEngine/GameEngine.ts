import { Component, Node, Scene} from "cc";
import { LayerManager } from "../gameUI/LayerManager";
import { GameScenes } from "../gameScene/GameScenes";
import { GameModules } from "../gameModule/GameModules";
import { GameModels } from "../gameModel/GameModels";

export class GameEngine{
    public static gameRoot:Scene = null

    public static initGameEngine($gameRoot:Scene) {
        this.gameRoot = $gameRoot   // 初始化预备
        this.InitGameSetting();
        this.InitGameModels()   // 初始化游戏数据Model
        this.InitGameModules()  // 初始化游戏模块
        this.InitGameScenes()   // 初始化游戏场景
        this.InitLayerManager($gameRoot) // 初始化图层View
    }

    public static InitGameSetting() {
        
    }

    public static InitGameModels() {
        GameModels.init();
    }

    public static InitGameModules() {
        GameModules.InitBaseModules();
        GameModules.InitFightModules();
        GameModules.InitGameModules();
    }

    public static InitGameScenes() {
        GameScenes.init();
        GameScenes.enterScene(GameScenes.main);
    }

    public static InitLayerManager($gameRoot:Scene):void {
        LayerManager.inst.init($gameRoot)
    }
}