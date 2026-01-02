import { IPooledObject } from "../../utils/objectPool/IPooledObjpect";

export class TimerHandler implements IPooledObject{

    public isFrame:boolean = false;
    public callback:Function;
    public thisObj:any;
    public args:Array<any>;
    public delayTime:number;
    public count:number;
    public currentTime;

    /**
	 * 取出
	 */
	public onPoolGet():void {

    }

	/**
	 * 重置
	 */
	public onPoolReset():void {
        this.callback = null;
        this.thisObj = null;
        this.args = null;
    }

	/**
	 * 销毁
	 */
	public onPoolDispose():void {
        this.callback = null;
        this.thisObj = null;
        this.args = null;
    }
}