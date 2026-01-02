/**
 * 字典
 */
export class Dictionary {
    
    private static _uid:number = 0;

    private _keys:Object = {};
    private _values:Object = {};
    private _length:number = 0;

    /**
     * 长度
     */
    public get length():number {
        return this._length;
    }

    /**
     * 是否包含
     */
    public contain(key:any, thisObjOfKey?:any):boolean {
        var uid:string = Dictionary.getUID(key, thisObjOfKey);
        return this._keys.hasOwnProperty(uid);
    }

    /**
     * 获取对象
     */
    public get(key:any, thisObjOfKey?:any):any {
        var uid:string = Dictionary.getUID(key, thisObjOfKey);
        return this._values[uid];
    }

    /**
     * 设置对象
     */
    public set(key:any, value:any, thisObjOfTarget?:any):void {
        var uid:string = Dictionary.getUID(key, thisObjOfTarget);
        if (this._keys[uid] == null) {
            this._values[uid] = value;
            this._length++;
        } else {
            var valueOld:any = this._values[uid];
            if (valueOld != value) {
                if (valueOld.constructor == Dictionary) {
                    (valueOld as Dictionary).clear();
                }
                this._values[uid] = value;
            }
        }
        this._keys[uid] = key;
    }

    /**
     * 移除对象
     */
    public remove(key:any, thisObjOfKey?:any):any {
        var uid:string = Dictionary.getUID(key, thisObjOfKey);
        var value:any = this._values[uid];
        delete this._keys[uid];
        delete this._values[uid];
        if (value != null) {
            this._length--;
        }
        return value;
    }

    /**
     * 清理
     */
    public clear():void {
        // for (var uid in this._content) {
        //     var value:any = this._content[uid];
        //     delete this._content[uid];
        //     if (value.constructor == Dictionary) {
        //         (value as Dictionary).clear();
        //     }
        // }
        for (var uid in this._keys) {
            delete this._keys[uid];
            delete this._values[uid];
        }
        this._length = 0;
    }

    /**
     * 遍历值
     */
    public forEach(callBack:(value:any) => boolean, thisObjOfCallBack?:any):void {
		var uid:string;
		var value:any;
		for (uid in this._values) {
			value = this._values[uid];
			if (!callBack.apply(thisObjOfCallBack, [value])) {
				return;
			}
		}
	}
	
    /**
     * 遍历键
     */
	public for(callBack:(key:string) => boolean, thisObjOfCallBack?:any):void {
		var uid:string;
        var key:any;
		for (uid in this._keys) {
            key = this._keys[uid];
			if (!callBack.apply(thisObjOfCallBack, [key])) {
				return;
			}
		}
	}

    private static getUID(target:any, thisObjOfTarget?:any):string {
        if (target != null) {
            if (target.constructor == String || target.constructor == Number) {
                return target as string;
            }
            if (target["__uid"] == null) {
                Dictionary._uid++;
                target["__uid"] = Dictionary._uid;
            }
            if (thisObjOfTarget != null) {
                if (thisObjOfTarget["__uid"] == null) {
                    Dictionary._uid++;
                    thisObjOfTarget["__uid"] = Dictionary._uid;
                }
                return thisObjOfTarget["__uid"] + "_" + target["__uid"];
            } else {
                return target["__uid"];
            }
        }
        throw new Error("uid生成失败");
    }
}