import { AbstractUIComponent } from "db://assets/scripts/framework/core/ui/AbstractUIComponent";
import { GComponent, GList } from "fairygui-cc";
import { UICore } from "db://assets/scripts/framework/core/ui/UICore";
import { GameModels } from "../../../../../gameModel/GameModels";
import { RenderFightCoreLog } from "../RenderFightCoreLog";

/**
 * 战斗窗口内：战斗日志列表（listFightCoreLog），逻辑从 WindowFightCore 拆分。
 */
export class UIComFightCoreLog extends AbstractUIComponent {

	private listFightCoreLog: GList;

	public constructor(hostView: GComponent) {
		super(hostView);
        this.initView();
	}

	private initView(): void {
		this.listFightCoreLog = this.view.getChild("listFightCoreLog") as GList;
		this.listFightCoreLog.itemRenderer = this.listFightCoreLogRender.bind(this);
		this.listFightCoreLog.setVirtual();
		this.listFightCoreLog.refreshVirtualList();
	}

	private listFightCoreLogRender(index: number, item: RenderFightCoreLog): void {
		const list = GameModels.fightLog.getFightLogList();
		item.setData(list[index]);
	}

	public updateFightCoreLog(clear: boolean = false): void {
		if (clear == true) {
			this.listFightCoreLog.numItems = GameModels.fightLog.getFightLogList().length;
			return;
		}
	}
}
