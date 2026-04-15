import { EnumFightCoreLogType } from "../enum/EnumFightCoreLogType";

export class FightCoreLogVo {
    public logType:EnumFightCoreLogType;   // 战斗日志类型
    public logData:any;
    public constructor(logType:EnumFightCoreLogType, logData:any) {
        this.logType = logType;
        this.logData = logData != null ? logData : "默认战斗日志数据";
    }

    public getFightCoreLogString():string {
        return "战斗日志详情"
    }
}