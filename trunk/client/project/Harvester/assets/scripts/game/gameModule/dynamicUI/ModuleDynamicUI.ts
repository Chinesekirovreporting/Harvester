import { GComponent, GObject, RelationType } from "fairygui-cc";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { UICore } from "../../../framework/core/ui/UICore";

/**
 * 动态 UI 模块：在任意 FairyGUI 容器（通常为窗口 view）顶层挂载一层，
 * 用于飘血、临时插入的组件、UI 特效等，与静态布局解耦。
 */
export class ModuleDynamicUI extends AbstractModule {

    private _layerByHost: WeakMap<GComponent, GComponent> = new WeakMap();

    protected init(): void {
        // 无全局资源，随用随建
    }

    protected show(): void {
    }

    protected remove(): void {
        this._layerByHost = new WeakMap();
    }

    /**
     * 获取或创建挂在 host 最上层的动态层（与 host 同宽高，随 host 缩放）
     * @param touchThrough 为 true 时层默认不拦截触摸，便于点到下层战斗按钮
     */
    public getOrCreateLayer(host: GComponent, touchThrough: boolean = true): GComponent {
        if (host == null) {
            return null;
        }
        let layer = this._layerByHost.get(host);
        if (layer != null && !layer.isDisposed) {
            return layer;
        }
        layer = new GComponent();
        layer.name = "DynamicUILayer";
        layer.setSize(host.width, host.height);
        layer.addRelation(host, RelationType.Size);
        layer.touchable = !touchThrough;
        host.addChild(layer);
        this._setLayerOnTop(host, layer);
        this._layerByHost.set(host, layer);
        return layer;
    }

    /** 将动态层移到 host 子节点最前（新加的静态子节点若盖住动态层时可调用） */
    public bringLayerToFront(host: GComponent): void {
        const layer = this._layerByHost.get(host);
        if (layer == null || layer.isDisposed || layer.parent !== host) {
            return;
        }
        this._setLayerOnTop(host, layer);
    }

    /**
     * 从已加载的 FGUI 包创建组件并加入 host 的动态层
     */
    public addFromPackage(host: GComponent, pkgName: string, resName: string, x?: number, y?: number, userClass?: any): GObject {
        if (host == null) {
            return null;
        }
        const obj = UICore.createObject(pkgName, resName, userClass);
        const layer = this.getOrCreateLayer(host);
        if (x !== undefined) {
            obj.x = x;
        }
        if (y !== undefined) {
            obj.y = y;
        }
        layer.addChild(obj);
        return obj;
    }

    /** 将已有 GObject 挂到动态层 */
    public addChild(host: GComponent, child: GObject, x?: number, y?: number): GObject {
        if (host == null || child == null) {
            return child;
        }
        const layer = this.getOrCreateLayer(host);
        if (x !== undefined) {
            child.x = x;
        }
        if (y !== undefined) {
            child.y = y;
        }
        layer.addChild(child);
        return child;
    }

    public removeChild(child: GObject, dispose: boolean = true): void {
        if (child == null || child.parent == null) {
            return;
        }
        child.parent.removeChild(child, dispose);
    }

    /** 清空某 host 下动态层的所有子节点 */
    public clearLayer(host: GComponent, dispose: boolean = true): void {
        const layer = this._layerByHost.get(host);
        if (layer != null && !layer.isDisposed) {
            layer.removeChildren(0, layer.numChildren, dispose);
        }
    }

    /**
     * 移除并销毁动态层（窗口 dispose 前调用，避免与 view 一起泄漏子节点引用）
     */
    public releaseLayer(host: GComponent): void {
        if (host == null) {
            return;
        }
        const layer = this._layerByHost.get(host);
        this._layerByHost.delete(host);
        if (layer != null && !layer.isDisposed) {
            if (layer.parent != null) {
                layer.parent.removeChild(layer, true);
            } else {
                layer.dispose();
            }
        }
    }

    private _setLayerOnTop(host: GComponent, layer: GComponent): void {
        const n = host.numChildren;
        if (n > 0) {
            host.setChildIndex(layer, n - 1);
        }
    }
}
