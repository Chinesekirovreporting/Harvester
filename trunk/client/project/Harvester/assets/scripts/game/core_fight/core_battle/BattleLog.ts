export class BattleLogManager {
    public static logList:any[] = [];
    
    public static clearLogList():void {
        BattleLogManager.logList = [];
    }

    public static addLog( log:string, data:any ):void {
        let logItem:any = {
            log: log,
            data: data
        }
        BattleLogManager.logList.push(log);
    }

    public static getLogList():any[] {
        return BattleLogManager.logList;
    }
}