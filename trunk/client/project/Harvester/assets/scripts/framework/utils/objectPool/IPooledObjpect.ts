/**
 * 池对象接口
 */
export interface IPooledObject {

	/**
	 * 取出
	 */
	onPoolGet():void;

	/**
	 * 重置
	 */
	onPoolReset():void;

	/**
	 * 销毁
	 */
	onPoolDispose():void;
}