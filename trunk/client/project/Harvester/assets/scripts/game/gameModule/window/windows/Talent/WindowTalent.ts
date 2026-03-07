import { AbstractUIWindow } from "db://assets/scripts/framework/core/ui/AbstractUIWindow";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { RenderTalentNode, ITalentNodeData } from "./RenderTalentNode";
import { GButton, GList, GTextField, Event } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";
import { TalentCFG } from "../../../../gameModel/table/tableClass/TalentCFG";

const DEFAULT_TREE_ID = 1;

/**
 * 天赋树窗口
 */
export class WindowTalent extends AbstractUIWindow {
    private listTalent: GList;
    private lblPoints: GTextField;
    private btnReset: GButton;
    private btnCloseTop: GButton;
    private btnClose: GButton;

    protected getResList(): Array<string> {
        return ["ui/Talent", "ui/Icon"];
    }

    protected onInit(): void {
        if (this._view) return;

        UICore.registerExtension("Talent", "RenderTalentNode", RenderTalentNode);
        const view = UICore.createObject("Talent", "WindowTalent").asCom;
        if (view) {
            this._view = view;
        } else {
            console.error("创建 WindowTalent 视图失败，请检查资源包是否已正确加载");
        }
    }

    protected onInitView(): void {
        this.listTalent = this.view.asCom.getChild("listTalent") as GList;
        this.listTalent.setVirtual();
        this.listTalent.itemRenderer = this.listTalentItemRenderer.bind(this);
        this.listTalent.on(Event.CLICK_ITEM, this.onTalentItemClick, this);
        this.lblPoints = this.view.asCom.getChild("lblPoints") as GTextField;
        this.btnReset = this.view.asCom.getChild("btnReset") as GButton;
        const resetTitle = this.btnReset.getChild("title") as GTextField;
        if (resetTitle) resetTitle.text = "重置";
        this.btnReset.onClick(this.onResetClick, this);
        this.btnCloseTop = this.view.asCom.getChild("btnCloseTop") as GButton;
        this.btnCloseTop.onClick(this.onCloseClick, this);
        this.btnClose = this.view.asCom.getChild("btnClose") as GButton;
        this.btnClose.onClick(this.onCloseClick, this);
    }

    private listTalentItemRenderer(index: number, item: RenderTalentNode): void {
        const list = GameModels.talent.getTalentList(DEFAULT_TREE_ID);
        const talentCFG = list[index];
        if (!talentCFG) return;

        const rank = GameModels.talent.getTalentRank(DEFAULT_TREE_ID, talentCFG.ID);
        const canLearn = GameModels.talent.canLearn(DEFAULT_TREE_ID, talentCFG.ID);

        const data: ITalentNodeData = { talentCFG, rank, canLearn };
        item.setData(data);
    }

    private onTalentItemClick(): void {
        const idx = this.listTalent.selectedIndex;
        if (idx < 0) return;
        const list = GameModels.talent.getTalentList(DEFAULT_TREE_ID);
        const cfg = list[idx];
        if (!cfg) return;
        this.onTalentNodeClick(cfg);
    }

    private onTalentNodeClick(cfg: TalentCFG): void {
        const rank = GameModels.talent.getTalentRank(DEFAULT_TREE_ID, cfg.ID);
        const canLearn = GameModels.talent.canLearn(DEFAULT_TREE_ID, cfg.ID);

        if (rank >= cfg.MaxRank) {
            // 已满级，可显示详情
            return;
        }
        if (canLearn) {
            const ok = GameModels.talent.learnTalent(DEFAULT_TREE_ID, cfg.ID);
            if (ok) {
                this.refreshTalent();
            }
        } else {
            console.log("无法学习：需要前置天赋或天赋点不足");
            // TODO: 可弹出提示
        }
    }

    private onResetClick(): void {
        if (confirm("确定要重置所有天赋吗？")) {
            GameModels.talent.resetTree(DEFAULT_TREE_ID);
            this.refreshTalent();
        }
    }

    private onCloseClick(): void {
        this.close();
    }

    protected onShow(...args: Array<any>): void {
        this.refreshTalent();
    }

    private refreshTalent(): void {
        const list = GameModels.talent.getTalentList(DEFAULT_TREE_ID);
        this.listTalent.numItems = list.length;
        this.listTalent.refreshVirtualList();

        const remaining = GameModels.talent.getRemainingPoints(DEFAULT_TREE_ID);
        this.lblPoints.text = `剩余点数: ${remaining}`;
    }

    protected onClose(): void {
        if (this.listTalent) {
            this.listTalent.off(Event.CLICK_ITEM, this.onTalentItemClick, this);
        }
    }

    protected onDispose(): void {
        this.listTalent = null;
        this.lblPoints = null;
        this.btnReset = null;
        this.btnCloseTop = null;
        this.btnClose = null;
    }
}
