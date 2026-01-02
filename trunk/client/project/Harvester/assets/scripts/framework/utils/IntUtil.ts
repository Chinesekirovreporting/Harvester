/**
 * IntUtil
 */
export class IntUtil {

	public static readonly MIN_VALUE:number = -2147483648;
	public static readonly MAX_VALUE:number = 2147483647;

	private static _counter:number = IntUtil.MIN_VALUE;

	/**
	 * 创建唯一数字
	 */
	public static createUniqueInt():number {
		return ++IntUtil._counter;
	}
}
