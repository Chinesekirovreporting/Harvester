export class GameRes {
    // 道具Icon
    public static ICON_PATH;  
    // 技能Icon
    public static SKILL_ICON_PATH;
    // ui资源
    public static UI_ICON_PATH;
    public static init():void {
        // resource目录路径
        this.ICON_PATH = "image/icon/";
        this.SKILL_ICON_PATH = "image/skill/";
        //  http目录路径
        // fairyGUI资源获取 url: UIPackage.getItemByURL(url) 返回：UIPackageItem
        // fairyGUI目录路径 ui://pkgId/resId 例如：ui://Main/MainUI 
        this.UI_ICON_PATH = "ui://Icon/icon1";
    }
}