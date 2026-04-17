import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

export class FightCoreLogRoundEnemyVo implements IFightCoreLogSubVo {
    public getLogString(): string {
        return "回合：进入敌方回合";
    }
}
