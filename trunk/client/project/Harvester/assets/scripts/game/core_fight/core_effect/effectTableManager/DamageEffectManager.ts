import { GameModules } from "../../../gameModule/GameModules";
import { DamageResultTable, ResultTable } from "../../core_attr/FightCalcResultTables/FightCalcResourceTables";
import { BattleLogManager } from "../../core_battle/BattleLog";
import { EffectDamage } from "../effects/EffectDamage";
import { ModuleEffectEvent } from "../ModuleEffectEvent";

export class DamageEffectManager {
    // 伤害效果列表
    public damageResultList:DamageResultTable[];
    public isRunning:boolean = false;
    constructor() {
        this.init();
    }

    public init():void {
        console.log("初始化DamageEffectManager")
    }

    public executeDamageEffect(effectDamage:EffectDamage):void {
        console.log("DamageEffectManager执行伤害效果", effectDamage)
        // 将数据丢给属性模块进行数据运算
        let result:ResultTable = GameModules.attr.calcByDamageEffect(effectDamage);
        this.damageResultList.push(result as DamageResultTable);
    }

    public onEffectStart():void {
        this.isRunning = true;
    }

    public onEffectStop():void {
        this.isRunning = false;
    }

    // 魔法效果一次逻辑触发 
    public onEffectTick():void {
        console.log("DamageEffectManager更新逻辑") 
        if (this.isRunning) {
            this.executeDamageResultListOnce();
        }
    }

    // 执行伤害结果列表一次，执行完成后，将结果列表清空
    public executeDamageResultListOnce():void {
        // 执行伤害结果列表一次，执行完成后，记录LOG，并将结果列表清空 
        // 取出damageResultList第一项数据，并从列表里清空
        let result:DamageResultTable = this.damageResultList.shift();
        if (result) {
            // 事件派发 特效表现 
            GameModules.effect.emit(ModuleEffectEvent.ON_DAMAGE_EFFECT, result);
            // GameModules.event.dispatchEventWithData(ModuleEffectEvent.ON_DAMAGE_EFFECT, result);
            BattleLogManager.addLog("DamageEffectManager执行伤害结果", result);
        }
    }

    // 清空伤害结果列表
    public clearDamageResultList():void {
        this.damageResultList = [];
    }
}