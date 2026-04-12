import { AbstractUIComponent } from "db://assets/scripts/framework/core/ui/AbstractUIComponent";
import { GButton, GComponent, GObject } from "fairygui-cc";
import { GameModules } from "../../../../GameModules";
import { GameRes } from "../../../../../gameModel/setting/GameRes";
import { TweenUtil } from "db://assets/scripts/framework/utils/TweenUtil";
import { BaseActor } from "../../../../../core_fight/core_actor/BaseActor";

/**
 * 战斗窗口内：动态创建 / 回收技能按钮（ComFightSkill），逻辑从 WindowFightCore 拆分。
 */
export class UIComFightSkill extends AbstractUIComponent {

	private fightSkillPopDict: Record<number, GButton> = {};
	public fightSkillPopIndex: number = 0;

	public constructor(hostView: GComponent) {
		super(hostView);
	}

	/**
	 * 使用当前自增 index 追加一个技能按钮（等价于原窗口里 index++ 再 create）。
	 */
	public createNextFightSkillPop(skillId: number): void {
		const index = this.fightSkillPopIndex++;
		this.createFightSkillPop(index, skillId);
	}

	public createFightSkillPop(index: number, skillId: number): void {
		var button: GButton = GameModules.dynamicUI.addFromPackage(this.view, GameRes.PACKAGE_FIGHT_CORE, "ComFightSkill") as GButton;
		this.fightSkillPopDict[index] = button;
		button.onClick(this.onFightSkillButtonClick.bind(this, index), this);
	}

	public removeFightSkillPop(index: number): void {
		var button: GButton = this.fightSkillPopDict[index];
		if (button == null) {
			return;
		}
		button.clearClick();
		GameModules.dynamicUI.removeChild(button, true);
		delete this.fightSkillPopDict[index];
	}

	private onFightSkillButtonClick(index: number): void {
		console.log("onFightSkillButtonClick", index);
		var skillId = 1;
		var useUnit: BaseActor = GameModules.battle.curBattle.friendActorList[0];
		GameModules.skill.useSkill(skillId, useUnit);
		const btn = this.fightSkillPopDict[index];
		if (btn == null) {
			return;
		}
		btn.touchable = false;
		TweenUtil.fadeOut(btn as GObject, 0.3, () => {
			this.removeFightSkillPop(index);
		});
	}

	/** 关闭窗口或回合切换时清空全部动态技能按钮 */
	public clearAll(): void {
		const keys = Object.keys(this.fightSkillPopDict);
		for (const k of keys) {
			this.removeFightSkillPop(Number(k));
		}
		this.fightSkillPopIndex = 0;
	}

	protected onDispose(): void {
		this.clearAll();
	}
}
