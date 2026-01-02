import { CocosByteArray } from "../../cocos/CocosByteArray";
import { IPooledObject } from "../../utils/objectPool/IPooledObjpect";

/**
 * 资源接口
 */
export interface IAsset extends IPooledObject {
    
    /**
     * 唯一ID
     */
    id:string;

    /**
     * 地址
     */
    url:string;

    /**
     * 资源
     */
    data:any;

    /**
     * 使用计数
     */
    useCount:number;

    /**
     * 最后使用时间
     */
    lastUseTime:number;

    /**
     * 自动清除
     */
    autoClear:boolean;

    /**
     * 获取字节数组
     */
    getBytes():CocosByteArray;

    /**
     * 使用计数
     */
    use(count:number):void;

    /**
     * 不使用计数
     */
    unuse(count:number):void;

    /**
     * 添加到资源管理器中
     */
    onAdd():void;

    /**
     * 销毁
     */
    dispose():void;
}