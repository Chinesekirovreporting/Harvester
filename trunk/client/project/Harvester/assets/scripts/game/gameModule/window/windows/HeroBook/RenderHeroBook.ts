import { GButton, GComponent, GObject, GTextField } from "fairygui-cc";
import { HeroBookCFG } from "../../../../gameModel/table/tableClass/HeroBookCFG";

export class RenderHeroBook extends GButton {
    private lblName: GTextField;
    private lblType: GTextField;

    // Note: GComponent does not have constructFromXML, should override onConstruct instead
    protected onConstruct(): void {
        super.onConstruct();
        this.lblName = this.getChild("lblName") as GTextField;
        this.lblType = this.getChild("lblType") as GTextField;
    }

    public setData(heroBookCFG: HeroBookCFG): void {
        this.lblName.text = heroBookCFG.Name;
        this.lblType.text = heroBookCFG.Type;
    }

    public dispose(): void {
        super.dispose();
    }
}