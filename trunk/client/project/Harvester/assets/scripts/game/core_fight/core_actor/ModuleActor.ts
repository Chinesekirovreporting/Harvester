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

    /** 友方目标：与 getActorEnemy 对称，取本阵营列表第一人（当前战斗足够用）。TODO: 表文案若需「随机友军」可改为随机或最低血量等策略 */
    public getActorAlly(baseActor:BaseActor):BaseActor {
        if (baseActor.faction == EnumFaction.FRIEND) {
            return GameModules.battle.curBattle.friendActorList[0];
        } else if (baseActor.faction == EnumFaction.ENEMY) {
            return GameModules.battle.curBattle.enemyActorList[0];
        }
        return null;
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