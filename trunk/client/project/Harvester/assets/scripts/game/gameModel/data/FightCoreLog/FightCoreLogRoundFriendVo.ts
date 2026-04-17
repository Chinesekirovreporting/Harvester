import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

export class FightCoreLogRoundFriendVo implements IFightCoreLogSubVo {
    public getLogString(): string {
        return "回合：进入友方回合";
    }
}
