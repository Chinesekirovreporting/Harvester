import { Dictionary } from "../../utils/Dictionary";
import { ObjectPool } from "../../utils/objectPool/ObjectPool";
import { Manager } from "../Manager";
import { TimerHandler } from "./TimerHandler";

export class TimerManager extends Manager{
    
    private _timerHandlerPool:ObjectPool
    private _timerHandlers:Dictionary

    public _time:number;
    public _currentFrame:number;
    public _currentTime:number;
    public _deltaTime:number;

    public constructor() {
        super();
        this.init()
    }

    protected init():void {
        this._timerHandlerPool = new ObjectPool(TimerHandler)
        this._timerHandlers = new Dictionary()
        this._time = 0;
        this._currentFrame = 0;
        this._currentTime = 0;
        this._deltaTime = 0;
    }

    /**
     * 当前时间（毫秒）
     */
    public get time():number {
        return this._time;
    }

    public set time(value:number) {
        this._time = value;
    }

    /**
     * 当前时间（秒）
     */
    public get timeSecond():number {
        return this._time * 0.001;
    }

    public set timeSecond(value:number) {
        this.time = value * 1000;
    }

    /**
     * 计时器运行时间（毫秒）
     */
    public get currentTime():number {
        return this._currentTime;
    }

    /**
     * 帧间隔时间（毫秒）
     */
    public get deltaTime():number {
        return this._deltaTime;
    }

    /**
     * 帧间隔时间（秒）
     */
    public get deltaTimeSecond():number {
        return this._deltaTime * 0.001;
    }

    public update(deltaTime:number):void {
        this._deltaTime = deltaTime;
        this._currentFrame++;
        this._currentTime += deltaTime;
        if (this._time != 0) {
            this._time += deltaTime;
        }
        this._timerHandlers.forEach(this.updateForeach, this);
    }

    private updateForeach(handler:TimerHandler):boolean {
        var time:number = handler.isFrame ? this._currentFrame : this._currentTime;
        if (time >= handler.currentTime) {
            var callback:Function = handler.callback;
            if (callback != null) {
                var thisObj:any = handler.thisObj;
                var args:Array<any> = handler.args;
                while (time >= handler.currentTime && handler.count != 0) {
                    handler.currentTime += handler.delayTime;
                    if (handler.count > 0) {
                        handler.count--;
                        if (handler.count == 0) {
                            this.unregister(callback, thisObj);
                        }
                    }
                    callback.apply(thisObj, args);
                }
            }   
        }
        return true;
    }

    /**
     * 注册计时器回调函数
     */
    public register(isFrame:boolean, delayTime:number, callback:Function, thisObj:any, count:number = 1, args:Array<any> = null):void {
        var handler:TimerHandler = this._timerHandlers.get(callback, thisObj);
        // 更新计时器回调
        if (handler != null) {
            handler.isFrame = isFrame;
            handler.delayTime = delayTime;
            handler.thisObj = thisObj;
            handler.args = args;
            handler.count = count;
            handler.currentTime = (isFrame ? this._currentFrame : this._currentTime) + delayTime;
            return;
        }
        // 注册计时器回调
        handler = this._timerHandlerPool.getObject() as TimerHandler;
        handler.isFrame = isFrame;
        handler.delayTime = delayTime;
        handler.callback = callback;
        handler.thisObj = thisObj;
        handler.args = args;
        handler.count = count;
        handler.currentTime = (isFrame ? this._currentFrame : this._currentTime) + delayTime;
        this._timerHandlers.set(callback, handler, thisObj);
    }

    /**
     * 注销计时器回调函数
     */
    public unregister(callback:Function, thisObj:any):void {
        var handler:TimerHandler = this._timerHandlers.get(callback, thisObj);
        if (handler != null) {
            this._timerHandlers.remove(callback, thisObj);
            this._timerHandlerPool.releaseObject(handler);
        }
    }

    /**
     * 注册计时器回调函数（毫秒，执行一次）
     */
    public registerOnce(delayTime:number, callback:Function, thisObj:any, args:Array<any> = null):void {
        this.register(false, delayTime, callback, thisObj, 1, args);
    }

    /**
     * 注册计时器回调函数（毫秒，循环执行）
     */
    public registerLoop(delayTime:number, callback:Function, thisObj:any, args:Array<any> = null):void {
        this.register(false, delayTime, callback, thisObj, -1, args);
    }

    /**
     * 注册帧回调函数（执行一次）
     */
    public registerFrameOnce(delayTime:number, callback:Function, thisObj:any, args:Array<any> = null):void {
        this.register(true, delayTime, callback, thisObj, 1, args);
    }

    /**
     * 注册帧回调函数（循环执行）
     */
    public registerFrameLoop(delayTime:number, callback:Function, thisObj:any, args:Array<any> = null):void {
        this.register(true, delayTime, callback, thisObj, -1, args);
    }
}