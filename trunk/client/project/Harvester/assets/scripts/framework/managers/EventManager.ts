import { Event } from "cc";
import { Manager } from "./Manager";
import { Method } from "../utils/Method";
import { Dictionary } from "../utils/Dictionary";

/**
 * 全局事件管理器
 */
export class EventManager extends Manager{

    private _eventListeners:Dictionary; // key:eventType, value:Array<any>

    public constructor() {
        super();
        this.init()
    }

    protected init():void {
        this._eventListeners = new Dictionary();

    }

    public addGlobalEventListener($eventType:string, $func:Function, $thisObj, $args?:Array<any>):void {
        if (this._eventListeners.get($eventType) == null) {
            this._eventListeners.set($eventType, new Array<any>());
        }
        this._eventListeners.get($eventType).push({type:$eventType, func:$func, thisObj:$thisObj, args:$args}); 
    }

    public removeGlobalEventListener($eventType:string, $func:Function, $thisObj, $args?:Array<any>):void {
        if(this._eventListeners.get($eventType) != null && this._eventListeners.get($eventType).length > 0) {
            for (let i = 0; i < this._eventListeners.get($eventType).length; i++) {  
                let listener:any = this._eventListeners.get($eventType)[i];  
                if (listener.func === $func && listener.thisObj === $thisObj) {  
                    this._eventListeners.get($eventType).splice(i, 1); 
                    break; 
                }  
                
            }
        }
        // var forEachFunc = (listener:any):boolean => {
        //     // if(listener.func === $func && listener.thisObj === $thisObj)
        //     return false;
        // }
        // this._eventListeners.forEach(forEachFunc);  // 箭头函数 不需要this
    }

    public dispatchGlobalEvent($eventType:string, $eventDatas:Array<any>):void {
        if (this._eventListeners.get($eventType) != null && this._eventListeners.get($eventType).length > 0) {
            var listeners:Array<any> = this._eventListeners.get($eventType)
            for (let index = 0; index < listeners.length; index++) {
                let listener:any = listeners[index];
                // listener.applyWith([eventData]);  
                listener.func.apply(listener.thisObj, listener.args != null ? listener.args.concat($eventDatas) : $eventDatas);
            }
        }
    }

    // public update(deltaTime:number):void {
        
    // }

    // public destory(): void {
        
    // }
}