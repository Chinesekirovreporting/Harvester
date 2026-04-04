/** 战斗结算掉落项：道具 ID + 数量，展示时与 ItemCFG 对齐 */
export class BattleRewardDropItemVo {
    public itemId: number;
    public count: number;

    constructor(itemId: number, count: number) {
        this.itemId = itemId;
        this.count = count;
    }
}
