export interface IManager {
    /**
	 * 更新管理器
	 * @param deltaTime 更新时间
	 */
	update(deltaTime:number):void;

	/**
	 * 销毁管理器
	 */
	destory():void;
}