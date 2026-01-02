import { ModuleMainUI } from "./mainUI/ModuleMainUI"
import { ModuleWorld } from "./ModuleWorld";
import { ModuleWindow } from "./window/ModuleWindow";

export class GameModules {
    public static readonly MODULE_MAINUI:string = "mainUI";
    public static readonly MODULE_WINDOW:string = "window";
    public static readonly MODULE_WORLD:string = "world";

    public static mainUI:ModuleMainUI;
    public static window:ModuleWindow;
    public static world:ModuleWorld;
    
    // 初始化基础模块（底层模块）
    public static InitBaseModules() {
        // GameModules.window = new ModuleWindow
        GameModules.mainUI = new ModuleMainUI(GameModules.MODULE_MAINUI); // 主UI部分 UICore在此处初始化 
        GameModules.window = new ModuleWindow(GameModules.MODULE_WINDOW); // 窗口部分 
        GameModules.world = new ModuleWorld(GameModules.MODULE_WORLD); 
    }
    
    // 初始化游戏模块(游戏内容)
    public static InitGameModules() {
        
    }
}