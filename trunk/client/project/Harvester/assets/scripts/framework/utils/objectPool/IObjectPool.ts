import { IPooledObject } from "./IPooledObjpect";

/**
 * 对象池接口
 */
export interface IObjectPool {

	/**
	 * 对象池数量上限
	 */
	maximumPoolSize:number;

	/**
	 * 对象池数量下限
	 */
	minimumPoolSize:number;

	/**
	 * 对象数量
	 */
	poolSize:number;

	/**
	 * 从对象池中获取对象
	 */
	getObject():IPooledObject;

	/**
	 * 将对象放入对象池
	 */
	releaseObject(pooledObject:IPooledObject);

	/**
	 * 清理对象池
	 */
	clear():void;
}