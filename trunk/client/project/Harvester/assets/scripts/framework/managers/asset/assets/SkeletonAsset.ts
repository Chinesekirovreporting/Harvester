import { ObjectPoolManager } from "../../../utils/objectPool/ObjectPoolManager";
import { App } from "../../App";
import { AbstractAsset } from "./AbstractAsset";

/**
 * 骨骼资源
 */
export class SkeletonAsset extends AbstractAsset {

    protected _skeletonData:any//SkeletonData;

    public onAdd():void {
        super.onAdd();
        this._lastUseTime = App.timerManager.currentTime;//egret.getTimer();
    }

    protected onSetData():void {
        this._skeletonData = this._data;
    }

    public get skeletonData():any {
        return this._skeletonData;
    }

    public onPoolReset():void {
        super.onPoolReset();
        if (this._skeletonData != null) {
            ObjectPoolManager.inst.releaseObject(this._skeletonData);
            this._skeletonData = null;
        }
    }
}