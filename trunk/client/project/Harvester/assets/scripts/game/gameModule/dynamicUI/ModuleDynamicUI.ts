import { GComponent, GObject, RelationType } from "fairygui-cc";
import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { UICore } from "../../../framework/core/ui/UICore";

/**
 * 动态 UI 模块（运作方式）：
 * - 在任意 FairyGUI 容器 **host**（通常为窗口的 view / 根 GComponent）**子节点最上层** 追加一层 **DynamicUILayer**，
 *   与编辑器里摆好的静态布局分离，专放运行时生成的 UI。
 * - **需要** 飘字、临时组件、战斗内 UI 特效等时：通过本模块 API（如 addFromPackage / addChild）创建或挂载到该层；
 *   首次调用时会 getOrCreateLayer，之后同一 host 复用同一层。
 * - **释放**：继承 `AbstractUIWindow` 的窗口在关闭/销毁路径上已统一 `releaseLayer(view)`，业务一般无需再写。
 *   若 host 不是该抽象窗口的 view（例如场景里裸 GComponent），仍须在宿主销毁前调用 releaseLayer(host)；仅清空层内节点用 clearLayer。
 *
 * 典型场景：战斗窗口上飘血、Buff 图标等，不污染 FGUI 静态层级。
 */
export class ModuleDynamicUI extends AbstractModule {

    /** host → 其顶层动态层；须与 releaseLayer 成对，避免 Map 长期持有已销毁窗口引用 */
    private _layerByHost: Map<GComponent, GComponent> = new Map();

    protected init(): void {
        // 无模块级全局节点；动态层按 host 随用随建
    }

    protected show(): void {
    }

    protected remove(): void {
        this._layerByHost.clear();
    }

    /**
     * 获取或创建挂在 host **最上层** 的动态层（与 host 同宽高，RelationType.Size 随 host 变化）。
     * @param touchThrough true：动态层不拦截触摸，事件落到下层（如战斗按钮）；false：层可点击
     */
    public getOrCreateLayer(host: GComponent, touchThrough: boolean = false): GComponent {
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

    /** 若后续往 host 上追加了静态子节点盖住了动态层，调用此方法把动态层再次置顶 */
    public bringLayerToFront(host: GComponent): void {
        const layer = this._layerByHost.get(host);
        if (layer == null || layer.isDisposed || layer.parent !== host) {
            return;
        }
        this._setLayerOnTop(host, layer);
    }

    /** 用已加载包名 + 资源名创建组件，并加入 host 的动态层（会按需 getOrCreateLayer） */
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

    /** 将已有 GObject 挂到 host 的动态层（会按需 getOrCreateLayer） */
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

    /** 从父节点移除子节点（一般为动态层上的节点）；dispose 为是否销毁实例 */
    public removeChild(child: GObject, dispose: boolean = true): void {
        if (child == null || child.parent == null) {
            return;
        }
        child.parent.removeChild(child, dispose);
    }

    /** 清空某 host 对应动态层内的全部子节点（不销毁动态层本身；关闭窗口请用 releaseLayer） */
    public clearLayer(host: GComponent, dispose: boolean = true): void {
        const layer = this._layerByHost.get(host);
        if (layer != null && !layer.isDisposed) {
            layer.removeChildren(0, layer.numChildren, dispose);
        }
    }

    /**
     * 移除并销毁该 host 上的动态层，并从模块映射中删除。
     * `AbstractUIWindow` 已代为调用；非窗口 host 须在销毁前自行调用。可重复调用（幂等）。
     */
    public releaseLayer(host: GComponent): void {
        if (host == null) {
            return;
        }
        const layer = this._layerByHost.get(host);
        this._layerByHost.delete(host);
        if (layer != null && !layer.isDisposed) {
            if (layer.parent != null) {
                // 第二个参数为true，自动执行dispose方法
                layer.parent.removeChild(layer, true);
            } else {
                layer.dispose();
            }
        }
    }

    /** 将 layer 置于 host 子节点列表末尾，保证绘制与点击顺序在最上 */
    private _setLayerOnTop(host: GComponent, layer: GComponent): void {
        const n = host.numChildren;
        if (n > 0) {
            host.setChildIndex(layer, n - 1);
        }
    }
}
