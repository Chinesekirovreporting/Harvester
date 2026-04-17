import { GComponent, GTextField } from "fairygui-cc";
import { FightCoreLogVo } from "../../../../gameModel/data/FightCoreLog/FightCoreLogVo";

export class RenderFightCoreLog extends GComponent {
    private lblLog:GTextField;

    protected onConstruct(): void {
        super.onConstruct();
        this.lblLog = this.getChild("lblLog") as GTextField;
    }

    public setData(log: FightCoreLogVo): void {
        if (log != null) {
            this.lblLog.text = log.getFightCoreLogString();
        }
    }
}