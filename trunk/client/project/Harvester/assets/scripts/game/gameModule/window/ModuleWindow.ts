import { GComponent } from "fairygui-cc";
import { IUIWindow } from "../../../framework/core/ui/IUIWindow";
import { UICore } from "../../../framework/core/ui/UICore";
import { App } from "../../../framework/managers/App";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { ArrayUtil } from "../../../framework/utils/ArrayUtil";
import { Method } from "../../../framework/utils/Method";
import { GameModules } from "../GameModules";
import { WindowStory } from "./windows/Gushi/WindowStory";
import { WindowTip } from "./windows/tip/WindowTip";
import { WindowFightCore } from "./windows/Fight/WindowFightCore";
import { WindowHeroBook } from "./windows/HeroBook/WindowHeroBook";
import { WindowAchieve } from "./windows/Achieve/WindowAchieve";
import { WindowSkillBook } from "./windows/SkillBook/WindowSkillBook";
import { WindowRogue } from "./windows/Rogue/WindowRogue";
import { WindowChallenge } from "./windows/Challenge/WindowChallenge";
import { WindowTravel } from "./windows/Travel/WindowTravel";
import { WindowStepTree } from "./windows/StepTree/WindowStepTree";
import { WindowItemBook } from "./windows/ItemBook/WindowItemBook";
import { WindowItemBag } from "./windows/ItemBag/WindowItemBag";
import { WindowEquip } from "./windows/Equip/WindowEquip";
import { WindowTalent } from "./windows/Talent/WindowTalent";
import { WindowHero } from "./windows/Hero/WindowHero";
import { WindowSkillStone } from "./windows/SkillStone/WindowSkillStone";
import { WindowBattleReward } from "./windows/BattleReward/WindowBattleReward";

export class ModuleWindow extends AbstractModule{
	public static readonly SHOW_WINDOW:string = "ShowWindow";
	public static readonly CLOSE_WINDOW:string = "CloseWindow";

	private _windowClassDict:Object;            // 窗口注册表
	private _windowDict:Object;                 // 窗口缓存表，只有缓存窗口存在列表中
	private _windowOpenList:Array<IUIWindow>;   // 所有开启窗口列表
	private _windowCloseList:Array<IUIWindow>;  // 所有关闭窗口列表
    
    protected init():void {
		console.log("初始化ModuleWindow")
		this._windowClassDict = {};
		this._windowDict = {};
		this._windowOpenList = new Array<IUIWindow>();
		this._windowCloseList = new Array<IUIWindow>();

        // 绑定窗体
        this._windowClassDict["WindowStory"] = WindowStory;
		this._windowClassDict["WindowRogue"] = WindowRogue;
		this._windowClassDict["WindowChallenge"] = WindowChallenge;
		this._windowClassDict["WindowTravel"] = WindowTravel;
        this._windowClassDict["WindowTip"] = WindowTip;
		this._windowClassDict["WindowFightCore"] = WindowFightCore;
        this._windowClassDict["WindowHeroBook"] = WindowHeroBook;
        this._windowClassDict["WindowHero"] = WindowHero;
		this._windowClassDict["WindowAchieve"] = WindowAchieve;
		this._windowClassDict["WindowSkillBook"] = WindowSkillBook;
		this._windowClassDict["WindowSkillStone"] = WindowSkillStone;
		this._windowClassDict["WindowStepTree"] = WindowStepTree;
		this._windowClassDict["WindowItemBook"] = WindowItemBook;
		this._windowClassDict["WindowItemBag"] = WindowItemBag;
		this._windowClassDict["WindowEquip"] = WindowEquip;
		this._windowClassDict["WindowTalent"] = WindowTalent;
		this._windowClassDict["WindowEquip"] = WindowEquip;
		this._windowClassDict["WindowBattleReward"] = WindowBattleReward;
    }

    protected show():void {

    }

    protected remove():void {
		
    }
    
	/**
	 * 根据类对象显示窗体
	 */
	public showWindowByName(name:string, modal?:boolean, closeOthers?:boolean, closeWhenOpend?:boolean, touchClose?:boolean, x?:number, y?:number, args?:Array<any>):IUIWindow {
		modal = modal || false;
		closeOthers = closeOthers || false;
		closeWhenOpend = closeWhenOpend || false;
		touchClose = touchClose || false;
		var window:IUIWindow = this._windowDict[name];
        // 判断缓存中是否存在，若没有则添加(初始化注册中不添加，在第一次打开时添加)
		if (window == null) {
			var windowClass:any = this._windowClassDict[name];
			if (windowClass == null) {
				App.logManager.info("ShowWindowByName:Can not find window class:" + name);
				return null;
			}
			console.log("注册成功");
			window = new windowClass();
			this._windowDict[name] = window;
		}
		
		window.loadRes(new Method(() => {
			this.__showWindow(window, modal, closeOthers, closeWhenOpend, touchClose, x, y, args);
		}, this));
		return window;
	}

	/**
	 * 显示窗体
	 */
	private __showWindow(window:IUIWindow, modal:boolean, closeOthers:boolean, closeWhenOpend:boolean, touchClose:boolean, x:number, y:number, args:Array<any>):void {
		if (!window.isInited) {
			window.init();
		}
		if (closeWhenOpend && window.isShow) {
			window.close();
		} else {
			if (closeOthers) {
				this.closeAllWindows();
			}
			window.show(modal, x, y, touchClose, args);
		}
	}

    /**
	 * 关闭所有窗体
	 */
	public closeAllWindows():void {
		var windowList:Array<IUIWindow> = this._windowOpenList.concat();
		for (var window of windowList) {
			// var windowCFG:WindowCFG = window.windowData; 这里窗口暂时不使用表格注册
			// if (windowCFG == null || windowCFG.CanCloseAll) {
				window.close();
			// }
		}
	}

	public reset():void {
		
	}

	/**
	 * 显示窗体
	 * @param window 
	 * @param x 
	 * @param y 
	 */
	public showWindow( window:IUIWindow, x?:number, y?:number ):void {
		var view:GComponent = window.view; 
		UICore.root.addChild(view);
	}

	public closeWindow( window:IUIWindow, x?:number, y?:number ):void {
		var view:GComponent = window.view; 
		UICore.root.removeChild(view);
	}

}