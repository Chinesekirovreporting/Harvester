import { GComponent } from "fairygui-cc";

/**
 * UIView接口
 */
export interface IUIView {

    /**
     * 视图
     */
    view:GComponent;

    /**
     * 初始化
     */
    init():void;

    /**
     * 显示
     */
    show():void;

    /**
     * 关闭
     */
    close():void;
}