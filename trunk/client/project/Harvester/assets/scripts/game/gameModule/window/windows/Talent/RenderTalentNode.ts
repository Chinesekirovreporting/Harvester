import { GButton, GLoader, GTextField, GImage } from "fairygui-cc";
import { TalentCFG } from "../../../../gameModel/table/tableClass/TalentCFG";
import { GameRes } from "../../../../gameModel/setting/GameRes";

/** 天赋节点渲染数据 */
export interface ITalentNodeData {
    talentCFG: TalentCFG;
    rank: number;
    canLearn: boolean;
}

export class RenderTalentNode extends GButton {
    private loaderIcon: GLoader;
    private lblName: GTextField;
    private lblRank: GTextField;
    private imgLocked: GImage;

    protected onConstruct(): void {
        super.onConstruct();
        this.loaderIcon = this.getChild("loaderIcon") as GLoader;
        this.lblName = this.getChild("lblName") as GTextField;
        this.lblRank = this.getChild("lblRank") as GTextField;
        this.imgLocked = this.getChild("imgLocked") as GImage;
    }

    public setData(data: ITalentNodeData): void {
        if (!data || !data.talentCFG) return;

        const { talentCFG, rank, canLearn } = data;
        this.lblName.text = talentCFG.Name || "";
        this.lblRank.text = `${rank}/${talentCFG.MaxRank}`;

        if (talentCFG.Icon) {
            this.loaderIcon.url = GameRes.UI_ICON_PATH;
        } else {
            this.loaderIcon.url = GameRes.UI_ICON_PATH;
        }

        // 状态显示
        if (this.imgLocked) this.imgLocked.visible = !canLearn && rank <= 0;
        this.grayed = !canLearn && rank <= 0;
    }
}
