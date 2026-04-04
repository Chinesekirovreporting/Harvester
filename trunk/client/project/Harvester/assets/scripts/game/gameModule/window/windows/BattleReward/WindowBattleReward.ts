import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GButton, GList, GTextField } from "fairygui-cc";
import { BattleVo } from "../../../../core_fight/core_battle/BattleVo";
import { RenderBattleReward } from "./RenderBattleReward";

export class WindowBattleReward extends AbstractUIWindow {
    private listReward: GList;
    private lblTitle: GTextField;
    private btnClose: GButton;
    private btnConfirm: GButton;
    private _battleVo: BattleVo;

    protected getResList(): Array<string> {
        return ["ui/BattleReward", "ui/Icon"];
    }

    protected onInit(): void {
        if (this._view) {
            return;
        }
        UICore.registerExtension("BattleReward", "RenderBattleReward", RenderBattleReward);
        let view = UICore.createObject("BattleReward", "WindowBattleReward").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建 WindowBattleReward 失败，请确认已发布 FGUI 包 ui/BattleReward");
        }
    }

    protected onInitView(): void {
        const root = this.view.asCom;
        this.lblTitle = root.getChild("lblTitle") as GTextField;
        this.listReward = root.getChild("listReward") as GList;
        this.listReward.setVirtual();
        this.listReward.itemRenderer = this.onRewardItemRenderer.bind(this);
        this.btnClose = root.getChild("btnClose") as GButton;
        this.btnConfirm = root.getChild("btnConfirm") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
        this.btnConfirm.onClick(this.onCloseClick, this);
    }

    private onRewardItemRenderer(index: number, item: RenderBattleReward): void {
        if (!this._battleVo || !this._battleVo.rewardDropList) {
            return;
        }
        item.setData(this._battleVo.rewardDropList[index]);
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this._battleVo = args && args.length > 0 ? (args[0] as BattleVo) : null;
        this.refreshView();
    }

    private refreshView(): void {
        if (this.lblTitle) {
            if (this._battleVo) {
                this.lblTitle.text = this._battleVo.isVictory ? "战斗胜利" : "战斗失败";
            } else {
                this.lblTitle.text = "战斗结算";
            }
        }
        const n = this._battleVo && this._battleVo.rewardDropList ? this._battleVo.rewardDropList.length : 0;
        this.listReward.numItems = n;
    }

    protected onDispose(): void {
        if (this.btnClose) {
            this.btnClose.offClick(this.onCloseClick, this);
        }
        if (this.btnConfirm) {
            this.btnConfirm.offClick(this.onCloseClick, this);
        }
        this.listReward = null;
        this.lblTitle = null;
        this.btnClose = null;
        this.btnConfirm = null;
        this._battleVo = null;
    }
}
