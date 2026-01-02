import { AssetManager, SpriteFrame, resources } from "cc";
import { Method } from "../../utils/Method";
import { IManager } from "../IManager";
import { Manager } from "../Manager";
import { LoadItem } from "./LoadItem";
import { App } from "../App";
/**
 * 加载管理器
 */
export class LoadManager extends Manager{

    public constructor() {
        super();
        this.init()
    }

    protected init():void {

    }

    public load($url:string, $type, $completeCallback?:Method):LoadItem {
        resources.load("pic/pic2", SpriteFrame, (err, $spriteFrame) => {
            $completeCallback.applyWith([err, $spriteFrame])
        })
        // var item:LoadItem = new LoadItem($url, $type, $completeCallback);
        // var asset:IAsset = App.assetManager.getAsset(item.id)
        // if(asset != null) {
        //     return item
        // }
        return null;
    }

    public loadTest(url:string, clazz?: any, callback?:Method):void {
        resources.load(url, clazz, (err, content) => {
            callback.applyWith([err, content])
            // App.assetManager.addAsset()
        }) 
    }
}