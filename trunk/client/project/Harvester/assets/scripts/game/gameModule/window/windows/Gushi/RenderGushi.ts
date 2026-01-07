import { GButton, GComponent, GObject, GTextField } from "fairygui-cc";

export class RenderGushi extends GComponent {
    private txtTitle: GTextField;

    // Note: GComponent does not have constructFromXML, should override onConstruct instead
    protected onConstruct(): void {
        super.onConstruct();
        this.txtTitle = this.getChild("title") as GTextField;
    }

    public setData(gushiVo: any): void {
        this.txtTitle.text = gushiVo.a.toString();
    }

    public dispose(): void {
        super.dispose();
    }
}