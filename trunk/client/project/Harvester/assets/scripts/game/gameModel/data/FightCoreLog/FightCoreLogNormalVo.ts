import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 常规一行文本 */
export class FightCoreLogNormalVo implements IFightCoreLogSubVo {
    public text: string;

    public constructor(text: string) {
        this.text = text;
    }

    public getLogString(): string {
        return this.text;
    }
}
