import { GLoader } from "fairygui-cc";

/**
 * 外部加载器 - 混合方案
 * 支持两种图标来源：
 * 1. ui:// - FairyGUI 包内资源（由基类 loadFromPackage 处理）
 * 2. icon/ - Cocos resources/icon/ 目录（本类 loadExternal 处理）
 */
export class ExternalGLoader extends GLoader {
    public constructor() {
        super();
    }

    // 非fairyGUI目录进行资源访问
    protected loadExternal(): void {
        const url = this.url;
        if (!url) {
            this.onExternalLoadFailed();
            return;
        }

        // 基于resource走resource，基于http走Http
        super.loadExternal();
    }
    // 注：loadExternal源码如下
    // fairygui.mjs 第 12040-12068 行
    // loadExternal() {
    //     let url = this.url;
    //     let callback = (err, asset) => {
    //         // 因为是异步返回的，而这时可能url已经被改变，所以不能直接用返回的结果
    //         if (this._url != url || !isValid(this._node))
    //             return;
    //         if (err)
    //             console.warn(err);
    //         if (asset instanceof SpriteFrame)
    //             this.onExternalLoadSuccess(asset);
    //         else if (asset instanceof Texture2D) {
    //             let sf = new SpriteFrame();
    //             sf.texture = asset;
    //             this.onExternalLoadSuccess(sf);
    //         }
    //         else if (asset instanceof ImageAsset) {
    //             let sf = new SpriteFrame();
    //             let texture = new Texture2D();
    //             texture.image = asset;
    //             sf.texture = texture;
    //             this.onExternalLoadSuccess(sf);
    //         }
    //     };
    //     if (this._url.startsWith("http://")
    //         || this._url.startsWith("https://")
    //         || this._url.startsWith('/'))
    //         assetManager.loadRemote(this._url, callback);
    //     else
    //         resources.load(this._url + "/spriteFrame", Asset, callback);  // ← 关键
    // }
}