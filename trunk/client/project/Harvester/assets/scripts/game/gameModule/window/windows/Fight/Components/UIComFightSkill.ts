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

	/** 技能按钮落点：锚在友方人物 `comPlayer1` 头顶上方横向排布，满列换行，不沉底 */
	private static readonly SKILL_SLOT_COLS = 4;
	private static readonly SKILL_SLOT_STEP_X = 92;
	private static readonly SKILL_SLOT_STEP_Y = 92;
	/** 人物顶边与最底一行技能按钮之间的间距 */
	private static readonly SKILL_SLOT_MARGIN_ABOVE_ACTOR = 16;
	/** 相对当前锚点再向右、向上微调（FairyGUI y 向下为正，故“往上”为减小 ty） */
	private static readonly SKILL_SLOT_NUDGE_X = 36;
	private static readonly SKILL_SLOT_NUDGE_UP = 32;
	/** 未布局前 width/height 可能为 0，用于估算槽位 */
	private static readonly SKILL_SLOT_FALLBACK_W = 80;
	private static readonly SKILL_SLOT_FALLBACK_H = 80;

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
		this.moveSkillInit(index);
		button.onClick(this.onFightSkillButtonClick.bind(this, index), this);
	}

	// 将生成好的缓动到指定位置
	private moveSkillInit(index: number): void {
		const button: GButton = this.fightSkillPopDict[index];
		if (button == null) {
			return;
		}
		button.x = 0;
		button.y = 0;
		const col = index % UIComFightSkill.SKILL_SLOT_COLS;
		const row = Math.floor(index / UIComFightSkill.SKILL_SLOT_COLS);
		const slotW = button.width > 1 ? button.width : UIComFightSkill.SKILL_SLOT_FALLBACK_W;
		const slotH = button.height > 1 ? button.height : UIComFightSkill.SKILL_SLOT_FALLBACK_H;
		const cols = UIComFightSkill.SKILL_SLOT_COLS;
		const gridW = (cols - 1) * UIComFightSkill.SKILL_SLOT_STEP_X + slotW;
		const comPlayer = this.view.getChild("comPlayer1") as GComponent | null;
		let anchorCenterX: number;
		let anchorTopY: number;
		const viewCx = this.view.width * 0.5;
		if (comPlayer != null && comPlayer.width > 0) {
			const playerCx = comPlayer.x + comPlayer.width * 0.5;
			// 人物中心与窗口水平中心取中点，技能条更贴屏幕视觉中心
			anchorCenterX = (playerCx + viewCx) * 0.5;
			anchorTopY = comPlayer.y;
		} else {
			anchorCenterX = viewCx;
			anchorTopY = this.view.height * 0.42;
		}
		const baseX = anchorCenterX - gridW * 0.5;
		const tx = baseX + col * UIComFightSkill.SKILL_SLOT_STEP_X + UIComFightSkill.SKILL_SLOT_NUDGE_X;
		const ty = anchorTopY - UIComFightSkill.SKILL_SLOT_MARGIN_ABOVE_ACTOR - slotH - row * UIComFightSkill.SKILL_SLOT_STEP_Y - UIComFightSkill.SKILL_SLOT_NUDGE_UP;
		TweenUtil.flyTo(button as GObject, tx, ty, 0.3);
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
