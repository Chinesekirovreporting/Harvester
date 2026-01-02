import { GComponent } from "fairygui-cc";
import { Method } from "../../utils/Method";
import { IUIWindowSubView } from "./IUIWindowSubView";

/**
 * UIWindow接口
 */
export interface IUIWindow {

    /**
     * 视图
     */
    view:GComponent;

    /**
     * 是否已加载
     */
    isLoaded:boolean;

    /**
     * 是否已初始化
     */
    isInited:boolean;

    /**
     * 是否已显示
     */
    isShow:boolean;

    /**
    /**
     * 窗体数据
     */
    windowData:any;

    /**
     * 是否显示动画
     */
    needShowAction:boolean;

    /**
     * 是否自动销毁
     */
    autoDispose:boolean;

    /**
     * 自动销毁时间
     */
    autoDisposeTime:number;

    /**
     * 最后一次关闭时间
     */
    lastCloseTime:number;

    /**
     * 资源列表
     */
    resList:Array<string>;

    /**
	 * 全资源列表（包括子界面）
	 */
	getAllResList():Array<string>;

    /**
     * 初始化
     */
    init():void;

    /**
     * 显示
     */
    show(modal:boolean, x?:number, y?:number, touchClose?:boolean, args?:Array<any>):void;

    /**
     * 关闭
     */
    close(closeType?:string):void;

    /**
     * 销毁
     */
    dispose():void;
    
    /**
     * 判断是否加载
     */
    getLoaded():boolean;

    /**
     * 加载窗体资源
     */
    loadRes(callback?:Method):void;

}