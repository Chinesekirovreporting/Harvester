import { Manager } from "./Manager";

export class LogManager extends Manager {
    
    public constructor() {
        super();
        this.init()
    }

    public info(str:string):void{
        console.log(str)
    }
}