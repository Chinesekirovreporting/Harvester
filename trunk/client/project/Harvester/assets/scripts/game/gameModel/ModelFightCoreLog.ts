import { AbstractModel } from "./AbstractModel";
import { FightCoreLogVo } from "./data/FightCoreLogVo";
import { EnumFightCoreLogType } from "./enum/EnumFightCoreLogType";

// 战斗日志模型，用于存储战斗日志数据
export class ModelFightCoreLog extends AbstractModel {
    // public fightLogList:Array<FightCoreLog>;   // 战斗日志列表
    public fightLogList:Array<FightCoreLogVo>;                 // 战斗日志列表，用于存储战斗日志数据
    constructor() {
        super();
        this.init();
    }

    protected init() {
        this.fightLogList = [];
        this.fightCoreLogTest();    // 测试战斗日志
    }

    public addFightLog(log:FightCoreLogVo):void {
        this.fightLogList.push(log);
    }

    public showLogByType(type:EnumFightCoreLogType):void {  // 根据类型显示日志
        switch (type) {
            case EnumFightCoreLogType.ENTER_BATTLE:
                break;
            case EnumFightCoreLogType.ENTER_ROUND:
                break;
            case EnumFightCoreLogType.ENTER_SKILL:
                break;
        }
    }

    public getFightLogList():Array<FightCoreLogVo> {
        return this.fightLogList;
    }

    public fightCoreLogTest():void {
        this.addFightLog(new FightCoreLogVo(EnumFightCoreLogType.ENTER_BATTLE, "进入战斗"));
        this.addFightLog(new FightCoreLogVo(EnumFightCoreLogType.ENTER_ROUND, "进入回合"));
        this.addFightLog(new FightCoreLogVo(EnumFightCoreLogType.ENTER_SKILL, "进入技能"));
    }

    public clearFightLogList():void {
        this.fightLogList = [];
    }
}