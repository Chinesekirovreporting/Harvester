import { FightCoreLogAttrChangeVo } from "../../../gameModel/data/FightCoreLog/FightCoreLogAttrChangeVo";
import { EnumFightCoreLogType } from "../../../gameModel/enum/EnumFightCoreLogType";
import { GameModels } from "../../../gameModel/GameModels";
import { GameModules } from "../../../gameModule/GameModules";
import { fightCoreLogAttrLabel } from "../../core_attr/FightCoreLogAttrLabel";
import { AttrModifyResultTable, ResultTable } from "../../core_attr/FightCalcResultTables/FightCalcResourceTables";
import { BattleLogManager } from "../../core_battle/BattleLog";
import { EffectAttrModify } from "../effects/EffectAttrModify";
import { ModuleEffectEvent } from "../ModuleEffectEvent";

export class AttrModifyEffectManager {
    public attrModifyResultList:AttrModifyResultTable[] = [];
    public isRunning:boolean = false;

    constructor() {
        this.init();
    }

    public init():void {
        console.log("初始化HealEffectManager");
    }

    public executeAttrModifyEffect(effectAttrModify:EffectAttrModify):void {
        console.log("AttrModifyEffectManager执行属性增益效果", effectAttrModify);
        let result:ResultTable = GameModules.attr.calcByAttrModifyEffect(effectAttrModify);
        this.attrModifyResultList.push(result as AttrModifyResultTable);
        // 记录日志
        const ar = result as AttrModifyResultTable;
        GameModels.fightLog.showLogByType(
            EnumFightCoreLogType.ATTR_CHANGE,
            new FightCoreLogAttrChangeVo(effectAttrModify.targetActor.name, fightCoreLogAttrLabel(ar.attrModifyType), ar.attrModifyValue)
        );
    }

    public onEffectStart():void {
        this.isRunning = true;
    }

    public onEffectStop():void {
        this.isRunning = false;
    }

    public onEffectTick():void {
        if (this.isRunning) {
            this.executeAttrModifyResultListOnce();
        }
    }

    public executeAttrModifyResultListOnce():void {
        let result:AttrModifyResultTable = this.attrModifyResultList.shift();
        if (result) {
            GameModules.effect.emit(ModuleEffectEvent.ON_ATTR_MODIFY_EFFECT, result);
            BattleLogManager.addLog("AttrModifyEffectManager执行属性增益结果", result);
        }
    }

    public clearHealResultList():void {
        this.attrModifyResultList = [];
    }
}