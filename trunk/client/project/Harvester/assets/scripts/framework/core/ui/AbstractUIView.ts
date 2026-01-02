import { GComponent } from "fairygui-cc";
import { IUIView } from "./IUIView";
import { ObjectUtil } from "../../utils/ObjectUtil";

/**
 * UIView抽象类
 */
export class AbstractUIView implements IUIView {
    protected _view:GComponent;

	public constructor(view:GComponent = null) {
		this._view = view;
		this.init();
	}

	public get view():GComponent {
		return this._view;
	}

	public init():void {
		this.onInit();
	}

	public show():void {
		this.onShow();
	}

	public close():void {
		this.onClose();
	}

	public dispose():void {
		this.onDispose();

		// 销毁视图
		if (this._view != null) {
			this._view.dispose();
			this._view = null;
		}

		ObjectUtil.clear(this);
	}

	protected onInit():void {

	}

	protected onShow():void {
		
	}

	protected onClose():void {

	}

	protected onDispose():void {

	}
}