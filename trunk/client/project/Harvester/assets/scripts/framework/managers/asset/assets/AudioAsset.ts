import { AudioSource } from "cc";
import { AbstractAsset } from "./AbstractAsset";
import { App } from "../../App";

/**
 * 音频资源
 */
export class AudioAsset extends AbstractAsset {

    protected _sound:AudioSource

    public onAdd():void {
        super.onAdd();
        this._lastUseTime = App.timerManager.currentTime;//egret.getTimer();
    }

    protected onSetData():void {
        this._sound = this._data;
    }

    public get sound():AudioSource {
        return this._sound;
    }

    public onPoolReset():void {
        super.onPoolReset();
        this._sound = null;
    }
}