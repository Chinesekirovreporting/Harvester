import { GButton, GLoader, GTextField } from "fairygui-cc";
import { App } from "db://assets/scripts/framework/managers/App";
import { BattleRewardDropItemVo } from "../../../../gameModel/data/BattleRewardDropItemVo";
import { $Tables } from "../../../../gameModel/table/$Tables";
import { ItemCFG } from "../../../../gameModel/table/tableClass/ItemCFG";
import { GameRes } from "../../../../gameModel/setting/GameRes";

export class RenderBattleReward extends GButton {
    private loaderIcon: GLoader;
    private lblName: GTextField;
    private lblCount: GTextField;

    protected onConstruct(): void {
        super.onConstruct();
        this.loaderIcon = this.getChild("loaderIcon") as GLoader;
        this.lblName = this.getChild("lblName") as GTextField;
        this.lblCount = this.getChild("lblCount") as GTextField;
    }

    public setData(data: BattleRewardDropItemVo): void {
        if (!data) {
            return;
        }
        const cfg = App.tableManager.getTable($Tables.ItemCFG, data.itemId) as ItemCFG;
        if (cfg) {
            this.lblName.text = cfg.Name || "";
            this.loaderIcon.url = GameRes.UI_ICON_PATH || "";
        } else {
            this.lblName.text = "未知道具(" + data.itemId + ")";
            this.loaderIcon.url = GameRes.UI_ICON_PATH || "";
        }
        this.lblCount.text = "x" + (data.count == null ? 0 : data.count);
    }
}
