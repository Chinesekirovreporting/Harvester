import { GComponent, GLoader, GTextField } from "fairygui-cc";
import { AchieveCFG } from "../../../../gameModel/table/tableClass/AchieveCFG";
import { IconManager } from "../../../../../framework/utils/IconManager";
import { GameRes } from "../../../../gameModel/setting/GameRes";

export class RenderAchieve extends GComponent {
    private imgIcon: GLoader;
    private lblTitle: GTextField;
    private lblDes: GTextField;
    private lblReward: GTextField;

    // Note: GComponent does not have constructFromXML, should override onConstruct instead
    protected onConstruct(): void {
        super.onConstruct();
        this.lblTitle = this.getChild("lblTitle") as GTextField;
        this.lblDes = this.getChild("lblDes") as GTextField;
        this.lblReward = this.getChild("lblReward") as GTextField;
        this.imgIcon = this.getChild("imgIcon") as GLoader;
    }

    public setData(achieveCFG: AchieveCFG): void {
        if (!achieveCFG) return;
        this.lblTitle.text = achieveCFG.Name || "";
        this.lblDes.text = achieveCFG.Description || "";
        this.lblReward.text = achieveCFG.Reward || "";
        if (achieveCFG.Icon) {
            // this.imgIcon.url = IconManager.getIconUrl(achieveCFG.Icon) || GameRes.UI_ICON_PATH;
            this.imgIcon.url = GameRes.UI_ICON_PATH;
        } else {
            this.imgIcon.url = GameRes.UI_ICON_PATH;
        }
    }

    public dispose(): void {
        super.dispose();
    }
}