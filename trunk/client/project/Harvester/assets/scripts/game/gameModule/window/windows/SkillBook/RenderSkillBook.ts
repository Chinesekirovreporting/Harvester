import { GButton, GLoader, GTextField } from "fairygui-cc";
import { SkillCFG } from "../../../../gameModel/table/tableClass/SkillCFG";
import { GameRes } from "../../../../gameModel/setting/GameRes";

export class RenderSkillBook extends GButton {
    private loaderIcon: GLoader;
    private lblName: GTextField;
    private lblType: GTextField;
    private lblDesc: GTextField;
    private lblCooldown: GTextField;
    private lblCost: GTextField;

    protected onConstruct(): void {
        super.onConstruct();
        this.loaderIcon = this.getChild("loaderIcon") as GLoader;
        this.lblName = this.getChild("lblName") as GTextField;
        this.lblType = this.getChild("lblType") as GTextField;
        this.lblDesc = this.getChild("lblDesc") as GTextField;
        this.lblCooldown = this.getChild("lblCooldown") as GTextField;
        this.lblCost = this.getChild("lblCost") as GTextField;
    }

    public setData(skillCFG: SkillCFG): void {
        if (!skillCFG) return;
        this.lblName.text = skillCFG.Name || "";
        this.lblType.text = skillCFG.Type || "";
        this.lblDesc.text = skillCFG.Desc || "";
        this.lblCooldown.text = "冷却:" + (skillCFG.Cooldown ?? 0);
        this.lblCost.text = "消耗:" + (skillCFG.Cost ?? 0);
        if (skillCFG.Icon) {
            // 从cocosCreator  resource 目录中加载
            // this.loaderIcon.url = GameRes.SKILL_ICON_PATH + skillCFG.Icon;   -- 确定 可以使用，接下来测试FairyGUI 资源
            this.loaderIcon.url = GameRes.UI_ICON_PATH;
        } else {
            this.loaderIcon.url = "";
        }
    }

    public dispose(): void {
        super.dispose();
    }
}
