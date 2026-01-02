import { AbstractAsset } from "./AbstractAsset";

/**
 * XML资源
 */
export class XMLAsset extends AbstractAsset {

    protected _xmlDoc:Document;

    protected onSetData():void {
        // this._xml = egret.XML.parse(this._data);
        // 使用 DOMParser 解析 XML 字符串  
        var parser = new DOMParser();  
        this._xmlDoc = parser.parseFromString(this._data, "text/xml");  
    }

    public get xml():Document {
        return this._xmlDoc;
    }

    public onPoolReset():void {
        super.onPoolReset();
        this._xmlDoc = null;
    }
}