/**
 * File is automatically generated, Please do not modify
 */
import { TaskCFG } from "./tableClass/TaskCFG";
import { $TaskCFGSource } from "./tableSource/$TaskCFGSource";
import { SubTaskCFG } from "./tableClass/SubTaskCFG";
import { $SubTaskCFGSource } from "./tableSource/$SubTaskCFGSource";
import { AchieveCFG } from "./tableClass/AchieveCFG";
import { $AchieveCFGSource } from "./tableSource/$AchieveCFGSource";
import { SkillCFG } from "./tableClass/SkillCFG";
import { $SkillCFGSource } from "./tableSource/$SkillCFGSource";
import { TestCFG } from "./tableClass/TestCFG";
import { $TestCFGSource } from "./tableSource/$TestCFGSource";
import { WindowCFG } from "./tableClass/WindowCFG";
import { $WindowCFGSource } from "./tableSource/$WindowCFGSource";
import { HeroBookCFG } from "./tableClass/HeroBookCFG";
import { $HeroBookCFGSource } from "./tableSource/$HeroBookCFGSource";
import { ItemCFG } from "./tableClass/ItemCFG";
import { $ItemCFGSource } from "./tableSource/$ItemCFGSource";

export class $Tables {
    public static TaskCFG:string = "TaskCFG";
    public static SubTaskCFG:string = "SubTaskCFG";
    public static AchieveCFG:string = "AchieveCFG";
    public static SkillCFG:string = "SkillCFG";
    public static TestCFG:string = "TestCFG";
    public static WindowCFG:string = "WindowCFG";
    public static HeroBookCFG:string = "HeroBookCFG";
    public static ItemCFG:string = "ItemCFG";

    // 表格集合
    public static tableNameList:string[] = ["TaskCFG", "SubTaskCFG", "AchieveCFG", "SkillCFG", "TestCFG", "WindowCFG", "HeroBookCFG", "ItemCFG"];
    // 类映射
    public static clazzMap:Object = {
        "TaskCFG": TaskCFG,
        "SubTaskCFG": SubTaskCFG,
        "AchieveCFG": AchieveCFG,
        "SkillCFG": SkillCFG,
        "TestCFG": TestCFG,
        "WindowCFG": WindowCFG,
        "HeroBookCFG": HeroBookCFG,
        "ItemCFG": ItemCFG
    }

    public static sourceClazzMap:Object = {
        "$TaskCFGSource": $TaskCFGSource,
        "$SubTaskCFGSource": $SubTaskCFGSource,
        "$AchieveCFGSource": $AchieveCFGSource,
        "$SkillCFGSource": $SkillCFGSource,
        "$TestCFGSource": $TestCFGSource,
        "$WindowCFGSource": $WindowCFGSource,
        "$HeroBookCFGSource": $HeroBookCFGSource,
        "$ItemCFGSource": $ItemCFGSource
    }
}
