import { IFightCoreLogSubVo } from "./IFightCoreLogSubVo";

/** 回合：进入回合 - 第 N 回合循环 */
export class FightCoreLogRoundIndexVo implements IFightCoreLogSubVo {
    public roundIndex: number;

    public constructor(roundIndex: number) {
        this.roundIndex = roundIndex;
    }

    public getLogString(): string {
        const cn = FightCoreLogRoundIndexVo.roundIndexToChinese(this.roundIndex);
        return `回合：进入回合 - 第${cn}回合循环`;
    }

    /** 1～99 转为中文数字（用于「第一回合」） */
    private static roundIndexToChinese(n: number): string {
        if (n <= 0) {
            return String(n);
        }
        const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        if (n < 10) {
            return digits[n];
        }
        if (n === 10) {
            return "十";
        }
        if (n < 20) {
            return "十" + digits[n % 10];
        }
        if (n < 100) {
            const ten = Math.floor(n / 10);
            const one = n % 10;
            return digits[ten] + "十" + (one === 0 ? "" : digits[one]);
        }
        return String(n);
    }
}
