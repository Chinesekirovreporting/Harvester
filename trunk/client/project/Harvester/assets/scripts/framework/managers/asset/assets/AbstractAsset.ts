import { CocosByteArray } from "../../../cocos/CocosByteArray";
import { App } from "../../App";
import { TimerManager } from "../../timer/TimerManager";
import { IAsset } from "../IAsset";

/**
 * 抽象资源类
 */
export class AbstractAsset implements IAsset {

    protected _id:string;
    protected _url:string;
    protected _data:any;
    protected _useCount:number = 0;
    protected _lastUseTime:number = 0;
    protected _autoClear:boolean = true;

    /**
     * 唯一ID
     */
    public get id():string {
        return this._id;
    }

    public set id(value:string) {
        this._id = value;
    }

    /**
     * 下载地址
     */
    public get url():string {
        return this._url;
    }

    public set url(value:string) {
        this._url = value;
    }

    /**
     * 数据
     */
    public get data():any {
        return this._data;
    }

    public set data(value:any) {
        this._data = value;
        this.onSetData();
    }

    /**
     * 使用计数
     */
    public get useCount():number {
        return this._useCount;
    }

    public set useCount(value:number) {
        this._useCount = value;
    }

    /**
     * 最后使用时间
     */
    public get lastUseTime():number {
        return this._lastUseTime;
    }

    public set lastUseTime(value:number) {
        this._lastUseTime = value;
    }

    /**
     * 自动清除
     */
    public get autoClear():boolean {
        return this._autoClear;
    }

    public set autoClear(value:boolean) {
        this._autoClear = value;
    }

    /**
     * 获取字节数组
     */
    public getBytes():CocosByteArray {
        return this.createBytes();
    }

    /**
     * 使用计数
     */
    public use(count:number = 1):void {
        this._useCount += count;
        this._lastUseTime = App.timerManager.currentTime;//.currentTime;//egret.getTimer();
    }

    /**
     * 不使用计数
     */
    public unuse(count:number = 1):void {
        this._useCount -= count;
        if (this._useCount < 0) {
            this._useCount = 0;
        }
        if (this._useCount == 0) {
            this._lastUseTime = App.timerManager.currentTime;//egret.getTimer();
        }
    }

    /**
     * 添加到资源管理器中
     */
    public onAdd():void {
       
    }

    /**
     * 设置数据
     */
    protected onSetData():void {

    }

    /**
     * 生成字节数组
     */
    protected createBytes():CocosByteArray {
        return null;
    }

    /**
     * 销毁
     */
    public dispose():void {

    }

    /**
     * 取出
     */
    public onPoolGet():void {
        
    }

    /**
     * 重置
     */
    public onPoolReset():void {
        this._id = null;
        this._url = null;
        this._data = null;
        this._useCount = 0;
        this._lastUseTime = 0;
    }

    /**
     * 销毁
     */
    public onPoolDispose():void {
        this.dispose();
    }
}