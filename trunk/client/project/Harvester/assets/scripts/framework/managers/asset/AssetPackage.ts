import { IAsset } from "./IAsset";

/**
 * 资源包接口
 */
export interface IAssetPackage extends IAsset {

    /**
     * 是否包含资源
     */
    hasAsset(name:string):boolean;

    /**
     * 获取资源
     */
    getAsset(name:string):any;

    /**
     * 获取所有资源
     */
    getAssets():Array<any>;
}