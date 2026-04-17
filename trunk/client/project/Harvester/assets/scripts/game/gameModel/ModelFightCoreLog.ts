import { AbstractModel } from "./AbstractModel";
import { FightCoreLogAttrChangeVo } from "./data/FightCoreLog/FightCoreLogAttrChangeVo";
import { FightCoreLogDamageLineVo } from "./data/FightCoreLog/FightCoreLogDamageLineVo";
import { FightCoreLogRoundEndVo } from "./data/FightCoreLog/FightCoreLogRoundEndVo";
import { FightCoreLogRoundEnemyVo } from "./data/FightCoreLog/FightCoreLogRoundEnemyVo";
import { FightCoreLogRoundFriendVo } from "./data/FightCoreLog/FightCoreLogRoundFriendVo";
import { FightCoreLogRoundIndexVo } from "./data/FightCoreLog/FightCoreLogRoundIndexVo";
import { FightCoreLogRoundPreBuffVo } from "./data/FightCoreLog/FightCoreLogRoundPreBuffVo";
import { FightCoreLogSkillCastVo } from "./data/FightCoreLog/FightCoreLogSkillCastVo";
import { FightCoreLogStatusDebuffVo } from "./data/FightCoreLog/FightCoreLogStatusDebuffVo";
import { FightCoreLogSystemEnterVo } from "./data/FightCoreLog/FightCoreLogSystemEnterVo";
import { FightCoreLogVo } from "./data/FightCoreLog/FightCoreLogVo";
import { IFightCoreLogSubVo } from "./data/FightCoreLog/IFightCoreLogSubVo";
import { EnumFightCoreLogType } from "./enum/EnumFightCoreLogType";
import { GameModels } from "./GameModels";
import { ModelFightCoreLogEvent } from "./ModelFightCoreLogEvent";

// 战斗日志模型，用于存储战斗日志数据
export class ModelFightCoreLog extends AbstractModel {
    public fightLogList: Array<FightCoreLogVo>;

    constructor() {
        super();
        this.init();
    }

    protected init(): void {
        this.fightLogList = [];
        // this.fightCoreLogDemo();
    }

    public addFightLog(log: FightCoreLogVo): void {
        this.fightLogList.push(log);

    }

    /**
     * 按节点类型追加一条日志。data 为对应类型的子 Vo（见各 FightCoreLog*Vo）。
     */
    public showLogByType(type: EnumFightCoreLogType, data: IFightCoreLogSubVo): void {
        this.addFightLog(new FightCoreLogVo(type, data));
        GameModels.fightLog.emit(ModelFightCoreLogEvent.FIGHT_CORE_LOG_UPDATE, this.fightLogList);
    }

    public getFightLogList(): Array<FightCoreLogVo> {
        return this.fightLogList;
    }

    /** 与策划 Prompt 一致的一条完整示例链，便于联调 UI */
    public fightCoreLogDemo(): void {
        this.clearFightLogList();
        // this.showLogByType(EnumFightCoreLogType.SYSTEM_ENTER_BATTLE, new FightCoreLogSystemEnterVo("试炼林地", "树精护卫"));
        // this.showLogByType(EnumFightCoreLogType.ROUND_ENTER_LOOP, new FightCoreLogRoundIndexVo(1));
        // this.showLogByType(EnumFightCoreLogType.ROUND_PRE_BUFF, new FightCoreLogRoundPreBuffVo());
        this.showLogByType(
            EnumFightCoreLogType.STATUS_DOT_DAMAGE,
            new FightCoreLogDamageLineVo("树精护卫", "灼烧", false, 300, 150, "生命值", true)
        );
        // this.showLogByType(EnumFightCoreLogType.ROUND_FRIEND, new FightCoreLogRoundFriendVo());
        // this.showLogByType(EnumFightCoreLogType.BATTLE_SKILL_CAST, new FightCoreLogSkillCastVo("圣骑士", "狂怒", null));
        // this.showLogByType(EnumFightCoreLogType.ATTR_CHANGE, new FightCoreLogAttrChangeVo("圣骑士", "攻击力", 15));
        // this.showLogByType(EnumFightCoreLogType.ATTR_CHANGE, new FightCoreLogAttrChangeVo("圣骑士", "护甲", -5));
        // this.showLogByType(EnumFightCoreLogType.BATTLE_SKILL_CAST, new FightCoreLogSkillCastVo("圣骑士", "惩击", "树精护卫"));
        // this.showLogByType(
        //     EnumFightCoreLogType.EFFECT_DAMAGE,
        //     new FightCoreLogDamageLineVo("树精护卫", "惩击", true, 300, 100, "生命值", false)
        // );
        // this.showLogByType(EnumFightCoreLogType.STATUS_DEBUFF_APPLY, new FightCoreLogStatusDebuffVo("树精护卫", "灼烧"));
        // this.showLogByType(
        //     EnumFightCoreLogType.EFFECT_DAMAGE,
        //     new FightCoreLogDamageLineVo("树精护卫", "灼烧", false, 50, 50, "生命值", false)
        // );
        // this.showLogByType(EnumFightCoreLogType.ROUND_ENEMY, new FightCoreLogRoundEnemyVo());
        // this.showLogByType(EnumFightCoreLogType.ROUND_END, new FightCoreLogRoundEndVo());
        // this.showLogByType(EnumFightCoreLogType.ROUND_ENTER_LOOP, new FightCoreLogRoundIndexVo(2));
        // this.showLogByType(EnumFightCoreLogType.ROUND_PRE_BUFF, new FightCoreLogRoundPreBuffVo());
    }

    public clearFightLogList(): void {
        this.fightLogList = [];
    }

}
