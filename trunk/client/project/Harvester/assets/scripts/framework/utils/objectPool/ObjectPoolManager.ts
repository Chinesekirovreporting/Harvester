import { Dictionary } from "../Dictionary";
import { IntUtil } from "../IntUtil";
import { IObjectPool } from "./IObjectPool";
import { IPooledObject } from "./IPooledObjpect";
import { ObjectPool } from "./ObjectPool";

/**
 * 对象池管理器
 */
export class ObjectPoolManager {

	private static _inst:ObjectPoolManager;

	private _objectPools:Dictionary;

	public constructor() {
		this._objectPools = new Dictionary();
	}

	static get inst():ObjectPoolManager {
		if (this._inst == null) {
			this._inst = new ObjectPoolManager();
		}
		return ObjectPoolManager._inst;
	}

	/**
	 * 注册对象池
	 */
	public registerObjectPool(clazz:any, minimumPoolSize:number = 0, maximumPoolSize:number = IntUtil.MAX_VALUE):IObjectPool {
		var objectPool:IObjectPool = this._objectPools.get(clazz);
		if (objectPool == null) {
			objectPool = new ObjectPool(clazz, minimumPoolSize, maximumPoolSize);
			this._objectPools.set(clazz, objectPool);
		}
		return objectPool;
	}

	/**
	 * 注销对象池
	 */
	public unregisterObjectPool(clazz:any):void {
		this._objectPools.remove(clazz);
	}

	/**
	 * 获取对象池
	 */
	public getObjectPool(clazz:any):IObjectPool {
		return this._objectPools.get(clazz);
	}

	/**
	 * 获取对象
	 */
	public getObject(clazz:any):IPooledObject {
		var objectPool:IObjectPool = this.getObjectPool(clazz);
		if (objectPool == null) {
			objectPool = this.registerObjectPool(clazz);
		}
		return objectPool.getObject();
	}

	/**
	 * 释放对象
	 */
	public releaseObject(pooledObject:IPooledObject):void {
		var clazz:any = pooledObject.constructor;
		var objectPool:IObjectPool = this.getObjectPool(clazz);
		if (objectPool == null) {
			objectPool = this.registerObjectPool(clazz);
		}
		objectPool.releaseObject(pooledObject);
	}
}