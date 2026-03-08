import { sys } from "cc";
import { Manager } from "./Manager";

/** 存储 Key 前缀，便于区分和清理 */
const PREFIX = "";

export class CookieManager extends Manager {
    public constructor() {
        super();
        this.init();
    }

    protected init(): void {
        // 可在此做版本检查、数据迁移等
    }

    /**
     * 获取完整 key（自动加前缀）
     */
    private getFullKey(key: string): string {
        return key.startsWith(PREFIX) ? key : PREFIX + key;
    }

    /**
     * 通用存储 - 支持任意可 JSON 序列化的类型
     */
    public set<T>(key: string, value: T): void {
        const fullKey = this.getFullKey(key);
        const str = typeof value === "string" ? value : JSON.stringify(value);
        sys.localStorage.setItem(fullKey, str);
    }

    /**
     * 通用读取 - 自动反序列化
     * @param defaultValue 不存在时返回的默认值
     */
    public get<T>(key: string, defaultValue?: T): T | null {
        const fullKey = this.getFullKey(key);
        const str = sys.localStorage.getItem(fullKey);
        if (str == null || str === "") {
            return defaultValue == null ? null : defaultValue;
        }
        try {
            return JSON.parse(str) as T;
        } catch {
            return str as unknown as T;
        }
    }

    /**
     * 读取字符串（不解析 JSON）
     */
    public getString(key: string, defaultValue: string = ""): string {
        const fullKey = this.getFullKey(key);
        return sys.localStorage.getItem(fullKey) ?? defaultValue;
    }

    /**
     * 读取数字
     */
    public getNumber(key: string, defaultValue: number = 0): number {
        const val = this.get<number>(key);
        return val != null ? Number(val) : defaultValue;
    }

    /**
     * 读取布尔
     */
    public getBoolean(key: string, defaultValue: boolean = false): boolean {
        const val = this.get<boolean>(key);
        if (val == null) return defaultValue;
        if (typeof val === "boolean") return val;
        if (typeof val === "string") return val === "true" || val === "1";
        return Boolean(val);
    }

    /**
     * 删除指定项
     */
    public remove(key: string): void {
        sys.localStorage.removeItem(this.getFullKey(key));
    }

    /**
     * 检查 key 是否存在
     */
    public has(key: string): boolean {
        return sys.localStorage.getItem(this.getFullKey(key)) != null;
    }

    /**
     * 清空本游戏所有存储（仅清除带前缀的）
     */
    public clearAll(): void {
        const keys: string[] = [];
        const len = sys.localStorage.length;
        for (let i = 0; i < len; i++) {
            const k = sys.localStorage.key(i);
            if (k && k.startsWith(PREFIX)) {
                keys.push(k);
            }
        }
        keys.forEach(k => sys.localStorage.removeItem(k));
    }
}