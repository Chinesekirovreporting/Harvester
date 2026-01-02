import { _decorator, Component, input, Node } from 'cc';
import { GameEngine } from './game/gameEngine/GameEngine';
import { App } from './framework/managers/App';
const { ccclass, property } = _decorator;

@ccclass('GameInit')
export class GameInit extends Component {
    onLoad(): void {
        App.inst.startApp(this.node.scene, this);   // 初始化框架 启动管理类 
        console.log("启动管理类")
        GameEngine.initGameEngine(this.node.scene);   // 启动游戏引擎
    }

    start() {
        
    }

    update(deltaTime: number) {
        App.inst.updateTick(deltaTime*1000);
    }
}