# Harvester Codebase Guide for AI Coding Agents

## Architecture Overview

**Harvester** is a Cocos Engine game client (TypeScript) structured in three architectural layers:

### 1. Framework Layer (`assets/scripts/framework/`)
Generic game management infrastructure with no game-specific logic.
- **App** (singleton): Root facade managing all framework systems via `App.inst.startApp()`
- **Managers**: TimerManager, EventManager, SceneManager, AssetManager, LoadManager, TableManager, AudioManager, etc.
- All managers inherit from `Manager` base class and implement `IManager` interface with `update(deltaTime)` method

**Key pattern**: Access global managers via static properties: `App.timerManager`, `App.eventManager`, etc.

### 2. Core Fight Layer (`assets/scripts/core_fight/`)
Reusable game mechanics subsystems independent of UI/scene:
- `core_buff/`: **AbstractBuff** (lifecycle: `onCreated()`, `onUpdate()`, `onOneTick()`, `onDestroy()`) with effect lists
- `core_skill/`: Skill system
- `core_attr/`: Attribute system
- `core_effect/`: Effect system

**Key pattern**: Effects update via parent buff's `onUpdate()` loop; buffs process effects per tick.

### 3. Game Layer (`assets/scripts/game/`)
Game-specific implementations combining framework + core fight:
- `gameEngine/GameEngine`: Initializes all game systems
- `gameModule/`: Module-based UI/gameplay (window management, main UI, world)
- `gameScene/`: Scene management (SceneMain extends AbstractScene)
- `gameUI/`: Layer rendering system
- `gameModel/`: Game data models

**Key pattern**: GameModules registry controls module lifecycle; modules initialized in SceneMain.

## Module System

All game features are **modules** (extend `AbstractModule`):

```typescript
// Registration (GameModules.ts)
export class GameModules {
    public static mainUI: ModuleMainUI;
    public static window: ModuleWindow;
    public static world: ModuleWorld;
    public static InitBaseModules() { /* Create instances */ }
}

// Initialization flow: GameInit → App.startApp() → GameEngine.initGameEngine() → GameModules.InitBaseModules()
```

**Module responsibilities**:
- Inherit from `AbstractModule(moduleName: string)`
- Implement lifecycle: `onInit()`, `onShow()`, `onHide()`, `onDestroy()`
- Use `this.dispatchEvent()` for event communication

## UI System (FairyGUI Integration)

All UI windows extend `AbstractUIWindow` from `fairygui-cc`:

```typescript
// Window lifecycle
public class MyWindow extends AbstractUIWindow {
    protected getResList(): string[] { /* Return asset list */ }
    protected setPreprops(): void { /* Setup properties */ }
    protected addListeners(): void { /* Bind events */ }
    protected onInit(): void { /* One-time init */ }
    protected onShowComplete(): void { /* After show animation */ }
}

// Registration and display (ModuleWindow.ts pattern)
this._windowClassDict["MyWindow"] = MyWindow;
UICore.show(MyWindow); // Show window

// Window config from tables (auto-generated)
WindowConfig.configData() // Access window configuration
```

**Window features**:
- Modal layers with touch-to-close
- Show/hide animations using custom tweens
- Auto-dispose after inactivity (`_autoDisposeTime`)
- Subview system for complex UIs

## Data Management

### Table System
Tables are auto-generated from configuration:
- `gameModule/table/tableDataClass/` - Generated data classes (e.g., `$WindowConfig`)
- `gameModule/table/tableClass/` - User extensions (e.g., `WindowConfig extends $WindowConfig`)
- `gameModule/table/tableSource/` - Data providers

**Access pattern**: `WindowConfig.configData()`, `Tables.getInstance()`

### Buff/Effect System
Buffs and effects follow a hierarchical update pattern:

```typescript
// Buff construction
const buff = new MyBuff(buffVo);
buff.onCreated(); // Initialize

// Each frame
buff.onUpdate(); // → iterates effectList, calls effect.update()
buff.onOneTick(); // → Tick-based logic (health, stun, etc.)

// Cleanup
buff.onDestroy();
```

## Critical Developer Workflows

### Game Initialization
1. `GameInit.onLoad()` → `App.inst.startApp()` (framework startup)
2. `GameEngine.initGameEngine()` (game systems setup)
3. `GameModules.InitBaseModules()` (UI/world modules)
4. Scene transitions via `SceneManager.switchScene()`

### Adding a New Window
1. Create `WindowXxx extends AbstractUIWindow` in `game/gameModule/`
2. Implement `getResList()` (resources), `setPreprops()`, `addListeners()`
3. Register in `ModuleWindow._windowClassDict`
4. Show via `UICore.show(WindowXxx)`

### Adding a New Buff
1. Create `MyBuff extends AbstractBuff` in `core_fight/core_buff/`
2. Override lifecycle methods: `onCreated()`, `onUpdate()`, `onOneTick()`, `onDestroy()`
3. Add effects to `this.effectList` in constructor
4. Effects update automatically in `onUpdate()`

## Important Patterns & Conventions

### Singletons & Managers
- Framework managers accessed via `App.static_property` (e.g., `App.eventManager`)
- ObjectPoolManager for object reuse: `ObjectPoolManager.inst`
- Never instantiate managers directly; use App facade

### Inheritance Hierarchy
- **Scene management**: `AbstractScene` → `SceneMain`
- **UI windows**: `AbstractUIWindow` → specific windows
- **Buffs/effects**: `AbstractBuff` → game-specific buffs
- **Modules**: `AbstractModule` → feature modules
- **Manager system**: `Manager` → specific managers

### Naming Conventions
- Module classes: `Module<FeatureName>` (e.g., `ModuleWindow`, `ModuleMainUI`)
- Window classes: `Window<Name>` (e.g., `WindowGushi`, `TipWindow`)
- Buffer classes: `<Effect>Buff` (e.g., `DamageOverTimeBuff`)
- UI views: `<Name>View` extending `AbstractUIView`

### Event System
Modules use event dispatch (`EventTarget`-based):
```typescript
this.dispatchEvent(new cc.Event.EventCustom("eventName", true));
```

### Timing & Updates
- Global deltaTime: `App.inst.updateTick(deltaTime*1000)` (ms)
- Timer callbacks: `App.timerManager.callDelay(callback, delay)`
- Buff ticks: Custom tick logic in `onOneTick()`

## File Organization

```
assets/scripts/
├── framework/          # NO game-specific code
│   ├── managers/       # App, TimerManager, EventManager, etc.
│   ├── core/ui/        # AbstractUIWindow, UICore
│   └── utils/          # ObjectPoolManager, ArrayUtil, etc.
├── core_fight/         # Reusable combat mechanics
│   ├── core_buff/      # Buff system
│   ├── core_skill/     # Skill system
│   ├── core_attr/      # Attributes
│   └── core_effect/    # Effects
└── game/               # Game-specific implementations
    ├── gameEngine/     # Initialization
    ├── gameModule/     # Feature modules
    ├── gameScene/      # Scene implementations
    ├── gameModel/      # Data models
    └── gameUI/         # UI layer management
```

## Key Files to Reference

- [GameInit.ts](assets/scripts/GameInit.ts) - Entry point
- [App.ts](assets/scripts/framework/managers/App.ts) - Framework facade
- [AbstractModule.ts](assets/scripts/framework/managers/scene/AbstractModule.ts) - Module base
- [AbstractUIWindow.ts](assets/scripts/framework/core/ui/AbstractUIWindow.ts) - UI window base
- [AbstractBuff.ts](assets/scripts/core_fight/core_buff/AbstractBuff.ts) - Buff system
- [GameModules.ts](assets/scripts/game/gameModule/GameModules.ts) - Module registry
- [ModuleWindow.ts](assets/scripts/game/gameModule/window/ModuleWindow.ts) - Window module pattern
