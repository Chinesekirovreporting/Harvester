import { ObjectPoolManager } from "../../utils/objectPool/ObjectPoolManager";
import { App } from "../App";
import { Manager } from "../Manager";
import { IAssetPackage } from "./AssetPackage";
import { IAsset } from "./IAsset";
/**
 * 资源管理器
 */
export class AssetManager extends Manager {
    private _enabled:boolean = false;
    private _assetDict:Object;
    private _autoClearCheckTime:number;
    private _autoClearTime:number;

    public constructor() {
        super();
        this.init()
    }

    /**
     * 初始化
     */
    protected init():void {
        this._assetDict = {};
        this._autoClearCheckTime = 5000;
        this._autoClearTime = 10000;
        this.enabled = true;
    }

    /**
     * 是否启用
     */
    public get enabled():boolean {
        return this._enabled;
    }

    public set enabled(value:boolean) {
        this._enabled = value;
        if (value) {
            App.timerManager.registerLoop(this._autoClearCheckTime, this.clearAssets, this);
        } else {
            App.timerManager.unregister(this.clearAssets, this);
        }
    }

    /**
     * 自动清理检查时间
     */
    public get autoClearCheckTime():number {
        return this._autoClearCheckTime;
    }

    public set autoClearCheckTime(value:number) {
        this._autoClearCheckTime = value;
        if (this._enabled) {
            App.timerManager.registerLoop(this._autoClearCheckTime, this.clearAssets, this);
        }
    }

    /**
     * 自动清理时间
     */
    public get autoClearTime():number {
        return this._autoClearTime;
    }

    public set autoClearTime(value:number) {
        this._autoClearTime = value;
        this.clearAssets();
    }

    /**
     * 清理资源
     */
    public clearAssets(force?:boolean):void {
        var time:number = App.timerManager.currentTime//egret.getTimer();
        var removeList:Array<IAsset> = new Array<IAsset>();
        for (var key in this._assetDict) {
            var asset:IAsset = this._assetDict[key];
            if (asset.autoClear && asset.lastUseTime > 0 && asset.useCount == 0) {
                if (force || time - asset.lastUseTime >= this._autoClearTime) {
                    removeList.push(asset);
                }
            }
        }
        for (var asset of removeList) {
            delete this._assetDict[asset.id];
            App.logManager.info("销毁资源：" + asset.id);
            ObjectPoolManager.inst.releaseObject(asset);
        }
    }

    /**
     * 添加资源
     */
    public addAsset(id:string, asset:IAsset):void {
        this._assetDict[id] = asset;
        asset.onAdd();
    }

    /**
     * 移除资源
     */
    public removeAsset(id:string):void {
        var asset:IAsset = this._assetDict[id];
        if (asset != null) {
            delete this._assetDict[id];
            ObjectPoolManager.inst.releaseObject(asset);
        }
    }

    /**
     * 是否包含资源
     */
    public hasAsset(id:string):boolean {
        return this._assetDict.hasOwnProperty(id);
    }

    /**
     * 根据ID获取资源
     */
    public getAsset(id:string):IAsset {
        return this._assetDict[id];
    }

    /**
     * 根据ID获取Package
     */
    public getAssetPackage(id:string):IAssetPackage {
        return this._assetDict[id];
    }

    /**
     * 获取package中的资源
     */
    public getAssetInPackage(id:string, name:string):any {
        var assetPackage:IAssetPackage = this._assetDict[id];
        if (assetPackage != null) {
            return assetPackage.getAsset(name);
        }
        return null;
    }

    /**
     * 使用资源
    */
    public useAsset(id:string, count:number):void {
        var asset:IAsset = this.getAsset(id);
        if (asset != null) {
            asset.use(count);
        }
    }

    /**
     * 不使用资源
     */
    public unUseAsset(id:string, count:number):void {
        var asset:IAsset = this.getAsset(id);
        if (asset != null) {
            asset.unuse(count);
        }
    }
}