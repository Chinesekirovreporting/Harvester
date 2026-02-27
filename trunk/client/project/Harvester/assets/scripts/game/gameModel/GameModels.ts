import { ModelAchieve } from "./ModelAchieve";
import { ModelDreamPet } from "./ModelDreamPet";
import { ModelHeroBook } from "./ModelHeroBook";
import { ModelRole } from "./ModelRole";
import { ModelTec } from "./ModelTec";
import { ModelTree } from "./ModelTree";

export class GameModels {
    public static role:ModelRole;           // 角色战队
    public static tree:ModelTree;           // 大树
    public static dreamPet:ModelDreamPet;   // 幻兽帮手
    public static tec:ModelTec;             // 科技
    public static achieve:ModelAchieve;     // 成就
    public static heroBook:ModelHeroBook;   // 英雄图鉴

    public static init() {
        GameModels.role = new ModelRole();
        GameModels.tree = new ModelTree();
        GameModels.dreamPet = new ModelDreamPet();
        GameModels.tec = new ModelTec();
        // 加载成就数据
        GameModels.achieve = new ModelAchieve();
        // 加载英雄图鉴数据
        GameModels.heroBook = new ModelHeroBook();
    }
}