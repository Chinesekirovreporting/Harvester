import { ModuleBattle } from "../core_fight/core_battle/ModuleBattle";
import { ModuleRound } from "../core_fight/core_round/ModuleRound";
import { ModuleStage } from "../core_fight/core_stage/ModuleStage";
import { ModuleMainUI } from "./mainUI/ModuleMainUI"
import { ModuleWorld } from "./ModuleWorld";
import { ModuleWindow } from "./window/ModuleWindow";
import { ModuleActor } from "../core_fight/core_actor/ModuleActor";
import { ModuleAction } from "../core_fight/core_action/ModuleAction";
import { ModuleSkill } from "../core_fight/core_skill/ModuleSkill";
import { ModuleBuff } from "../core_fight/core_buff/ModuleBuff";
import { ModuleEffect } from "../core_fight/core_effect/ModuleEffect";
import { ModuleAttr } from "../core_fight/core_attr/ModuleAttr";
import { ModuleRule } from "./rule/ModuleRule";

export class GameModules {
    // 核心展示模块
    public static readonly MODULE_MAINUI:string = "mainUI";
    public static readonly MODULE_WINDOW:string = "window";
    public static readonly MODULE_WORLD:string = "world";
    // 核心战斗模块
    public static readonly MODULE_BATTLE:string = "battle"; // 战场，包含一次战斗的所有数据
    public static readonly MODULE_STAGE:string = "stage"; // 战斗阶段，每个阶段内包含所有角色的回合
    public static readonly MODULE_ROUND:string = "round";   // 角色回合，每个回合内包含一个角色的所有动作
    public static readonly MODULE_ACTION:string = "action"; // 回合内动作可能是一个技能释放，或者一个buff生效等）
    public static readonly MODULE_SKILL:string = "skill"; // 动作回合内技能释放，技能设计时，所有的释放效果均由BUFF实现，技能只是一个BUFF的载体
    public static readonly MODULE_BUFF:string = "buff"; // 每个动作回合内buff生效
    public static readonly MODULE_EFFECT:string = "effect"; // 每个buff生效内的具体效果，可能是伤害，治疗，增益，减益等
    public static readonly MODULE_ATTR:string = "attr"; // 角色属性模块，包含角色的所有属性数据，提供属性计算等功能
    public static readonly MODULE_ACTOR:string = "actor"; // 角色模块，包含角色的所有数据，提供角色行为等功能
    public static readonly MODULE_RULE:string = "rule"; // 规则模块，包含游戏的所有规则数据，用于模拟战斗，特殊规则定制，等垂直切片功能

    public static mainUI:ModuleMainUI;
    public static window:ModuleWindow;
    public static world:ModuleWorld;

    public static battle:ModuleBattle;
    public static stage:ModuleStage;
    public static round:ModuleRound;
    public static action:ModuleAction;
    public static skill:ModuleSkill;
    public static buff:ModuleBuff;
    public static effect:ModuleEffect;
    public static attr:ModuleAttr;
    public static actor:ModuleActor;
    public static rule:ModuleRule;
    
    // 初始化基础模块（底层模块）
    public static InitBaseModules() {
        // GameModules.window = new ModuleWindow
        GameModules.mainUI = new ModuleMainUI(GameModules.MODULE_MAINUI);   // 主UI部分 UICore在此处初始化 
        GameModules.window = new ModuleWindow(GameModules.MODULE_WINDOW);   // 窗口部分 
        GameModules.world = new ModuleWorld(GameModules.MODULE_WORLD);      // 主UI的世界部分
    }
    
    // 初始化战斗模块（战斗模块依赖基础模块，必须在InitBaseModules之后调用）
    public static InitFightModules() {
        // 战斗模块的初始化，主要是一些数据的加载和事件的绑定等
        GameModules.battle = new ModuleBattle(GameModules.MODULE_BATTLE);
        GameModules.stage = new ModuleStage(GameModules.MODULE_STAGE);
        GameModules.round = new ModuleRound(GameModules.MODULE_ROUND);
        GameModules.action = new ModuleAction(GameModules.MODULE_ACTION);
        GameModules.skill = new ModuleSkill(GameModules.MODULE_SKILL);
        GameModules.buff = new ModuleBuff(GameModules.MODULE_BUFF);
        GameModules.effect = new ModuleEffect(GameModules.MODULE_EFFECT);
        GameModules.attr = new ModuleAttr(GameModules.MODULE_ATTR);
        GameModules.actor = new ModuleActor(GameModules.MODULE_ACTOR);
        GameModules.rule = new ModuleRule(GameModules.MODULE_RULE);
    }

    // 初始化游戏模块(游戏内容)
    public static InitGameModules() {
        
    }
}