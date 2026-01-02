import { IntUtil } from "../IntUtil";
import { IObjectPool } from "./IObjectPool.js";
import { IPooledObject } from "./IPooledObjpect.js";

/**
 * 对象池
 */
export class ObjectPool implements IObjectPool {

	private _clazz:{ new():IPooledObject };
	private _maximumPoolSize:number;
	private _minimumPoolSize:number;
	private _poolSize:number;
	private _pooledObjects:Array<IPooledObject>;

	public constructor(clazz:{ new():IPooledObject }, minimumPoolSize:number = 0, maximumPoolSize:number = IntUtil.MAX_VALUE) {
		this._clazz = clazz;
		this._minimumPoolSize = minimumPoolSize;
		this._maximumPoolSize = maximumPoolSize;

		this._pooledObjects = new Array<IPooledObject>();
		
	}

	/**
	 * 对象池数量下限
	 */
	public get minimumPoolSize():number {
		return this._minimumPoolSize;
	}

	public set minimumPoolSize(value:number) {
		this._minimumPoolSize = value;
		this.adjustMinimumPoolSize();
	}

	/**
	 * 对象池数量上
	 */
	public get maximumPoolSize():number {
		return this._maximumPoolSize;
	}

	public set maximumPoolSize(value:number) {
		this._maximumPoolSize = value;
		this.adjustMaximumPoolSize();
	}

	/**
	 * 当前对象数量
	 */
	public get poolSize():number {
		return this._poolSize;
	}

	/**
	 * 从对象池中获取对象
	 */
	public getObject():IPooledObject {
		var pooledObject:IPooledObject = this.dequeue();
		pooledObject.onPoolGet();
		return pooledObject;
	}

	/**
	 * 将对象放入对象池
	 */
	public releaseObject(pooledObject:IPooledObject):void {
		if (this._pooledObjects.length == this._maximumPoolSize) {
			this.destoryPooledObject(pooledObject);
		} else {
			this.enqueue(pooledObject);
			pooledObject.onPoolReset();
		}
	}

	/**
	 * 清理
	 */
	public clear():void {
		for (var pooledObject of this._pooledObjects) {
			this.destoryPooledObject(pooledObject);
		}
		this._pooledObjects.length = 0;
		this._poolSize = 0;
		this.adjustMinimumPoolSize();
	}

	/**
	 * 销毁对象
	 */
	private destoryPooledObject(pooledObject:IPooledObject):void {
		pooledObject.onPoolDispose();
	}

	/**
	 * 调整对象池数量下限
	 */
	private adjustMinimumPoolSize():void {
		while (this._poolSize < this._minimumPoolSize && this._pooledObjects.length < this._maximumPoolSize) {
			this.enqueue(this.createObject());
		}
	}

	/**
	 * 调整对象池数量上限
	 */
	private adjustMaximumPoolSize():void {
		while (this._poolSize > this._maximumPoolSize && this._pooledObjects.length > this._maximumPoolSize) {
			this.destoryPooledObject(this.dequeue());
		}
	}

	/**
	 * 对象出队
	 */
	private dequeue():IPooledObject {
		if (this._pooledObjects.length == 0) {
			return this.createObject();
		}

		var pooledObject:IPooledObject = this._pooledObjects.pop();
		this._poolSize--;

		if (this._poolSize < this._minimumPoolSize) {
			this.enqueue(this.createObject());
		}

		return pooledObject;
	}
	
	/**
	 * 对象入队
	 */
	private enqueue(pooledObject:IPooledObject):void {
		if (this._pooledObjects.length == this._maximumPoolSize) {
			return;
		}

		this._pooledObjects.push(pooledObject);
		this._poolSize++;
	}

	/**
	 * 创建新对象
	 */
	private createObject():IPooledObject {
		return new this._clazz();
	}
}