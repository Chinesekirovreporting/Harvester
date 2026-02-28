/**
 * 图标路径管理器 - 混合方案
 * 支持两种图标来源：
 * 1. ui:// - FairyGUI 包内资源（直接透传）
 * 2. icon/ - Cocos resources/icon/ 目录下的外部资源
 *
 * 配置表可存储：
 * - 短名：skill_fireball, item_potion_hp, hero_001 -> 自动解析为 icon/类型/名称
 * - 完整路径：icon/skill/skill_fireball -> 直接使用
 * - FairyGUI：ui://pkgId/resId -> 直接使用
 */
export class IconManager {

    /** resources/icon 下的基础路径（不含 resources 前缀，loadRes 用） */
    private static readonly ICON_BASE = "icon";

    /**
     * 将配置表中的图标标识解析为 GLoader 可用的 URL
     * @param iconRef 配置表中的值：短名(skill_xxx)、完整路径(icon/xxx)、或 ui://xxx
     * @returns 可直接赋给 loader.url 的字符串
     */
    public static getIconUrl(iconRef: string): string {
        if (!iconRef || iconRef.trim() === "") {
            return "";
        }
        const trimmed = iconRef.trim();

        // 已是 ui:// 格式，透传（FairyGUI 包内资源）
        if (trimmed.startsWith("ui://")) {
            return trimmed;
        }

        // 已是 icon/ 开头的完整路径，透传
        if (trimmed.startsWith("icon/")) {
            return trimmed;
        }

        // 短名：type_name -> icon/type/type_name
        // 例如 skill_fireball -> icon/skill/skill_fireball
        const underscoreIdx = trimmed.indexOf("_");
        if (underscoreIdx > 0) {
            const type = trimmed.substring(0, underscoreIdx);
            return `${this.ICON_BASE}/${type}/${trimmed}`;
        }

        // 无下划线，默认放入 common
        return `${this.ICON_BASE}/common/${trimmed}`;
    }

    /**
     * 判断 URL 是否为外部 icon 路径（需通过 resources.load 加载）
     */
    public static isExternalIconPath(url: string): boolean {
        return !!url && url.startsWith("icon/") && !url.startsWith("ui://");
    }

    /**
     * 判断 URL 是否为 FairyGUI 内部资源
     */
    public static isFairyGUIPackage(url: string): boolean {
        return !!url && url.startsWith("ui://");
    }
}
