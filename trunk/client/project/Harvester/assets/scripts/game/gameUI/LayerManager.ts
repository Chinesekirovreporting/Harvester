import { Renderer, Scene, Sprite, UIRenderer } from "cc";

/**
 * 图层管理器
 */
export class LayerManager {
    private static _inst:LayerManager;
    
    private _gameRoot:Scene
    private _rootRenerer:Node

    private _world:Node
    private _ui:Node;

    public static get inst():LayerManager {
        if (this._inst == null) {
            this._inst = new LayerManager();
        }
        return LayerManager._inst
    }

    /**
     * 初始化
     */
    public init($gameRoot:Scene):void {
        this._gameRoot = $gameRoot;
        // Demo展示
    }
    
}