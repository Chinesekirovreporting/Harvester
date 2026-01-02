import { $WindowConfigSource } from "./tableSource/$WindowConfigSource";

export class Tables {
    public static tableNameList = ["WindowConfig",]

    public static $WindowConfigSource:$WindowConfigSource

    public static initTableSource() {
        this.$WindowConfigSource = new $WindowConfigSource();
    }
} 