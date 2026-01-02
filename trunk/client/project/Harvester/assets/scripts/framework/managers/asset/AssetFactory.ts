import { ObjectPoolManager } from "../../utils/objectPool/ObjectPoolManager";
import { IAsset } from "./IAsset";
import { AudioAsset } from "./assets/AudioAsset";
import { BinaryAsset } from "./assets/BinaryAsset";
import { JSONAsset } from "./assets/JSONAsset";
import { SkeletonAsset } from "./assets/SkeletonAsset";
import { TextAsset } from "./assets/TextAsset";
import { TextureAsset } from "./assets/TextureAsset";
import { TextureAtlasAsset } from "./assets/TextureAtlasAsset";
import { XMLAsset } from "./assets/XMLAsset";

/**
 * 资源工厂类
 */
export class AssetFactory {

    /**
     * 创建资源
     */
    public static createAsset(loadType:LoadType, data:Object):IAsset {
        var asset:IAsset;
        switch (loadType) {
            case LoadType.BINARY:
                asset = ObjectPoolManager.inst.getObject(BinaryAsset) as BinaryAsset;
                break;
            case LoadType.TEXT:
                asset = ObjectPoolManager.inst.getObject(TextAsset) as TextAsset;
                break;
            case LoadType.JSON:
                asset = ObjectPoolManager.inst.getObject(JSONAsset) as JSONAsset;
                break;
            case LoadType.XML:
                asset = ObjectPoolManager.inst.getObject(XMLAsset) as XMLAsset;
                break;
            case LoadType.TEXTURE:
                asset = ObjectPoolManager.inst.getObject(TextureAsset) as TextureAsset;
                break;
            case LoadType.AUDIO:
                asset = ObjectPoolManager.inst.getObject(AudioAsset) as AudioAsset;
                break;
            case LoadType.TEXTURE_ATLAS:
                asset = ObjectPoolManager.inst.getObject(TextureAtlasAsset) as TextureAtlasAsset;
                break;
            case LoadType.SKELETON:
                asset = ObjectPoolManager.inst.getObject(SkeletonAsset) as SkeletonAsset;
                break;
            default:
                break;
        }

        if (asset != null) {
            asset.data = data;
        }
        return asset;
    }
}