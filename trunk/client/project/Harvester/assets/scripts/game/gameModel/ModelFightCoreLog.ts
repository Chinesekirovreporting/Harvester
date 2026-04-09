import { AbstractModel } from "./AbstractModel";
import { FightCoreLogVo } from "./data/FightCoreLogVo";

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
    }

    public addFightLog(log:FightCoreLogVo):void {
        this.fightLogList.push(log);
    }

    public getFightLogList():Array<FightCoreLogVo> {
        return this.fightLogList;
    }

    public clearFightLogList():void {
        this.fightLogList = [];
    }
}