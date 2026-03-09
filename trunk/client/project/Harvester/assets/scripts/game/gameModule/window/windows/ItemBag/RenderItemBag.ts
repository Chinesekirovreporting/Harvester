import { GButton, GLoader, GTextField } from "fairygui-cc";
import { GameRes } from "../../../../gameModel/setting/GameRes";
import { ItemVo } from "../../../../gameModel/data/ItemVo";
import { ItemCFG } from "../../../../gameModel/table/tableClass/ItemCFG";
import { Color } from "cc";


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

export class RenderItemBag extends GButton {
    private loaderIcon: GLoader;
    private lblName: GTextField;
    private lblCount: GTextField;
    private lblType: GTextField;
    private lblQuality: GTextField;
    private lblDesc: GTextField;

    protected onConstruct(): void {
        super.onConstruct();
        this.loaderIcon = this.getChild("loaderIcon") as GLoader;
        this.lblName = this.getChild("lblName") as GTextField;
        this.lblCount = this.getChild("lblCount") as GTextField;
        this.lblType = this.getChild("lblType") as GTextField;
        this.lblQuality = this.getChild("lblQuality") as GTextField;
        this.lblDesc = this.getChild("lblDesc") as GTextField;
    }

    public setData(itemVo: ItemVo): void {
        if(itemVo == null || itemVo.itemCFG == null) {
            return;
        }
        var cfg:ItemCFG = itemVo.itemCFG;
        this.lblName.text = cfg.Name || "";
        this.lblCount.text = "x" + (itemVo.count ?? 0);
        this.lblType.text = cfg.Type || "";
        this.lblQuality.text = cfg.Quality || "";
        this.lblDesc.text = cfg.Desc || "";

        // 品质颜色
        const color = QUALITY_COLORS[cfg.Quality] ?? 0xFFFFFF;
        this.lblQuality.color = new Color(color);

        // 图标
        // if (cfg.Icon && GameRes.ICON_PATH) {
        //     this.loaderIcon.url = GameRes.ICON_PATH + cfg.Icon;
        // } else {
            this.loaderIcon.url = GameRes.UI_ICON_PATH || "";
        // }
    }
}
