import { App } from "../../framework/managers/App";
import { AbstractModel } from "./AbstractModel";
import { GameModels } from "./GameModels";
import { StorageKeys } from "./storage/StorageKeys";
import { TalentCFG } from "./table/tableClass/TalentCFG";

/** 天赋加点存储格式 { treeId: { talentId: rank } } */
export type TalentPointsMap = Record<number, Record<number, number>>;

/** 测试用硬编码天赋数据 */
const TEST_TALENT_LIST: TalentCFG[] = [
    { ID: 101, TreeId: 1, Name: "坚韧", Desc: "增加10%生命上限", Icon: "icon1", Layer: 1, PreReqIds: [], MaxRank: 1, EffectIds: [], X: 100, Y: 50 },
    { ID: 102, TreeId: 1, Name: "精准", Desc: "增加5%暴击率", Icon: "icon1", Layer: 1, PreReqIds: [], MaxRank: 1, EffectIds: [], X: 250, Y: 50 },
    { ID: 103, TreeId: 1, Name: "疾风", Desc: "增加8%攻击速度", Icon: "icon1", Layer: 1, PreReqIds: [], MaxRank: 1, EffectIds: [], X: 400, Y: 50 },
    { ID: 201, TreeId: 1, Name: "铁壁", Desc: "减少15%受到的伤害", Icon: "icon1", Layer: 2, PreReqIds: [101], MaxRank: 2, EffectIds: [], X: 100, Y: 150 },
    { ID: 202, TreeId: 1, Name: "致命一击", Desc: "暴击伤害提升50%", Icon: "icon1", Layer: 2, PreReqIds: [102], MaxRank: 1, EffectIds: [], X: 250, Y: 150 },
    { ID: 203, TreeId: 1, Name: "连击", Desc: "攻击有20%概率触发额外一次攻击", Icon: "icon1", Layer: 2, PreReqIds: [103], MaxRank: 1, EffectIds: [], X: 400, Y: 150 },
    { ID: 301, TreeId: 1, Name: "不屈", Desc: "生命低于30%时获得护盾", Icon: "icon1", Layer: 3, PreReqIds: [201], MaxRank: 1, EffectIds: [], X: 175, Y: 250 },
    { ID: 302, TreeId: 1, Name: "破甲", Desc: "无视敌人20%护甲", Icon: "icon1", Layer: 3, PreReqIds: [202, 203], MaxRank: 1, EffectIds: [], X: 325, Y: 250 },
];

export class ModelTalent extends AbstractModel {
    private _pointsMap: TalentPointsMap = {};

    protected init() {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        // const data = App.cookieManager.get<TalentPointsMap>(StorageKeys.TALENT_POINTS);
        // this._pointsMap = data || {};
    }

    private saveToStorage(): void {
        // App.cookieManager.set(StorageKeys.TALENT_POINTS, this._pointsMap);
    }

    /** 获取天赋列表，可按树筛选 */
    public getTalentList(treeId?: number): TalentCFG[] {
        const list = treeId != null
            ? TEST_TALENT_LIST.filter(t => t.TreeId === treeId)
            : [...TEST_TALENT_LIST];
        return list.sort((a, b) => (a.Layer - b.Layer) || (a.ID - b.ID));
    }

    /** 获取某天赋已点等级 */
    public getTalentRank(treeId: number, talentId: number): number {
        const tree = this._pointsMap[treeId];
        if (!tree) return 0;
        return tree[talentId] || 0;
    }

    /** 某树已消耗点数 */
    public getSpentPoints(treeId: number): number {
        const tree = this._pointsMap[treeId];
        if (!tree) return 0;
        return 0//Object.values(tree).reduce((sum: number, rank: number) => sum + rank, 0);
    }

    /** 获取总可用天赋点（根据等级，每5级1点，测试用默认10点） */
    public getTotalPoints(treeId: number): number {
        const level = GameModels.role.roleLevel ?? 1;
        return Math.max(10, Math.floor(level / 5) * 2);
    }

    /** 剩余可用点数 */
    public getRemainingPoints(treeId: number): number {
        return this.getTotalPoints(treeId) - this.getSpentPoints(treeId);
    }

    /** 是否可学习（前置+点数检查） */
    public canLearn(treeId: number, talentId: number): boolean {
        const cfg = TEST_TALENT_LIST.find(t => t.ID === talentId && t.TreeId === treeId);
        if (!cfg) return false;

        const rank = this.getTalentRank(treeId, talentId);
        if (rank >= cfg.MaxRank) return false;

        const remaining = this.getRemainingPoints(treeId);
        if (remaining <= 0) return false;

        // 检查前置
        if (cfg.PreReqIds && cfg.PreReqIds.length > 0) {
            for (const preId of cfg.PreReqIds) {
                const preRank = this.getTalentRank(treeId, preId);
                const preCfg = TEST_TALENT_LIST.find(t => t.ID === preId);
                const needRank = preCfg ? preCfg.MaxRank : 1;
                if (preRank < needRank) return false;
            }
        }

        return true;
    }

    /** 学习天赋 */
    public learnTalent(treeId: number, talentId: number): boolean {
        if (!this.canLearn(treeId, talentId)) return false;

        if (!this._pointsMap[treeId]) {
            this._pointsMap[treeId] = {};
        }
        const cur = this._pointsMap[treeId][talentId] || 0;
        this._pointsMap[treeId][talentId] = cur + 1;
        this.saveToStorage();
        return true;
    }

    /** 重置某树 */
    public resetTree(treeId: number): void {
        if (this._pointsMap[treeId]) {
            delete this._pointsMap[treeId];
            this.saveToStorage();
        }
    }
}
