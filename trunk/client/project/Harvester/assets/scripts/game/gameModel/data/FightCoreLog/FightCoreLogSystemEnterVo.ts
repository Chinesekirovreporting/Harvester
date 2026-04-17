import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 系统：进入战场，「场景」，遭遇「敌人」 */
export class FightCoreLogSystemEnterVo implements IFightCoreLogSubVo {
    //  场景名称
    public sceneName: string;
    //  敌人名称
    public enemyName: string;

    public constructor(sceneName: string, enemyName: string) {
        this.sceneName = sceneName;
        this.enemyName = enemyName;
    }

    public getLogString(): string {
        return `系统：进入战场，"${this.sceneName}"，遭遇「${this.enemyName}」`;
    }
}
