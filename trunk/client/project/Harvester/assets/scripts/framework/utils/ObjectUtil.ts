/**
 * ObjectUtil
 */
export class ObjectUtil {

	/**
	 * 是否为空
	 */
	public static isEmpty(source:Object):boolean {
		for (var key in source) {
			return true;
		}
		return false;
	}

	/**
	 * 清理
	 */
	public static clear(source:Object):void {
		for (var key in source) {
			delete source[key];
		}
	}

	/**
	 * 获取属性数量
	 */
	public static count(source:Object):number {
		var num:number = 0;
		for (var key in source) {
			num++;
		}
		return num;
	}

	/**
	 * 浅拷贝
	 */
	public static clone(source:Object):Object {
		var obj:Object = {};
		for (var key in source) {
			obj[key] = source[key];
		}
		return obj;
	}

	/**
	 * 合并
	 */
	public static merge(source:Object, target:Object) {
		if (source == null || target == null) {
			return;
		}
		for (var key in target) {
			source[key] = target[key];
		}
	}

	/**
	 * 填充
	 */
	public static fill(source:Object, target:Object) {
		if (source == null || target == null) {
			return;
		}
		for (var key in target) {
			if (source.hasOwnProperty(key)) {
				source[key] = target[key];
			}
		}
	}

	/**
	 * Object转换数组
	 */
	public static objectToArray<T>(source:Object):Array<T> {
		if (source == null) {
			return null;
		}
		var array:Array<T> = new Array<T>();
		for (var key in source) {
			var item:T = source[key] as T;
			if (item != null) {
				array.push(item);
			}
		}
		return array;
	}
}