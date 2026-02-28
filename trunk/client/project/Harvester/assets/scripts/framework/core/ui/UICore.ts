import { GObject, GRoot, UIObjectFactory, UIPackage } from "fairygui-cc";
import { Method } from "../../utils/Method";
import { ExternalGLoader } from "./extension/ExternalGLoader";

/**
 * 静态UI核心类 所有fairyGUI相关函数，使用UICore作为封装方法，不对外暴漏fairyGUI相关内容
 */
export class UICore {

    private static _rootContainer:GRoot;
    private static _root:GRoot;

    /**
     * 根容器
     */
    public static get rootContainer():GRoot {
        return this._rootContainer;
    }

    /**
     * fairygui root
     */
    public static get root():GRoot {
        return this._root;
    }

    /**
     * 初始化
     */
    public static init():void {
        // 设置GRoot根节点，cocos中无需设置根节点
        this._root = GRoot.inst;
        // this._rootContainer = rootContainer;
        // this._rootContainer.addChild(this._root.displayObject);
        
        // 设置加载器扩展 
        UIObjectFactory.setLoaderExtension(ExternalGLoader);
    }

    /**
     * 添加资源
     */
    public static addPackage(name:string):void {
        UIPackage.addPackage(name);
    }

    public static loadPackage( path: string, onComplete?: ( error: any, pkg: UIPackage ) => void):void {
        UIPackage.loadPackage( path, onComplete );
    }

    // Promise版本暂未投入使用，待测试

    /**
     * 加载单个资源包（Promise 版本）
     */
    public static loadPackageAsync(path: string): Promise<UIPackage> {
        return new Promise((resolve, reject) => {
            UIPackage.loadPackage(path, (err: any, pkg: UIPackage) => {
                if (err) reject(err);
                else resolve(pkg);
            });
        });
    }

    /**
     * 并行加载多个资源包，返回 Promise，全部成功后 resolve
     * @param paths 资源路径列表
     * @returns Promise<UIPackage[]> 成功加载的包列表，任一失败则 reject
     */
    public static loadPackageList(paths: string[]): Promise<UIPackage[]> {
        if (!paths || paths.length === 0) {
            return Promise.resolve([]);
        }
        return Promise.all(paths.map(path => this.loadPackageAsync(path)));
    }
    // 使用示例
    // async/await
    // const pkgs = await UICore.loadPackageList(["ui/MainUI", "ui/TipWindow", "ui/SkillBook"]);

    // // .then()
    // UICore.loadPackageList(["ui/MainUI", "ui/TipWindow"])
    // .then(pkgs => { /* 全部成功 */ })
    // .catch(err => { /* 任一失败 */ });


    /**
     * 并行加载多个资源包，全部完成后执行一次回调
     * @param paths 资源路径列表
     * @param onComplete 完成回调，error 为第一个错误（若有），pkgs 为成功加载的包列表
     */
    public static loadPackages(
        paths: string[],
        onComplete?: (error: any, pkgs: UIPackage[]) => void
    ): void {
        this.loadPackageList(paths)
            .then(pkgs => onComplete?.(null, pkgs))
            .catch(err => onComplete?.(err, []));
    }

    /**
     * 注册拓展
     */
    public static registerExtension(pkgName:string, resName:string, type:any):void {
        UIObjectFactory.setExtension( UIPackage.getItemURL(pkgName, resName), type);
    }

    /**
     * 创建对象
     */
    public static createObject(pkgName:string, resName:string, userClass?:any):GObject {
        return UIPackage.createObject(pkgName, resName, userClass);
    }

    /**
     * 获取资源URL
     */
    public static getItemURL(pkgName:string, resName:string):string {
        return UIPackage.getItemURL(pkgName, resName);
    }

    /**
     * 是否有资源
     */
    public static hasPackage(name: string): boolean {
        return UIPackage.getByName(name) != null;
    }
    
    /**
     * 是否有资源列表
        */
    public static hasPackageList(list: Array<string>): boolean {
        for (var name of list) {
            if (!this.hasPackage(name)) {
                return false;
            }
        }
        return true;
    }
}