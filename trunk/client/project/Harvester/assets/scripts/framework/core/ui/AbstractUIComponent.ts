import { GComponent, GObject } from "fairygui-cc";
import { ObjectUtil } from "../../utils/ObjectUtil";

/**
 * 复杂界面中的子模块抽象：绑定某一 GComponent 根节点，承载局部逻辑与生命周期。
 * 与 AbstractUIView 的区别：默认不在 dispose 时销毁 FairyGUI 节点（由父窗口/父容器托管层级）。
 * 子类在 onDispose 中解除监听、清理定时器等即可。
 */
export class AbstractUIComponent {

	protected _view: GComponent;
	/** 为 true 时 dispose 会调用 this._view.dispose()（例如动态创建的独立组件包） */
	protected _disposeViewOnDispose: boolean = false;

	protected _isInited: boolean = false;
	protected _isDisposed: boolean = false;

	public constructor(view: GComponent) {
		this._view = view;
		this.init();
	}

	public get view(): GComponent {
		return this._view;
	}

	public get isDisposed(): boolean {
		return this._isDisposed;
	}

	public init(): void {
		if (this._isInited) {
			return;
		}
		this.onInit();
		this._isInited = true;
	}

	public show(): void {
		this.onShow();
	}

	public close(): void {
		this.onClose();
	}

	public dispose(): void {
		if (this._isDisposed) {
			return;
		}
		this.onDispose();
		if (this._disposeViewOnDispose && this._view != null) {
			this._view.dispose();
			this._view = null;
		}
		ObjectUtil.clear(this);
		this._isDisposed = true;
	}

	/**
	 * 从本模块根节点取子对象（等价 this.view.getChild）
	 */
	protected getChild(name: string): GObject {
		return this._view != null ? this._view.getChild(name) : null;
	}

	protected onInit(): void {

	}

	protected onShow(): void {

	}

	protected onClose(): void {

	}

	protected onDispose(): void {

	}
}
