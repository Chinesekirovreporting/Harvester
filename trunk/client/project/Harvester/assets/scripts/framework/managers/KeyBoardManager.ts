import { EventKeyboard, Input, KeyCode, input, macro } from "cc";
import { Manager } from "./Manager";
import { App } from "./App";

export class KeyBoardManager extends Manager {
    // 是否被点击
    public isLeftPressed = false;  
    public isRightPressed = false;  
    public isUpPressed = false;  
    public isDownPressed = false;  
    public isJumpPressed = false;  

    public constructor() {
        super();
        this.init()
    }

    protected init():void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    public destory():void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    // 键盘按下事件处理函数  
    private onKeyDown(event: EventKeyboard) {  
        switch (event.keyCode) {  
            case KeyCode.KEY_A:
                console.log('Release a key');
                break;
            // 添加其他按键监听  
        }  
    }  


    // 键盘释放事件处理函数  
    private onKeyUp(event: EventKeyboard) {  
        switch (event.keyCode) {  
            case KeyCode.KEY_A:
                console.log('Release a key');
                break;
        }  
    }
}