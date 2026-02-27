import { GButton, GComponent, GObject, GTextField } from "fairygui-cc";
import { AchieveCFG } from "../../../../gameModel/table/tableClass/AchieveCFG";

export class RenderAchieve extends GComponent {
    private imgIcon:GTextField;
    private lblTitle: GTextField;
    private lblDes:GTextField;
    private lblReward:GTextField;

    // Note: GComponent does not have constructFromXML, should override onConstruct instead
    protected onConstruct(): void {
        super.onConstruct();
        this.lblTitle = this.getChild("title") as GTextField;
        this.lblDes = this.getChild("des") as GTextField;
        this.lblReward = this.getChild("reward") as GTextField;
        this.imgIcon = this.getChild("icon") as GTextField;
    }

    public setData(achieveCFG: AchieveCFG): void {
        this.lblTitle.text = achieveCFG.Name.toString();
    }

    public dispose(): void {
        super.dispose();
    }
}