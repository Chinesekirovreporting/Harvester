/**
 * File is automatically generated, Please do not modify
 */
import { AchieveCFG } from "./tableClass/AchieveCFG";
import { $AchieveCFGSource } from "./tableSource/$AchieveCFGSource";
import { TestCFG } from "./tableClass/TestCFG";
import { $TestCFGSource } from "./tableSource/$TestCFGSource";
import { WindowCFG } from "./tableClass/WindowCFG";
import { $WindowCFGSource } from "./tableSource/$WindowCFGSource";
import { HeroBookCFG } from "./tableClass/HeroBookCFG";
import { $HeroBookCFGSource } from "./tableSource/$HeroBookCFGSource";

export class $Tables {
    public static AchieveCFG:string = "AchieveCFG";
    public static TestCFG:string = "TestCFG";
    public static WindowCFG:string = "WindowCFG";
    public static HeroBookCFG:string = "HeroBookCFG";

    // 表格集合
    public static tableNameList:string[] = ["AchieveCFG", "TestCFG", "WindowCFG", "HeroBookCFG"];
    // 类映射
    public static clazzMap:Object = {
        "AchieveCFG": AchieveCFG,
        "TestCFG": TestCFG,
        "WindowCFG": WindowCFG,
        "HeroBookCFG": HeroBookCFG
    }

    public static sourceClazzMap:Object = {
        "$AchieveCFGSource": $AchieveCFGSource,
        "$TestCFGSource": $TestCFGSource,
        "$WindowCFGSource": $WindowCFGSource,
        "$HeroBookCFGSource": $HeroBookCFGSource
    }
}
