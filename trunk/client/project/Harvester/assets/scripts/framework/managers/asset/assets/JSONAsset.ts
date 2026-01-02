import { AbstractAsset } from "./AbstractAsset";

export class JSONAsset extends AbstractAsset {
    protected _json:Object;

    protected onSetData():void {
        this._json = JSON.parse(this._data);
    }

    public get json():Object {
        return this._json;
    }

    public onPoolReset():void {
        super.onPoolReset();
        this._json = null;
    }
}