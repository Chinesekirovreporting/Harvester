import { AbstractAsset } from "./AbstractAsset";

/**
 * 文本资源
 */
export class TextAsset extends AbstractAsset {
    
    protected _text:string;

    protected onSetData():void {
        this._text = this._data;
    }

    public get text():string {
        return this._text;
    }

    public onPoolReset():void {
        super.onPoolReset();
        this._text = null;
    }
}