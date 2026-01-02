# Framework 架构设计评估报告

## 一、整体评价

Framework层的设计**整体良好**，基本达成了"脱离游戏内容，封装底层公共模块"的目标。架构清晰、分层合理，但在某些方面仍有改进空间。

**评分：7.5/10**

---

## 二、设计优点 ✅

### 1. **清晰的分层架构**

```
framework/
├── managers/     # 管理器层 - 核心服务
├── core/         # 核心抽象层 - UI框架抽象
├── utils/        # 工具层 - 通用工具
└── cocos/        # Cocos适配层 - 引擎适配
```

**优点**：
- 层次分明，职责清晰
- managers 作为核心服务层，封装了所有底层功能
- core 层提供了 UI 框架的抽象，隔离了 FairyGUI 的实现细节
- utils 提供通用工具，与业务无关

### 2. **良好的抽象设计**

#### 2.1 Manager 基类模式
```typescript
export class Manager extends EventTarget implements IManager {
    protected init():void {}
    public update(deltaTime:number):void {}
    public destory():void {}
}
```

**优点**：
- 统一的管理器接口，所有管理器都遵循相同的生命周期
- 继承了 EventTarget，支持事件通信
- 模板方法模式，子类只需实现特定方法

#### 2.2 Scene-Module 系统
```typescript
AbstractScene → 包含多个 IModule
AbstractModule → 可以跨场景复用
```

**优点**：
- 场景和模块分离，模块可复用
- 支持模块的进入/退出生命周期
- 模块可以在场景切换时保持状态

#### 2.3 UI 抽象层
```typescript
UICore → 封装 FairyGUI
AbstractUIView / AbstractUIWindow → 统一UI接口
```

**优点**：
- 完全隔离了 FairyGUI，如果更换UI框架只需修改 UICore
- 提供了统一的 UI 组件生命周期（init/show/close/dispose）
- 符合依赖倒置原则（DIP）

### 3. **设计模式使用恰当**

#### 3.1 单例模式
- `App.inst` - 全局入口
- `ObjectPoolManager.inst` - 对象池管理
- `LayerManager.inst` - 图层管理

**优点**：需要全局唯一实例的地方都正确使用了单例

#### 3.2 工厂模式
- `AssetFactory.createAsset()` - 创建不同类型的资源

**优点**：资源创建的复杂性被封装在工厂中

#### 3.3 对象池模式
- `ObjectPoolManager` + `IPooledObject`
- 资源类实现了对象池接口

**优点**：减少对象创建/销毁开销，提升性能

#### 3.4 模板方法模式
- `AbstractScene.init()` / `AbstractModule.init()`
- `AbstractUIView.onInit() / onShow() / onClose()`

**优点**：定义了标准流程，子类只需实现特定步骤

---

## 三、设计问题与改进建议 ⚠️

### 1. **App 类的职责过重（God Object 反模式）**

**问题**：
```typescript
export class App{
    // 直接声明所有管理器为静态属性
    public static timerManager:TimerManager;
    public static eventManager:EventManager;
    public static stageManager:StageManager;
    // ... 10+ 个管理器
    
    // 硬编码的初始化逻辑
    public initDefaultManagers():void {
        App.timerManager = new TimerManager();
        this.addManager(App.timerManager);
        // ... 重复代码
    }
}
```

**问题分析**：
- App 类直接依赖所有管理器，耦合度高
- 添加新管理器需要修改 App 类（违反开闭原则）
- 初始化逻辑硬编码，不灵活
- 静态属性过多，测试困难

**改进建议**：
```typescript
// 方案1: 使用服务注册表
export class App {
    private _services: Map<string, IManager> = new Map();
    
    public registerService<T extends IManager>(name: string, service: T): T {
        this._services.set(name, service);
        this.addManager(service);
        return service;
    }
    
    public getService<T extends IManager>(name: string): T {
        return this._services.get(name) as T;
    }
}

// 使用
App.inst.registerService('timer', new TimerManager());
const timer = App.inst.getService<TimerManager>('timer');

// 方案2: 使用依赖注入容器（更高级）
```

### 2. **管理器之间的直接依赖**

**问题**：
```typescript
// AssetManager 直接使用 App.timerManager
export class AbstractAsset {
    protected updateLastUseTime():void {
        this._lastUseTime = App.timerManager.time; // 直接依赖
    }
}
```

**问题分析**：
- 管理器之间通过 App 的静态属性耦合
- 难以进行单元测试（需要 mock App）
- 违反了依赖倒置原则

**改进建议**：
```typescript
// 通过构造函数注入依赖
export class AssetManager extends Manager {
    constructor(
        private timerManager: TimerManager,
        private objectPool: ObjectPoolManager
    ) {
        super();
    }
}

// 或者在 AbstractAsset 中通过参数传递
protected updateLastUseTime(timeManager: TimerManager):void {
    this._lastUseTime = timeManager.time;
}
```

### 3. **EventManager 与 Manager 的事件系统重复**

**问题**：
- `Manager` 已经继承了 `EventTarget`
- `EventManager` 又实现了自己的事件系统
- 功能重复，容易混淆

**分析**：
- `EventManager` 提供的是**全局事件总线**
- `Manager` 的 `EventTarget` 是**组件级事件**
- 两者用途不同，但命名和接口容易混淆

**改进建议**：
```typescript
// 重命名以明确职责
export class GlobalEventBus extends Manager {
    // 全局事件总线
}

// 或者使用更明确的API命名
App.eventManager.dispatchGlobalEvent(...); // 全局事件
manager.emit(...); // 组件事件
```

### 4. **ResourceManager 和 AssetManager 职责不清（已删除，但需警惕）**

**问题**：
- 之前存在 `ResourceManager` 和 `AssetManager`，职责重叠
- `LoadManager` 和 `AssetManager` 的关系也不清晰

**改进建议**：
- 明确职责划分：
  - `LoadManager`: 负责资源的**加载**（网络请求、文件读取）
  - `AssetManager`: 负责资源的**缓存**、**生命周期管理**、**自动清理**
- 或者合并为一个 `ResourceManager`，内部区分加载和缓存

### 5. **缺少错误处理和日志**

**问题**：
```typescript
public showWindowByName(name:string):IUIWindow {
    var windowClass:any = this._windowClassDict[name];
    if (windowClass == null) {
        App.logManager.info("ShowWindowByName:Can not find window class:" + name);
        return null; // 返回 null，调用者需要检查
    }
}
```

**问题分析**：
- 错误处理不统一（有些返回 null，有些可能抛出异常）
- 缺少统一的错误处理机制
- 日志级别使用不当（错误应该用 error 而不是 info）

**改进建议**：
```typescript
// 统一错误处理
export class FrameworkError extends Error {
    constructor(message: string, public code: string) {
        super(message);
    }
}

// 或者使用 Result 模式
export type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };
```

### 6. **StageManager 功能过于简单**

**问题**：
```typescript
export class StageManager extends Manager {
    public screenWidth:number;
    public screenHeight:number;
    // 没有监听屏幕尺寸变化
}
```

**改进建议**：
```typescript
export class StageManager extends Manager {
    private _screenWidth: number;
    private _screenHeight: number;
    
    protected init(): void {
        screen.on('window-resize', this.onResize, this);
        this.updateScreenSize();
    }
    
    private onResize(): void {
        this.updateScreenSize();
        this.emit('screen-resize', this._screenWidth, this._screenHeight);
    }
    
    private updateScreenSize(): void {
        const size = screen.windowSize;
        this._screenWidth = size.width;
        this._screenHeight = size.height;
    }
}
```

### 7. **接口定义不完整**

**问题**：
- `IManager` 接口很简单，但实际 Manager 还继承了 `EventTarget`
- 缺少一些通用接口的定义

**改进建议**：
```typescript
export interface IManager extends EventTarget {
    update(deltaTime: number): void;
    destory(): void;
    // 可以添加
    init?(): void;
    getName(): string;
}
```

### 8. **类型安全问题**

**问题**：
```typescript
private _assetDict:Object; // 使用 Object 而不是 Map
private _windowClassDict:Object;
```

**问题分析**：
- 使用 `Object` 作为字典，类型不安全
- 无法在编译时检查类型错误

**改进建议**：
```typescript
private _assetDict: Map<string, IAsset> = new Map();
private _windowClassDict: Map<string, new() => IUIWindow> = new Map();
```

---

## 四、架构层面的建议 🏗️

### 1. **引入配置系统**

当前所有管理器的初始化都是硬编码的，建议引入配置：

```typescript
// config/framework.config.ts
export const FrameworkConfig = {
    managers: [
        { name: 'timer', class: TimerManager, enabled: true },
        { name: 'event', class: EventManager, enabled: true },
        // ...
    ],
    asset: {
        autoClearInterval: 60000,
        maxCacheSize: 1000,
    }
};
```

### 2. **生命周期管理**

建议统一生命周期管理：

```typescript
export enum ManagerState {
    UNINITIALIZED,
    INITIALIZING,
    RUNNING,
    PAUSED,
    DESTROYED
}

export interface IManager {
    state: ManagerState;
    initialize(): Promise<void>;
    pause(): void;
    resume(): void;
    destroy(): Promise<void>;
}
```

### 3. **依赖关系管理**

建议使用依赖图管理管理器之间的依赖：

```typescript
// 定义依赖关系
const dependencies = {
    'AssetManager': ['TimerManager', 'ObjectPoolManager'],
    'SceneManager': ['EventManager'],
    // ...
};
```

---

## 五、与游戏层分离度评估 ✅

### 优点：
1. ✅ **Framework 层完全没有游戏相关代码**
   - 所有管理器都是通用的
   - UI 抽象层完全独立
   - 工具类都是纯函数

2. ✅ **依赖方向正确**
   - Game 层依赖 Framework 层
   - Framework 层不依赖 Game 层
   - 符合依赖倒置原则

3. ✅ **接口设计良好**
   - `IScene` / `IModule` 等接口清晰
   - 游戏层通过接口使用框架功能

### 可以改进的地方：
1. ⚠️ **某些命名可能带有游戏色彩**
   - 例如 `Scene` / `Module` 这些概念虽然通用，但在某些引擎中可能有特定含义
   - 建议在文档中明确这些是框架概念，不是引擎概念

---

## 六、总结与评分

### 设计优点：
- ✅ 分层清晰，职责明确
- ✅ 抽象设计良好（Scene-Module, UI抽象）
- ✅ 设计模式使用恰当
- ✅ 与游戏层分离彻底
- ✅ 可扩展性良好

### 主要问题：
- ⚠️ App 类职责过重（God Object）
- ⚠️ 管理器之间直接依赖（通过静态属性）
- ⚠️ 类型安全性不足（使用 Object 而非 Map）
- ⚠️ 错误处理不统一
- ⚠️ 某些管理器功能简单（StageManager）

### 总体评价：

Framework 的设计**整体质量较高**，达到了"脱离游戏内容，封装底层公共模块"的目标。架构清晰、分层合理，代码组织良好。

主要改进方向：
1. 减少 App 类的职责，引入服务注册或依赖注入
2. 改善管理器之间的依赖关系
3. 提升类型安全性
4. 统一错误处理机制
5. 完善功能简单的管理器

**建议优先级**：
1. 🔴 **高优先级**：解决 App 类职责过重问题
2. 🟡 **中优先级**：改善依赖关系、类型安全
3. 🟢 **低优先级**：完善简单管理器、统一错误处理

---

## 七、最佳实践建议

1. **单一职责原则**：每个管理器只负责一件事
2. **依赖倒置**：通过接口依赖，而不是具体实现
3. **开闭原则**：对扩展开放，对修改关闭
4. **接口隔离**：接口要小而专一
5. **类型安全**：使用 TypeScript 的类型系统，避免 any 和 Object
6. **错误处理**：统一的错误处理机制
7. **文档完善**：为每个管理器添加清晰的文档说明
