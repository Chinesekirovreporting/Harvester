import { AbstractModule } from "../../../framework/managers/scene/AbstractModule";
import { GameModules } from "../../gameModule/GameModules";
import { BaseActor } from "./BaseActor";
import { EnumFaction } from "./EnumFaction";

export class ModuleActor extends AbstractModule {


    protected init():void {
        console.log("初始化ModuleActor模块");
    }

    public getActorEnemy(baseActor:BaseActor):BaseActor {
        if (baseActor.faction == EnumFaction.FRIEND) {
            return GameModules.battle.curBattle.enemyActorList[0];
        } else if (baseActor.faction == EnumFaction.ENEMY) {
            return GameModules.battle.curBattle.friendActorList[0];
        } else {
            return null;
        }
    }

    protected show():void {
        console.log("ModuleActor Show");
    }

    private update():void {
        // console.log("update", App.timerManager.currentTime);
        // console.log(this.int1++);
    }

    protected remove():void {
        console.log("ModuleActor Remove");
    }
}