import { EnumFightCoreLogType } from "../enum/EnumFightCoreLogType";

export class FightCoreLogVo {
    public logType:EnumFightCoreLogType;   // 战斗日志类型
    public logData:any;
    public constructor(logType:EnumFightCoreLogType, logData:any) {

    }
}