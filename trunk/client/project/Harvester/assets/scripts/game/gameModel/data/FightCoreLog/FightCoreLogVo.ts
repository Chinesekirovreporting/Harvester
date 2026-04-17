import { EnumFightCoreLogType } from "../../enum/EnumFightCoreLogType";
import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

export class FightCoreLogVo {
    public logType: EnumFightCoreLogType;
    /** 与 logType 对应的子 Vo，展示文案由 getLogString() 生成 */
    public logData: IFightCoreLogSubVo;

    public constructor(logType: EnumFightCoreLogType, logData: IFightCoreLogSubVo) {
        this.logType = logType; 
        this.logData = logData;
    }

    /** 将节点格式化为界面展示用的一行文字 */
    public getFightCoreLogString(): string {
        return this.logData.getLogString();
    }
}
