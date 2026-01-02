import { Scene, screen } from "cc";
import { Manager } from "./Manager";

export class StageManager extends Manager {
    public scene:Scene
    public screenWidth:number;
    public screenHeight:number;

    public constructor() {
        super();
        this.init()
    }

    protected init():void {
        
    }
}