import { MathUtil } from "./MathUtil";

/**
 * ArrayUtil
 */
export class ArrayUtil {

	/**
	 * 清理
	 */
	public static clear<T>(source:Array<T>):void {
		source.length = 0;
	}

	/**
	 * 查找匹配元素
	 */
	public static find<T>(source:Array<T>, key:string, value:any):T {
		if (source != null) {
			for (var item of source) {
				if (item[key] == value) {
					return item;
				}
			}
		}
		return null;
	}

	/**
	 * 查找匹配元素（多key value）
	 */
	public static find2<T>(source:Array<T>, keys:Array<string>, values:Array<any>):T {
		if (source != null) {
			for (var item of source) {
				var length:number = keys.length;
				for (var i = 0; i < length; i++) {
					if (keys[i] != values[i]) {
						break;
					}
					if (i == length - 1) {
						return item;
					}
				}
			}
		}
		return null;
	}

	/**
	 * 查找匹配元素数组
	 */
	public static findArray<T>(source:Array<T>, key:string, value:any):Array<T> {
		var array:Array<T> = new Array<T>();
		if (source != null) {
			for (var item of source) {
				if (item[key] == value) {
					array.push(item);
				}
			}
		}
		return array;
	}

	/**
	 * 查找匹配元素数组 value）
	 */
	public static findArray2<T>(source:Array<T>, keys:Array<string>, values:Array<any>):Array<T> {
		var array:Array<T> = new Array<T>();
		if (source != null) {
			for (var item of source) {
				var length:number = keys.length;
				for (var i = 0; i < length; i++) {
					if (keys[i] != values[i]) {
						break;
					}
					if (i == length - 1) {
						array.push(item);
					}
				}
			}
		}
		return array;
	}

	/**
	 * 非重复添加项
	 */
	public static addItems<T>(source:Array<T>, ...args:Array<T>):void {
		if (source == null) {
			return;
		}
		for (var item of args) {
			var index:number = source.indexOf(item);
			if (index == -1) {
				source.push(item);
			}
		}
	}

	/**
	 * 非重复添加项
	 */
	public static addArrayItems<T>(source:Array<T>, target:Array<T>):void {
		if (source == null || target == null) {
			return;
		}
		for (var item of target) {
			var index:number = source.indexOf(item);
			if (index == -1) {
				source.push(item);
			}
		}
	}

	/**
	 * 移除存在项
	 */
	public static removeItems<T>(source:Array<T>, ...args:Array<T>):void {
		if (source == null) {
			return;
		}
		for (var item of args) {
			var index:number = source.indexOf(item);
			if (index != -1) {
				source.splice(index, 1);
			}
		}
	}

	/**
	 * 移除存在项
	 */
	public static removeArrayItems<T>(source:Array<T>, target:Array<T>):void {
		if (source == null || target == null) {
			return;
		}
		for (var item of target) {
			var index:number = source.indexOf(item);
			if (index != -1) {
				source.splice(index, 1);
			}
		}
	}

	/**
	 * 连接
	 */
	public static concatItems<T>(source:Array<T>, target:Array<T>):void {
		if (source == null || target == null) {
			return;
		}
		for (var item of target) {
			source.push(item);
		}
	}

	/**
	 * 获取随机元素
	 */
	public static getRandomItem<T>(source:Array<T>):T {
		if (source == null) {
			return null;
		}
		var length:number = source.length;
		if (length == 0) {
			return null;
		}
		var index:number = MathUtil.randomRangeInt(0, length - 1);
		return source[index];
	}

	/**
	 * 随机排序
	 */
	public static shuffle<T>(source:Array<T>):void {
		source.sort((a, b) => {
			var random:number = Math.random() - 0.5;
			return random > 0 ? 1 : -1;
		});
	}

	/**
	 * 数组转换Object
	 */
	public static arrayToObject<T>(source:Array<T>, key:string):Object {
		if (source == null) {
			return null;
		}
		var obj:Object = {};
		for (var item of source) {
			obj[item[key]] = item;
		}
		return obj;
	}

	/**
	 * 排序
	 */
	public static sortOn<T>(source:Array<T>, key:string, desc:boolean = false):void {
		if (!desc) {
			source.sort((a, b) => {
				return a[key] > b[key] ? 1 : -1;
			});
		} else {
			source.sort((a, b) => {
				return a[key] < b[key] ? 1 : -1;
			});
		}
	}
}