import { CocosByteArray } from "../../../cocos/CocosByteArray"
import { AbstractAsset } from "./AbstractAsset"

export class BinaryAsset extends AbstractAsset {
    protected _bytes:CocosByteArray;

    protected onSetData(): void {
        
    }

    public get bytes():CocosByteArray {
        return this._bytes;
    }

    public onPoolReset():void {
        super.onPoolReset();
        this._bytes = null
    }
    
}