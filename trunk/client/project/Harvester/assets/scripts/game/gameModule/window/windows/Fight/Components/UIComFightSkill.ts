import { AbstractUIComponent } from "db://assets/scripts/framework/core/ui/AbstractUIComponent";
import { App } from "db://assets/scripts/framework/managers/App";
import { GButton, GComponent, GObject, GProgressBar, GTween } from "fairygui-cc";
import { GameModules } from "../../../../GameModules";
import { $Tables } from "../../../../../gameModel/table/$Tables";
import { SkillCFG } from "../../../../../gameModel/table/tableClass/SkillCFG";
import { GameRes } from "../../../../../gameModel/setting/GameRes";
import { TweenUtil } from "db://assets/scripts/framework/utils/TweenUtil";
import { BaseActor } from "../../../../../core_fight/core_actor/BaseActor";
import { EnumSkill } from "../../../../../core_fight/core_skill/skills/EnumSkill";

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
	/** 技能图标飞向敌方 UI 时的弧线高度（相对中点向上抬，FairyGUI y 向下为正故为负偏移） */
	private static readonly SKILL_TO_ENEMY_ARC_OFFSET = 110;
	/** 飞向敌方栏的时长（秒） */
	private static readonly SKILL_TO_ENEMY_DURATION = 0.48;

	private fightSkillPopDict: Record<number, GButton> = {};
	/** index -> 技能表 ID，与 `fightSkillPopDict` 同键 */
	private fightSkillIdDict: Record<number, number> = {};
	/** 已点击、正在播放飞出动画的槽位，避免能量刷新时把其重新设为可点 */
	private fightSkillAnimatingIndexSet: Set<number> = new Set();
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
		this.fightSkillIdDict[index] = skillId;
		this.moveSkillInit(index);
		button.onClick(this.onFightSkillButtonClick.bind(this, index), this);
		this.applySkillButtonEnergyState(index);
	}

	private static getSkillCost(skillId: number): number {
		const cfg = App.tableManager.getTable($Tables.SkillCFG, skillId) as SkillCFG;
		return cfg != null && cfg.Cost != null ? cfg.Cost : 0;
	}

	private canAffordSkill(skillId: number): boolean {
		const round = GameModules.round.curRound;
		if (round == null) {
			return false;
		}
		return round.getRoundEnergy() >= UIComFightSkill.getSkillCost(skillId);
	}

	/** 根据当前回合能量更新单个技能按钮是否可点（能量不足时禁用点击并置灰） */
	private applySkillButtonEnergyState(index: number): void {
		const button = this.fightSkillPopDict[index];
		const skillId = this.fightSkillIdDict[index];
		if (button == null || skillId == null) {
			return;
		}
		if (this.fightSkillAnimatingIndexSet.has(index)) {
			button.touchable = false;
			return;
		}
		const affordable = this.canAffordSkill(skillId);
		button.touchable = affordable;
		button.grayed = !affordable;
	}

	/** 能量变化后刷新所有仍存在的技能按钮（由战斗窗 `updateEnergy` 等调用） */
	public refreshAllSkillEnergyStates(): void {
		for (const k of Object.keys(this.fightSkillPopDict)) {
			this.applySkillButtonEnergyState(Number(k));
		}
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

	/**
	 * 敌方 UI 栏（comBoss1）上技能图标落点，与技能按钮同一父级坐标系。
	 * 优先对齐血条区域，便于视觉上「砸在敌人血条上」。
	 */
	private getEnemySkillProjectileTarget(btn: GButton): { x: number; y: number } | null {
		const comBoss = this.view.getChild("comBoss1") as GComponent | null;
		if (comBoss == null || comBoss.width <= 1) {
			return null;
		}
		const hpBar = comBoss.getChild("hpBar") as GProgressBar | null;
		if (hpBar != null && hpBar.width > 1) {
			return {
				x: comBoss.x + hpBar.x + hpBar.width * 0.5 - btn.width * 0.5,
				y: comBoss.y + hpBar.y + hpBar.height * 0.5 - btn.height * 0.5,
			};
		}
		return {
			x: comBoss.x + comBoss.width * 0.5 - btn.width * 0.5,
			y: comBoss.y + comBoss.height * 0.38 - btn.height * 0.5,
		};
	}
	
	public removeFightSkillPop(index: number): void {
		var button: GButton = this.fightSkillPopDict[index];
		if (button == null) {
			return;
		}
		GTween.kill(button as GObject);
		button.clearClick();
		GameModules.dynamicUI.removeChild(button, true);
		delete this.fightSkillPopDict[index];
		delete this.fightSkillIdDict[index];
		this.fightSkillAnimatingIndexSet.delete(index);
	}

	private onFightSkillButtonClick(index: number): void {
		const skillId = this.fightSkillIdDict[index];
		if (skillId == null || !this.canAffordSkill(skillId)) {
			return;
		}
		console.log("onFightSkillButtonClick", index);
		var useUnit: BaseActor = GameModules.battle.curBattle.friendActorList[0];
		GameModules.skill.useSkill(skillId as EnumSkill, useUnit);
		const btn = this.fightSkillPopDict[index];
		if (btn == null) {
			return;
		}
		this.fightSkillAnimatingIndexSet.add(index);
		btn.touchable = false;
		// TweenUtil.fadeOut(btn as GObject, 0.3, () => {
		// 	this.removeFightSkillPop(index);
		// });
		GTween.kill(btn);
		const parent = btn.parent;
		if (parent != null) {
			parent.setChildIndex(btn, parent.numChildren - 1);
		}
		const target = this.getEnemySkillProjectileTarget(btn);
		if (target == null) {
			TweenUtil.fadeOut(btn as GObject, 0.3, () => {
				this.removeFightSkillPop(index);
			});
			return;
		}
		const sx = btn.x;
		const sy = btn.y;
		const tx = target.x;
		const ty = target.y;
		const ctrlX = (sx + tx) * 0.5;
		const ctrlY = Math.min(sy, ty) - UIComFightSkill.SKILL_TO_ENEMY_ARC_OFFSET;
		TweenUtil.flyToBezier(
			btn as GObject,
			tx,
			ty,
			ctrlX,
			ctrlY,
			UIComFightSkill.SKILL_TO_ENEMY_DURATION,
			() => {
				TweenUtil.fadeOut(btn as GObject, 0.22, () => {
					this.removeFightSkillPop(index);
				});
			}
		);
	}

	/** 关闭窗口或回合切换时清空全部动态技能按钮 */
	public clearAll(): void {
		const keys = Object.keys(this.fightSkillPopDict);
		for (const k of keys) {
			this.removeFightSkillPop(Number(k));
		}
		this.fightSkillAnimatingIndexSet.clear();
		this.fightSkillPopIndex = 0;
	}

	protected onDispose(): void {
		this.clearAll();
	}
}
