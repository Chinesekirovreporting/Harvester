import { ModelAchieve } from "./ModelAchieve";
import { ModelBackpack } from "./ModelBackpack";
import { ModelDreamPet } from "./ModelDreamPet";
import { ModelEquip } from "./ModelEquip";
import { ModelHeroBook } from "./ModelHeroBook";
import { ModelItem } from "./ModelItem";
import { ModelRole } from "./ModelRole";
import { ModelSkill } from "./ModelSkill";
import { ModelTec } from "./ModelTec";
import { ModelTree } from "./ModelTree";

export class GameModels {
    public static role:ModelRole;           // 角色战队
    public static tree:ModelTree;           // 大树
    public static dreamPet:ModelDreamPet;   // 幻兽帮手
    public static tec:ModelTec;             // 科技
    public static achieve:ModelAchieve;     // 成就
    public static heroBook:ModelHeroBook;   // 英雄图鉴
    public static skill:ModelSkill;        // 技能图鉴
    public static item:ModelItem;          // 物品图鉴
    public static backpack:ModelBackpack;   // 背包
    public static equip:ModelEquip;        // 英雄装备

    public static init() {
        GameModels.role = new ModelRole();
        GameModels.tree = new ModelTree();
        GameModels.dreamPet = new ModelDreamPet();
        GameModels.tec = new ModelTec();
        // 加载成就数据
        GameModels.achieve = new ModelAchieve();
        // 加载英雄图鉴数据
        GameModels.heroBook = new ModelHeroBook();
        // 加载技能图鉴数据
        GameModels.skill = new ModelSkill();
        // 加载物品图鉴数据
        GameModels.item = new ModelItem();
        // 加载背包数据
        GameModels.backpack = new ModelBackpack();
        // 加载英雄装备数据
        GameModels.equip = new ModelEquip();
    }
}