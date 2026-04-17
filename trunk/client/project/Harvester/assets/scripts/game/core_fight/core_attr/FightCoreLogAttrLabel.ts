import { EnumAttr } from "./EnumAttr";

/** 战斗日志用：EnumAttr → 展示名 */
export function fightCoreLogAttrLabel(attrType: EnumAttr): string {
    const map: Partial<Record<EnumAttr, string>> = {
        [EnumAttr.HP]: "生命",
        [EnumAttr.CUR_HP]: "当前生命",
        [EnumAttr.MP]: "法力",
        [EnumAttr.CUR_MP]: "当前法力",
        [EnumAttr.ATTACK_POWER]: "攻击强度",
        [EnumAttr.MAGIC_POWER]: "法术强度",
        [EnumAttr.ARMOR]: "护甲",
        [EnumAttr.SHIELD]: "护盾",
        [EnumAttr.MAGIC_RESIST]: "法术抗性",
        [EnumAttr.CRIT_RATE]: "暴击率",
        [EnumAttr.CRIT_DMG]: "暴击伤害",
        [EnumAttr.DODGE_RATE]: "闪避率",
        [EnumAttr.HIT_RATE]: "命中率",
        [EnumAttr.STR]: "力量",
        [EnumAttr.AGI]: "敏捷",
        [EnumAttr.INT]: "智力",
        [EnumAttr.SPI]: "精神",
        [EnumAttr.END]: "耐力",
        [EnumAttr.WIS]: "智慧",
    };
    return map[attrType] ?? `属性${attrType}`;
}
