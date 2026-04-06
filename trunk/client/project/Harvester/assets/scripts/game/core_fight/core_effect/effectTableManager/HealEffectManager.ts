import { GameModules } from "../../../gameModule/GameModules";
import { HealResultTable, ResultTable } from "../../core_attr/FightCalcResultTables/FightCalcResourceTables";
import { BattleLogManager } from "../../core_battle/BattleLog";
import { EffectHeal } from "../effects/EffectHeal";
import { ModuleEffectEvent } from "../ModuleEffectEvent";

export class HealEffectManager {
    public healResultList:HealResultTable[] = [];
    public isRunning:boolean = false;

    constructor() {
        this.init();
    }

    public init():void {
        console.log("初始化HealEffectManager");
    }

    public executeHealEffect(effectHeal:EffectHeal):void {
        console.log("HealEffectManager执行治疗效果", effectHeal);
        let result:ResultTable = GameModules.attr.calcByHealEffect(effectHeal);
        this.healResultList.push(result as HealResultTable);
    }

    public onEffectStart():void {
        this.isRunning = true;
    }

    public onEffectStop():void {
        this.isRunning = false;
    }

    public onEffectTick():void {
        if (this.isRunning) {
            this.executeHealResultListOnce();
        }
    }

    public executeHealResultListOnce():void {
        let result:HealResultTable = this.healResultList.shift();
        if (result) {
            GameModules.effect.emit(ModuleEffectEvent.ON_HEAL_EFFECT, result);
            BattleLogManager.addLog("HealEffectManager执行治疗结果", result);
        }
    }

    public clearHealResultList():void {
        this.healResultList = [];
    }
}
