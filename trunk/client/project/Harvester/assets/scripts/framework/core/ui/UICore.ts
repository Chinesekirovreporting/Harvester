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
        
        // 设置加载器扩展  暂时使用原生的图片
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