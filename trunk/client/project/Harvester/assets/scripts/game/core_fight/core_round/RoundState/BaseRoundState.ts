import { RoundBase } from "../RoundBase";

export class BaseRoundState {
    public roundBase:RoundBase;
    constructor(roundBase:RoundBase) {
        this.roundBase = roundBase;
    }

    public enterState():void {
        this.onEnterState();
    }
    public exitState():void {
        this.onExitState();
    }
    public updateState():void {
        this.onUpdateState();
    }
    
    protected onEnterState():void {

    }

    protected onExitState():void {

    }

    protected onUpdateState():void {

    }
}