import { GButton, GComponent, GObject, GTextField } from "fairygui-cc";
import { HeroBookCFG } from "../../../../gameModel/table/tableClass/HeroBookCFG";

export class RenderHeroBook extends GButton {
    private txtTitle: GTextField;

    // Note: GComponent does not have constructFromXML, should override onConstruct instead
    protected onConstruct(): void {
        super.onConstruct();
        this.txtTitle = this.getChild("title") as GTextField;
    }

    public setData(heroBookCFG: HeroBookCFG): void {
        this.txtTitle.text = heroBookCFG.Name;
    }

    public dispose(): void {
        super.dispose();
    }
}