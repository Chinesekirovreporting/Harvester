import { GButton, GLoader, GTextField } from "fairygui-cc";
import { HeroBookCFG } from "../../../../gameModel/table/tableClass/HeroBookCFG";
import { GameRes } from "../../../../gameModel/setting/GameRes";

export class RenderHeroEquip extends GButton {
    private loaderIcon: GLoader;
    private lblName: GTextField;
    private lblType: GTextField;

    protected onConstruct(): void {
        super.onConstruct();
        this.loaderIcon = this.getChild("loaderIcon") as GLoader;
        this.lblName = this.getChild("lblName") as GTextField;
        this.lblType = this.getChild("lblType") as GTextField;
    }

    public setData(heroBookCFG: HeroBookCFG): void {
        if (!heroBookCFG) return;
        this.lblName.text = heroBookCFG.Name || "";
        this.lblType.text = heroBookCFG.Type || "";
        // 英雄图标：HeroBookCFG 无 Icon 字段，使用默认
        this.loaderIcon.url = GameRes.UI_ICON_PATH || "";
    }
}
