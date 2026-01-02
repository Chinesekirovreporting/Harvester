import { EventTarget } from "cc";
import { IManager } from "./IManager";

export class Manager extends EventTarget implements IManager {
    public constructor() {
        // this.init();
        super();
    }

    protected init():void {

    }

    public update(deltaTime:number):void {
        
    }

    public destory(): void {
        
    }
}