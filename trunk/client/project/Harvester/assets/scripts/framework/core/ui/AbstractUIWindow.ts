import { GComponent, GObject, GRoot } from "fairygui-cc";
import { IUIWindow } from "./IUIWindow";
import { Method } from "../../utils/Method";
import { IUIWindowSubView } from "./IUIWindowSubView";
import { ArrayUtil } from "../../utils/ArrayUtil";
import { App } from "../../managers/App";
import { UICore } from "./UICore";
// import { Tween } from "cc"; // 暂时不使用，改用自定义动画实现
import { ObjectUtil } from "../../utils/ObjectUtil";
import { GameModules } from "../../../game/gameModule/GameModules";
import { UIPackage } from "fairygui-cc";
import { IntUtil } from "../../utils/IntUtil";

/**
 * UIWindow抽象类
 */
export class AbstractUIWindow implements IUIWindow {
	
	protected _view:GComponent;
	protected _modal:boolean = false;						// 是否模态
	protected _touchClose:boolean = false;					// 是否触摸关闭
	protected _isLoaded:boolean = false;					// 是否已加载
	protected _isInited:boolean = false;					// 是否已初始化
	protected _isShow:boolean = false;						// 是否显示
	protected _isShowCenter:boolean = true;					// 是否居中显示	
	protected _windowData:any;								// 窗体数据
	protected _needShowAction:boolean = false;				// 是否需要显示动画	
	protected _autoDispose:boolean = true;					// 是否自动销毁
	protected _autoDisposeTime:number = IntUtil.MAX_VALUE;	//默认5000ms 改为永不销毁，永远不销毁
	protected _lastCloseTime:number;
	protected _resList:Array<string>;
	protected _loadResCallback:Method;

	protected _contentArea:GComponent;
	
	// 子视图列表
	protected _subViewList:Array<IUIWindowSubView>;
	
	// 模态遮罩层
	protected _modalLayer:GComponent;
	
	// 显示/关闭动画的Tween（使用any类型，因为不同版本的Tween API可能不同）
	protected _showTween:any;
	protected _closeTween:any;
	
	// 自动销毁定时器
	protected _autoDisposeTimer:number;

	public constructor() {
		this._resList = this.getResList();
		this._subViewList = [];
		this._lastCloseTime = NaN;
	}

	/**
     * 视图
     */
	public get view():GComponent {
		return this._view;
	}

	/**
     * 是否模态
     */
	public get modal():boolean {
		return this._modal;
	}

	public set modal(value:boolean) {
		this._modal = value;
	}

	/**
     * 是否触摸关闭
     */
	public get touchClose():boolean {
		return this._touchClose;
	}

	public set touchClose(value:boolean) {
		this._touchClose = value;
	}

    /**
     * 是否已加载
     */
	public get isLoaded():boolean {
		return this._isLoaded;
	}

	public set isLoaded(value:boolean) {
		this._isLoaded = value;
	}

    /**
     * 是否已初始化
     */
	public get isInited():boolean {
		return this._isInited;
	}

	public set isInited(value:boolean) {
		this._isInited = value;
	}

    /**
     * 是否已显示
     */
	public get isShow():boolean {
		return this._isShow;
	}

	public set isShow(value:boolean) {
		this._isShow = value;
	}

	/**
     * 是否居中显示
     */
	public get isShowCenter():boolean {
		return this._isShowCenter;
	}

	public set isShowCenter(value:boolean) {
		this._isShowCenter = value;
	}

    /**
     * 窗体数据
     */
	public get windowData():any {
		return this._windowData;
	}

	public set windowData(value:any) {
		this._windowData = value;
	}

    /**
     * 是否显示动画
     */
	public get needShowAction():boolean {
		return this._needShowAction;
	}

	public set needShowAction(value:boolean) {
		this._needShowAction = value;
	}

	/**
     * 是否自动销毁
     */
	public get autoDispose():boolean {
		return this._autoDispose;
	}

	public set autoDispose(value:boolean) {
		this._autoDispose = value;
	}

	/**
     * 自动销毁时间
     */
	public get autoDisposeTime():number {
		return this._autoDisposeTime;
	}

	public set autoDisposeTime(value:number) {
		this._autoDisposeTime = value;
	}

	/**
     * 最后一次显示时间
     */
	public get lastCloseTime():number {
		return this._lastCloseTime;
	}

	public set lastCloseTime(value:number) {
		this._lastCloseTime = value;
	}

	/**
	 * 资源列表
	 */
	public get resList():Array<string> {
		return this._resList;
	}

	/**
	 * 全资源列表（包括子界面）
	 */
	public getAllResList():Array<string> {
		var list:Array<string> = this._resList.concat();
		// 添加子视图的资源列表
		if (this._subViewList != null) {
			for (var subView of this._subViewList) {
				if (subView.resList != null) {
					list = list.concat(subView.resList);
				}
			}
		}
		return list;
	}

	/**
     * 判断是否加载
     */
    public getLoaded():boolean {
		if (this._resList == null || this._resList.length == 0) {
			return true;
		}
		if (this._isLoaded == false && UICore.hasPackageList(this._resList) == true) {
			this._isLoaded = true;
		}
		return this._isLoaded;
	}

	/**
	 * 加载资源
	 */
	public loadRes(callback?:Method):void {
		this._loadResCallback = callback;
		
		if (this._resList == null || this._resList.length == 0) {
			this._isLoaded = true;
			if (this._loadResCallback != null) {
				this._loadResCallback.apply();
			}
			return;
		}
		
		// 获取所有需要加载的资源（包括子视图）
		var allResList:Array<string> = this.getAllResList();
		if (allResList.length == 0) {
			this._isLoaded = true;
			if (this._loadResCallback != null) {
				this._loadResCallback.apply();
			}
			return;
		}
		
		// 加载资源包
		this._loadResPackages(allResList, 0);
	}

	/**
	 * 递归加载资源包
	 */
	private _loadResPackages(resList:Array<string>, index:number):void {
		if (index >= resList.length) {
			// 所有资源加载完成
			this._isLoaded = true;
			if (this._loadResCallback != null) {
				this._loadResCallback.apply();
			}
			return;
		}
		
		var resPath:string = resList[index];
		UICore.loadPackage(resPath, (err:any, pkg:UIPackage) => {
			if (err) {
				App.logManager.info("加载资源包失败: " + resPath + ", 错误: " + err);
				console.error("加载资源包失败: " + resPath, err);
			}
			// 继续加载下一个资源
			this._loadResPackages(resList, index + 1);
		});
	}

    /**
     * 初始化
     */
    public init():void {
		this.onInit();

		if (this._view == null) {
            console.log("A Window view is null")
			// App.logManager.error("Window view is null:" + egret.getQualifiedClassName(this));
		} else {
			this.onInitView();
		}
		this._isInited = true;
	}

	/**
	 * 初始化视图
	 */
	protected onInitView():void {
		// 内容区域 
		this._contentArea = this._view.getChild("contentArea") as GComponent;
		
		// 初始化子视图
		this.initSubViews();
	}

	/**
	 * 初始化子视图
	 */
	protected initSubViews():void {
		// 子类可重写此方法来初始化子视图
	}

	/**
	 * 获取组件
	 */
	protected getChildComp(name:string):GObject {
		var comp:GObject;
		if (this._view != null) {
			comp = this._view.getChild(name);
			if (comp == null) {
				if (this._contentArea != null) {
					comp = this._contentArea.getChild(name);
				}
			}
		}
		return comp;
	}

    /**
     * 显示
     */
    public show(modal:boolean, x?:number, y?:number, touchClose?:boolean, args?:Array<any>):void {
		if (this._view == null) {
			App.logManager.info("窗口视图为空，无法显示: " + this.constructor.name);
			console.error("窗口视图为空，无法显示: " + this.constructor.name);
			return;
		}
		
		this._modal = modal;
		if (touchClose != undefined) {
			this._touchClose = touchClose;
		}
		this._lastCloseTime = NaN;
		
		// 显示到根容器
		GameModules.window.showWindow(this, x, y);
		
		// 设置位置
		this._setWindowPosition(x, y);
		
		// 创建模态遮罩
		if (this._modal) {
			this._createModalLayer();
		}
		
		// 设置触摸关闭
		if (this._touchClose && this._modalLayer != null) {
			this._modalLayer.onClick(this._onModalClick, this);
		}
		
		// 显示子视图
		this._showSubViews(args);
		
		// 标记为显示状态
		this._isShow = true;
		
		// 执行显示动画
		if (this._needShowAction) {
			this._playShowAction(() => {
				this.onShow.apply(this, args);
			});
		} else {
			this.onShow.apply(this, args);
		}
		
		// 取消自动销毁
		this._cancelAutoDispose();
	}

	/**
	 * 设置窗口位置
	 */
	private _setWindowPosition(x?:number, y?:number):void {
		if (this._view == null) {
			return;
		}
		
		if (x != undefined && y != undefined) {
			this._view.x = x;
			this._view.y = y;
		} else if (this._isShowCenter) {
			// 居中显示
			var root:GRoot = UICore.root;
			this._view.x = (root.width - this._view.width) / 2;
			this._view.y = (root.height - this._view.height) / 2;
		}
	}

	/**
	 * 创建模态遮罩层
	 */
	private _createModalLayer():void {
		if (this._modalLayer != null) {
			return;
		}
		
		var root:GRoot = UICore.root;
		this._modalLayer = new GComponent();
		this._modalLayer.setSize(root.width, root.height);
		
		// 创建半透明黑色背景
		// 注意：这里简化实现，使用GComponent作为遮罩层
		// 实际项目中可以通过UICore创建专门的图形组件
		// 设置遮罩层的颜色和透明度
		if (this._modalLayer["color"] != undefined) {
			this._modalLayer["color"] = 0x000000;
		}
		if (this._modalLayer["alpha"] != undefined) {
			this._modalLayer["alpha"] = 0.5;
		}
		
		// 将遮罩层添加到窗口下方
		var windowIndex:number = UICore.root.getChildIndex(this._view);
		if (windowIndex >= 0) {
			UICore.root.addChildAt(this._modalLayer, windowIndex);
		} else {
			UICore.root.addChild(this._modalLayer);
		}
	}

	/**
	 * 模态层点击事件
	 */
	private _onModalClick():void {
		if (this._touchClose) {
			this.close();
		}
	}

	/**
	 * 播放显示动画
	 */
	private _playShowAction(callback?:Function):void {
		if (this._view == null) {
			if (callback) {
				callback();
			}
			return;
		}
		
		// 停止之前的动画
		if (this._showTween != null) {
			this._showTween.stop();
		}
		
		// 设置初始状态（缩放为0，透明度为0）
		this._view.scaleX = 0;
		this._view.scaleY = 0;
		this._view.alpha = 0;
		
		// 创建动画（使用Cocos Creator的Tween系统）
		// 注意：这里需要根据实际的Tween API调整
		try {
			// 尝试使用tween函数（Cocos Creator 3.x）
			var tweenTarget:any = this._view;
			if (tweenTarget.node) {
				tweenTarget = tweenTarget.node;
			}
			
			// 使用简化的动画实现
			var startTime:number = Date.now();
			var duration:number = 300;
			var startScaleX:number = 0;
			var startScaleY:number = 0;
			var startAlpha:number = 0;
			var targetScaleX:number = 1;
			var targetScaleY:number = 1;
			var targetAlpha:number = 1;
			
			var animate = () => {
				var elapsed:number = Date.now() - startTime;
				var progress:number = Math.min(elapsed / duration, 1);
				
				// 使用缓动函数（backOut）
				var backOut = (t:number):number => {
					var c1 = 1.70158;
					var c3 = c1 + 1;
					return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
				};
				
				var easedProgress:number = backOut(progress);
				
				this._view.scaleX = startScaleX + (targetScaleX - startScaleX) * easedProgress;
				this._view.scaleY = startScaleY + (targetScaleY - startScaleY) * easedProgress;
				this._view.alpha = startAlpha + (targetAlpha - startAlpha) * easedProgress;
				
				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					if (callback) {
						callback();
					}
				}
			};
			
			requestAnimationFrame(animate);
		} catch (e) {
			// 如果动画失败，直接设置最终状态
			this._view.scaleX = 1;
			this._view.scaleY = 1;
			this._view.alpha = 1;
			if (callback) {
				callback();
			}
		}
	}

	/**
	 * 显示子视图
	 */
	private _showSubViews(args?:Array<any>):void {
		if (this._subViewList == null) {
			return;
		}
		
		for (var subView of this._subViewList) {
			if (subView != null && subView.isLoaded) {
				subView.show(args);
			}
		}
	}

    /**
     * 关闭
     */
    public close(closeType?:string):void {
		if (!this._isShow) {
			return;
		}
		
		// 标记为关闭状态
		this._isShow = false;
		this._lastCloseTime = App.timerManager.currentTime;
		
		// 关闭子视图
		this._closeSubViews();
		
		// 播放关闭动画
		if (this._needShowAction) {
			this._playCloseAction(() => {
				this._doClose(closeType);
			});
		} else {
			this._doClose(closeType);
		}
	}

	/**
	 * 执行关闭操作
	 */
	private _doClose(closeType?:string):void {
		// 移除模态遮罩
		this._removeModalLayer();
		
		// 从根容器移除
		GameModules.window.closeWindow(this);
		
		// 调用关闭回调
		this.onClose(closeType);
		
		// 启动自动销毁定时器
		if (this._autoDispose) {
			this._startAutoDispose();
		}
	}

	/**
	 * 播放关闭动画
	 */
	private _playCloseAction(callback?:Function):void {
		if (this._view == null) {
			if (callback) {
				callback();
			}
			return;
		}
		
		// 停止之前的动画
		if (this._closeTween != null) {
			this._closeTween.stop();
		}
		
		// 创建关闭动画（使用简化的实现）
		try {
			var startTime:number = Date.now();
			var duration:number = 200;
			var startScaleX:number = this._view.scaleX;
			var startScaleY:number = this._view.scaleY;
			var startAlpha:number = this._view.alpha;
			var targetScaleX:number = 0;
			var targetScaleY:number = 0;
			var targetAlpha:number = 0;
			
			var animate = () => {
				var elapsed:number = Date.now() - startTime;
				var progress:number = Math.min(elapsed / duration, 1);
				
				// 使用缓动函数（backIn）
				var backIn = (t:number):number => {
					var c1 = 1.70158;
					var c3 = c1 + 1;
					return c3 * t * t * t - c1 * t * t;
				};
				
				var easedProgress:number = backIn(progress);
				
				this._view.scaleX = startScaleX + (targetScaleX - startScaleX) * easedProgress;
				this._view.scaleY = startScaleY + (targetScaleY - startScaleY) * easedProgress;
				this._view.alpha = startAlpha + (targetAlpha - startAlpha) * easedProgress;
				
				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					if (callback) {
						callback();
					}
				}
			};
			
			requestAnimationFrame(animate);
		} catch (e) {
			// 如果动画失败，直接设置最终状态
			this._view.scaleX = 0;
			this._view.scaleY = 0;
			this._view.alpha = 0;
			if (callback) {
				callback();
			}
		}
	}

	/**
	 * 移除模态遮罩层
	 */
	private _removeModalLayer():void {
		if (this._modalLayer != null) {
			if (this._touchClose) {
				this._modalLayer.offClick(this._onModalClick, this);
			}
			UICore.root.removeChild(this._modalLayer);
			this._modalLayer.dispose();
			this._modalLayer = null;
		}
	}

	/**
	 * 关闭子视图
	 */
	private _closeSubViews():void {
		if (this._subViewList == null) {
			return;
		}
		
		for (var subView of this._subViewList) {
			if (subView != null) {
				subView.close();
			}
		}
	}

	/**
	 * 启动自动销毁定时器
	 */
	private _startAutoDispose():void {
		this._cancelAutoDispose();
		
		this._autoDisposeTimer = setTimeout(() => {
			if (this._autoDispose && !this._isShow) {
				this.dispose();
			}
		}, this._autoDisposeTime);
	}

	/**
	 * 取消自动销毁定时器
	 */
	private _cancelAutoDispose():void {
		if (this._autoDisposeTimer != null) {
			clearTimeout(this._autoDisposeTimer);
			this._autoDisposeTimer = null;
		}
	}

    /**
     * 销毁
     */
    public dispose():void {
		// 取消自动销毁定时器
		this._cancelAutoDispose();
		
		// 停止动画
		if (this._showTween != null) {
			this._showTween.stop();
			this._showTween = null;
		}
		if (this._closeTween != null) {
			this._closeTween.stop();
			this._closeTween = null;
		}
		
		// 移除模态遮罩
		this._removeModalLayer();
		
		// 销毁子视图
		this._disposeSubViews();

		// 释放动态 UI 层（飘血、临时 GObject 等），需在 _view.dispose 之前
		if (this._view != null && GameModules.dynamicUI != null) {
			GameModules.dynamicUI.releaseLayer(this._view);
		}
		
		// 调用销毁回调
		this.onDispose();

		// 清理视图
		this._contentArea = null;
		if (this._view != null) {
			// 如果还在显示，先关闭
			if (this._isShow) {
				UICore.root.removeChild(this._view);
			}
			this._view.dispose();
			this._view = null;
		}
		
		// 清理资源
		this._resList = null;
		this._loadResCallback = null;
		this._subViewList = null;

		App.logManager.info("销毁窗体：" + this.constructor.name);
		ObjectUtil.clear(this);
	}

	/**
	 * 销毁子视图
	 */
	private _disposeSubViews():void {
		if (this._subViewList == null) {
			return;
		}
		
		for (var subView of this._subViewList) {
			if (subView != null) {
				subView.dispose();
			}
		}
		this._subViewList = [];
	}

	protected onInit():void {

	}

	protected onShow(...args:Array<any>):void {
		
	}

	protected onClose(closeType?:string):void {
		
	}

	protected onDispose():void {
		
	}

	/**
	 * 资源列表
	 */
	protected getResList():Array<string> {
		return [];
	}

	/**
	 * 添加子视图
	 */
	protected addSubView(subView:IUIWindowSubView):void {
		if (subView == null) {
			return;
		}
		
		if (this._subViewList == null) {
			this._subViewList = [];
		}
		
		if (this._subViewList.indexOf(subView) == -1) {
			this._subViewList.push(subView);
		}
	}

	/**
	 * 移除子视图
	 */
	protected removeSubView(subView:IUIWindowSubView):void {
		if (subView == null || this._subViewList == null) {
			return;
		}
		
		var index:number = this._subViewList.indexOf(subView);
		if (index != -1) {
			this._subViewList.splice(index, 1);
		}
	}

	/**
	 * 获取子视图
	 */
	protected getSubView(index:number):IUIWindowSubView {
		if (this._subViewList == null || index < 0 || index >= this._subViewList.length) {
			return null;
		}
		return this._subViewList[index];
	}

	/**
	 * 获取子视图数量
	 */
	protected getSubViewCount():number {
		return this._subViewList != null ? this._subViewList.length : 0;
	}

	/**
	 * 本窗口顶层动态 UI 容器，用于飘血、运行时插入的组件或 UI 特效等
	 */
	protected getDynamicLayer():GComponent {
		if (this._view == null || GameModules.dynamicUI == null) {
			return null;
		}
		return GameModules.dynamicUI.getOrCreateLayer(this._view);
	}

}