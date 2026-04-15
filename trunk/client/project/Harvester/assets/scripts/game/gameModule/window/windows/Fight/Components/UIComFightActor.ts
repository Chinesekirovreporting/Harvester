import { AbstractUIComponent } from "db://assets/scripts/framework/core/ui/AbstractUIComponent";
import { GComponent, GProgressBar } from "fairygui-cc";
import { GameModules } from "../../../../GameModules";
import { TweenUtil } from "db://assets/scripts/framework/utils/TweenUtil";
import { DamageResultTable } from "../../../../../core_fight/core_attr/FightCalcResultTables/FightCalcResourceTables";
import { FightBloodFloatEffect } from "../FightBloodFloatEffect";
import { EnumFaction } from "../../../../../core_fight/core_actor/EnumFaction";
import { EnumAttr } from "db://assets/scripts/game/core_fight/core_attr/EnumAttr";
import { ModuleBattleEvent } from "db://assets/scripts/game/core_fight/core_battle/ModuleBattleEvent";
import { ModuleRoundEvent } from "db://assets/scripts/game/core_fight/core_round/ModuleRoundEvent";
import { ModuleSkillEvent } from "db://assets/scripts/game/core_fight/core_skill/ModuleSkillEvent";
import { ModuleEffectEvent } from "db://assets/scripts/game/core_fight/core_effect/ModuleEffectEvent";

/**
 * 战斗窗口内：友方 / 敌方角色位（comPlayer1、comBoss1）的展示与受击飘血，逻辑从 WindowFightCore 拆分。
 */
export class UIComFightActor extends AbstractUIComponent {

	private comPlayer1: GComponent;
	private comBoss1: GComponent;
	private playerHpBar:GProgressBar;
	private bossHpBar:GProgressBar;

	public constructor(hostView: GComponent) {
		super(hostView);
        this.initView();
	}

	private initView(): void {
		const comPlayer = this.view.getChild("comPlayer1");
		if (comPlayer) {
			this.comPlayer1 = comPlayer as GComponent;
		}
		const comBoss = this.view.getChild("comBoss1");
		if (comBoss) {
			this.comBoss1 = comBoss as GComponent;
		}
		this.playerHpBar = this.comPlayer1.getChild("hpBar") as GProgressBar;
		this.bossHpBar = this.comBoss1.getChild("hpBar") as GProgressBar;
	}

	public updateFightActor(): void {
		const battleMyActor = GameModules.battle.curBattle.friendActorList[0];
		const battleEnemyActor = GameModules.battle.curBattle.enemyActorList[0];
		if (battleMyActor == null || battleEnemyActor == null) {
			return;
		}
		if (this.comPlayer1 != null) {
			this.comPlayer1.getChild("lblName").text = battleMyActor.name;
			this.comPlayer1.getChild("lblMp").text =  GameModules.round.curRound != null ? GameModules.round.curRound.getRoundEnergy().toString() : "0";
			this.comPlayer1.getChild("lblBlood").text = battleMyActor.attrVo.CUR_HP + "/" + battleMyActor.getAttr(EnumAttr.HP).toString();
			this.playerHpBar.value = battleMyActor.attrVo.CUR_HP / battleMyActor.getAttr(EnumAttr.HP) * 100;
		}
		if (this.comBoss1 != null) {
			this.comBoss1.getChild("lblName").text = battleEnemyActor.name;
			this.comBoss1.getChild("lblMp").text = "";
			this.comBoss1.getChild("lblBlood").text = battleEnemyActor.attrVo.CUR_HP + "/" + battleEnemyActor.getAttr(EnumAttr.HP).toString();
			this.bossHpBar.value = battleEnemyActor.attrVo.CUR_HP / battleEnemyActor.getAttr(EnumAttr.HP) * 100;
		}
	}

	/** 战斗界面展示时：Boss 位浮动循环效果 */
	public startBossFloatLoop(): void {
		if (this.comBoss1 != null) {
			TweenUtil.floatEffectLoop(this.comBoss1);
		}
	}

	/** 敌方受击时在 Boss 锚点飘血 */
	public trySpawnEnemyDamageFloat(result: DamageResultTable): void {
		if (result.target.faction !== EnumFaction.ENEMY) {
			return;
		}
		FightBloodFloatEffect.spawn(this.view, this.comBoss1, result);
	}

	protected onShow(): void {
		
	}

	protected onClose(): void {
		
	}
}
