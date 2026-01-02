import { Sprite, SpriteFrame } from "cc";
import { AbstractAsset } from "./AbstractAsset";

/**
 * 纹理资源
 */
export class TextureAsset extends AbstractAsset {

    protected _texture:SpriteFrame;

    protected onSetData():void {
        // this._texture = new Texture2D();
        // this._texture._setBitmapData(this._data);
        this._texture = new SpriteFrame()
        this._texture.texture = this._data
    }

    public get texture():SpriteFrame {
        return this._texture;
    }

    public onPoolReset():void {
        super.onPoolReset();
        if (this._texture != null) {
            this._texture.texture = null;
            this._texture = null;
        }
    }
}