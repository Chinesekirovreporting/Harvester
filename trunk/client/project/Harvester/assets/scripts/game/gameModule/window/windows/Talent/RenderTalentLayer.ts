import { GComponent, GList } from "fairygui-cc";
import { GameModels } from "../../../../gameModel/GameModels";
import { RenderTalentNode } from "./RenderTalentNode";

export class RenderTalentLayer extends GComponent {

    private listTalent:GList;

    protected onConstruct(): void {
        super.onConstruct();
        this.listTalent = this.getChild("listTalent") as GList;
        // this.listTalent.setVirtual();
        // this.listTalent.itemRenderer = this.listTalentItemRenderer.bind(this);
    }

    private listTalentItemRenderer(index: number, item: RenderTalentNode): void {
        // const talentCFG = GameModels.talent.getTalentList(DEFAULT_TREE_ID)[index];
        // if (!talentCFG) return;
        // item.setData(talentCFG);
    }

    public setData(data: any):void {
        
    }
}