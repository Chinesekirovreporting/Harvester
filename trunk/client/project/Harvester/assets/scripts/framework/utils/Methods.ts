import { ArrayUtil } from "./ArrayUtil";
import { Dictionary } from "./Dictionary";
import { Method } from "./Method";

/**
 * 方法列表
 */
export class Methods {

    private _methodList:Array<Method>;
    private _methodDict:Dictionary;

    public constructor() {
        this._methodList = new Array<Method>();
        this._methodDict = new Dictionary();
    }

    public add(func:Function, thisObj:any, args?:Array<any>):void {
        var method:Method = this._methodDict.get(func, thisObj);
        if (method == null) {
            method = new Method(func, thisObj, args);
            this._methodDict.set(func, method, thisObj);
            this._methodList.push(method);
        } else {
            method.args = args;
        }
    }

    public addMethod(method:Method):void {
        var m:Method = this._methodDict.get(method.func, method.thisObj);
        if (m == null) {
            this._methodDict.set(method.func, method, method.thisObj);
            this._methodList.push(method);
        } else {
            m.args = method.args;
        }
    }

    public addMethods(methods:Methods):void {
        for (var method of methods._methodList) {
            this.addMethod(method);
        }
    }

    public remove(func:Function, thisObj:any):void {
        var method:Method = this._methodDict.get(func, thisObj);
        if (method != null) {
            this._methodDict.remove(func, thisObj);
            ArrayUtil.removeItems(this._methodList, method);;
        }
    }

    public removeMethod(method:Method):void {
        this.remove(method.func, method.thisObj);
    }

    public removeMethods(methods:Methods):void {
       for (var method of methods._methodList) {
            this.removeMethod(method);
        }
    }

    public apply():void {
        var length:number = this._methodList.length;
        for (var i = 0; i < length; i++) {
            this._methodList[i].apply();
        }
    }

    public applyWith(data:Array<any>):void {
        if (data == null) {
            this.apply();
            return;
        }
        var length:number = this._methodList.length;
        for (var i = 0; i < length; i++) {
            this._methodList[i].applyWith(data);
        }
    }

    public clear():void {
        this._methodList.length = 0;
        this._methodDict.clear();
    }

    public clone():Methods {
        var methods:Methods = new Methods();
        for (var method of this._methodList) {
            methods.addMethod(method);
        }
        return methods;
    }

    public isEmpty():boolean {
        return this._methodList.length == 0;
    }

    public contains(func:Function, thisObj:any):boolean {
        return this._methodDict.contain(func, thisObj);
    }

    public containsMethod(method:Method):boolean {
        return this._methodDict.contain(method.func, method.thisObj);
    }

     public get length():number {
        return this._methodList.length;
    }
}