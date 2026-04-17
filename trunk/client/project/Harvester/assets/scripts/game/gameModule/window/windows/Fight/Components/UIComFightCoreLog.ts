import { AbstractUIComponent } from "db://assets/scripts/framework/core/ui/AbstractUIComponent";
import { GComponent, GList } from "fairygui-cc";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GameModels } from "../../../../../gameModel/GameModels";
import { RenderFightCoreLog } from "../RenderFightCoreLog";
import { GameModules } from "../../../../GameModules";
import { ModuleBattleEvent } from "db://assets/scripts/game/core_fight/core_battle/ModuleBattleEvent";
import { ModuleRoundEvent } from "db://assets/scripts/game/core_fight/core_round/ModuleRoundEvent";
import { ModuleEffectEvent } from "db://assets/scripts/game/core_fight/core_effect/ModuleEffectEvent";
import { ModuleSkillEvent } from "db://assets/scripts/game/core_fight/core_skill/ModuleSkillEvent";
import { ModelFightCoreLogEvent } from "db://assets/scripts/game/gameModel/ModelFightCoreLogEvent";

/**
 * 战斗窗口内：战斗日志列表（listFightCoreLog），逻辑从 WindowFightCore 拆分。
 */
export class UIComFightCoreLog extends AbstractUIComponent {

	private listFightCoreLog: GList;

	public constructor(hostView: GComponent) {
		super(hostView);
        this.initView();
	}

	private initView(): void {
		this.listFightCoreLog = this.view.getChild("listFightCoreLog") as GList;
		this.listFightCoreLog.itemRenderer = this.listFightCoreLogRender.bind(this);
		this.listFightCoreLog.setVirtual();
		this.listFightCoreLog.refreshVirtualList();
	}

	private listFightCoreLogRender(index: number, item: RenderFightCoreLog): void {
		const list = GameModels.fightLog.getFightLogList();
		item.setData(list[index]);
	}

	public updateFightCoreLog(clear: boolean = false): void {
		this.listFightCoreLog.numItems = GameModels.fightLog.getFightLogList().length;
		// 将列表滚轮到最底部
		this.listFightCoreLog.scrollToView( GameModels.fightLog.getFightLogList().length - 1, true );
	}

	protected onShow(): void {
		this.onFightCoreEventBind();
	}

	protected onClose(): void {
		// this.onFightCoreEventUnbind();
	}

	//  战斗日志事件订阅
    private onFightCoreEventBind():void {
        // // 订阅战场开始 
        // GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_START, this.updateFightCoreLog, this);
        // // 订阅订阅回合开始事件
        // GameModules.round.on(ModuleRoundEvent.ON_ROUND_START, this.updateFightCoreLog, this);
        // // 订阅回合友方开始事件
        // GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_FRIEND_ROUND_START, this.updateFightCoreLog, this);
        // // 订阅回合敌方开始事件
        // GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_ENEMY_ROUND_START, this.updateFightCoreLog, this);
        // // 订阅技能释放事件
        // GameModules.skill.on(ModuleSkillEvent.ON_SKILL_CAST, this.updateFightCoreLog, this);
        // // 订阅敌方技能释放事件
        // GameModules.skill.on(ModuleSkillEvent.ON_ENEMY_SKILL_CAST, this.updateFightCoreLog, this);
        // // 订阅伤害效果事件
        // GameModules.effect.on(ModuleEffectEvent.ON_DAMAGE_EFFECT, this.updateFightCoreLog, this);
        // // 订阅回合结束事件
        // GameModules.round.on(ModuleRoundEvent.ON_ROUND_END, this.updateFightCoreLog, this);
        // // 订阅战场事件
        // GameModules.battle.on(ModuleBattleEvent.ON_BATTLE_END, this.updateFightCoreLog, this);
		// 通用事件：更新战斗日志
		GameModels.fightLog.on(ModelFightCoreLogEvent.FIGHT_CORE_LOG_UPDATE, this.updateFightCoreLog, this);
    }

}
