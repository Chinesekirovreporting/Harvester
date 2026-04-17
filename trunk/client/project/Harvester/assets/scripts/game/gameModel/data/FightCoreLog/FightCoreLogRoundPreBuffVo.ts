import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

export class FightCoreLogRoundPreBuffVo implements IFightCoreLogSubVo {
    public getLogString(): string {
        return "回合：进入回合前BUFF结算";
    }
}
