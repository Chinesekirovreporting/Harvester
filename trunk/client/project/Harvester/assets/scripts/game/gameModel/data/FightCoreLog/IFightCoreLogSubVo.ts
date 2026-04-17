/** 战斗核心日志条目的结构化数据，需能格式化为界面展示用的一行文字 */
export interface IFightCoreLogSubVo {
    getLogString(): string;
}
