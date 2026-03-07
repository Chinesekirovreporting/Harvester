import { GButton, GLoader, GTextField } from "fairygui-cc";
import { ItemCFG } from "../../../../gameModel/table/tableClass/ItemCFG";
import { GameRes } from "../../../../gameModel/setting/GameRes";

/** 品质颜色映射 (0xRRGGBB) */
const QUALITY_COLORS: Record<string, number> = {
    "白": 0xFFFFFF,
    "普通": 0xFFFFFF,
    "绿": 0x00FF00,
    "蓝": 0x0080FF,
    "紫": 0x8000FF,
    "橙": 0xFF8000,
    "传说": 0xFF8000,
};

export class RenderItem extends GButton {
    private loaderIcon: GLoader;
    private lblName: GTextField;
    private lblType: GTextField;
    private lblSubType: GTextField;
    private lblQuality: GTextField;
    private lblDesc: GTextField;
    private lblStackMax: GTextField;
    private lblPrice: GTextField;

    protected onConstruct(): void {
        super.onConstruct();
        this.loaderIcon = this.getChild("loaderIcon") as GLoader;
        this.lblName = this.getChild("lblName") as GTextField;
        this.lblType = this.getChild("lblType") as GTextField;
        this.lblSubType = this.getChild("lblSubType") as GTextField;
        this.lblQuality = this.getChild("lblQuality") as GTextField;
        this.lblDesc = this.getChild("lblDesc") as GTextField;
        this.lblStackMax = this.getChild("lblStackMax") as GTextField;
        this.lblPrice = this.getChild("lblPrice") as GTextField;
    }

    public setData(itemCFG: ItemCFG): void {
        if (!itemCFG) return;
        this.lblName.text = itemCFG.Name || "";
        this.lblType.text = itemCFG.Type || "";
        this.lblSubType.text = itemCFG.SubType || "";
        this.lblQuality.text = itemCFG.Quality || "";
        this.lblDesc.text = itemCFG.Desc || "";
        this.lblStackMax.text = "堆叠:" + (itemCFG.StackMax == null ? 0 : itemCFG.StackMax);
        this.lblPrice.text = "价格:" + (itemCFG.Price == null ? 0 : itemCFG.Price);

        // 品质颜色
        const color = QUALITY_COLORS[itemCFG.Quality] ?? 0xFFFFFF;
        this.lblQuality.color = color;

        // 图标：优先使用 Cocos 资源路径，否则使用 FairyGUI 默认图标
        if (itemCFG.Icon && GameRes.ICON_PATH) {
            this.loaderIcon.url = GameRes.ICON_PATH + itemCFG.Icon;
        } else {
            this.loaderIcon.url = GameRes.UI_ICON_PATH || "";
        }
    }
}
