import { Method } from "../../utils/Method";

export class LoadItem {
    public url:string;
    public type:LoadType;
    public completeCallBack:Method;

    public constructor($url:string, $type = LoadType.AUTO, $completeCallBack:Method) {

    }
}