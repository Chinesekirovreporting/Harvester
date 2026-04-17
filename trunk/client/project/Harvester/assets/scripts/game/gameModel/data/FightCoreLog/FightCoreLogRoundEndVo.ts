import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

export class FightCoreLogRoundEndVo implements IFightCoreLogSubVo {
    public getLogString(): string {
        return "回合：回合结束";
    }
}
