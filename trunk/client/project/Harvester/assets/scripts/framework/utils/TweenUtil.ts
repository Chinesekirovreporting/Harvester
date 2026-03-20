// // 使用Cocos Creator的Tween系统

import { EaseType, GObject, GTween } from "fairygui-cc";

// import { Tween } from "cc";
export class TweenUtil {
    /**
     * FairyGUI 弹窗动画 效果大致为放大后回弹效果
     * @param node  FairyGUI 窗口/组件（GObject / GComponent）
     * @param delay 延迟时间（秒）
     * @param callBack 动画完成回调
     */
    public static popout(node: GObject, delay: number, callBack?: () => void):void {
        // 记录当前缩放值，作为动画结束时的目标值
        let scX = node.scaleX;
        let scY = node.scaleY;
        // 先把 scale 设为 0，让组件从「看不见」开始
        node.setScale(0, 0);

        // 创建二维数值补间：从 (0, 0) 到 (scX, scY)，时长 0.2 秒
        GTween.to2(0, 0, scX, scY, 0.2)
            .setDelay(delay)           // 先等待 delay 秒再开始动画
            .setEase(EaseType.BackOut) // 使用 BackOut 缓动，结束时会有轻微「回弹」效果
            .onUpdate((tw) => {
                // 每帧把当前插值结果应用到 node 的 scale
                node.setScale(tw.value.x, tw.value.y);
            })
            .onComplete(() => {
                // 动画结束后执行回调（如果有）
                callBack?.();
            });
    }

    /**
     * Q弹效果：缩放弹跳动画 
     * @param node FairyGUI 组件
     * @param t 缩放系数（通常为 1）
     * @param callback 动画结束回调
     */
    public static qTanEffect(node: GObject, t: number, callback?: () => void) {
        let scX = node.scaleX;
        let scY = node.scaleY;
    
        // 第一阶段：放大到 (1.1*t, 0.83*t)
        GTween.to2(scX, scY, 1.1 * t * scX, 0.83 * t * scY, 0.03)
            .setEase(EaseType.Linear)
            .onUpdate((tw) => { node.setScale(tw.value.x, tw.value.y); })
            .onComplete(() => {
                // 第二阶段：放大到 (1.2*t, 1.2*t)
                GTween.to2(1.1 * t * scX, 0.83 * t * scY, 1.2 * t * scX, 1.2 * t * scY, 0.03)
                    .setEase(EaseType.Linear)
                    .onUpdate((tw) => { node.setScale(tw.value.x, tw.value.y); })
                    .onComplete(() => {
                        // 第三阶段：回到 (1*t, 1*t)
                        GTween.to2(1.2 * t * scX, 1.2 * t * scY, 1 * t * scX, 1 * t * scY, 0.03)
                            .setEase(EaseType.Linear)
                            .onUpdate((tw) => { node.setScale(tw.value.x, tw.value.y); })
                            .onComplete(() => { callback?.(); });
                    });
            });
    }

    /**
     * 果冻起手被缩放完毕：从 0 放大后带果冻式抖动 类似于启动宝箱的效果
     * @param node FairyGUI 组件
     * @param t 缩放系数（通常为 1）
     * @param callback 动画结束回调
     */
    public static jellyEffect2(node: GObject, t: number, callback?: () => void) {
        let scX = node.scaleX;
        let scY = node.scaleY;
        node.setScale(0, 0);

        const stages = [
            { to: [1 * t * scX, 1 * t * scY], dur: 0.15 },
            { to: [1.4 * t * scX, 0.53 * t * scY], dur: 0.06 },
            { to: [0.8 * t * scX, 1.2 * t * scY], dur: 0.12 },
            { to: [1.2 * t * scX, 0.7 * t * scY], dur: 0.07 },
            { to: [0.85 * t * scX, 1.1 * t * scY], dur: 0.07 },
            { to: [1 * t * scX, 1 * t * scY], dur: 0.07 },
        ];

        let fromX = 0, fromY = 0;

        const runStage = (index: number) => {
            if (index >= stages.length) {
                callback?.();
                return;
            }
            const s = stages[index];
            GTween.to2(fromX, fromY, s.to[0], s.to[1], s.dur)
                .setEase(EaseType.Linear)
                .onUpdate((tw) => { node.setScale(tw.value.x, tw.value.y); })
                .onComplete(() => {
                    fromX = s.to[0];
                    fromY = s.to[1];
                    runStage(index + 1);
                });
        };
        runStage(0);
    }

    /**
    * 呼吸效果：持续轻微缩放循环
    * @param node FairyGUI 组件
    * @returns GTweener 实例，用于后续 GTween.kill(node) 停止动画
    */
    public static breathEffect(node: GObject): GTween {
        let scX = node.scaleX;
        let scY = node.scaleY;
    
        const tweener = GTween.to2(scX, scY, scX + 0.05, scY + 0.05, 0.8)
            .setTarget(node, "breath")  // propType 用于 GTween.kill(node, false, "breath") 停止
            .setEase(EaseType.QuadInOut)
            .setRepeat(-1, true)      // -1 表示无限循环，yoyo=true 来回往复
            .onUpdate((tw) => { node.setScale(tw.value.x, tw.value.y); });
    
        return tweener;
    }

    /**
     * 脉动效果：小幅度 → 大幅度 的循环缩放
     * 节奏：+0.05 → -0.05 → +0.14 → -0.14 → 停顿 0.5s → 循环
     * @param node FairyGUI 组件
     * @returns 返回 stop 函数，用于停止动画
     */
    public static pulsationEffect(node: GObject): () => void {
        let stopped = false;

        const stages = [
            { delta: [0.05, 0.05], dur: 0.25, ease: EaseType.SineOut },
            { delta: [-0.05, -0.05], dur: 0.25, ease: EaseType.SineOut },
            { delta: [0.14, 0.14], dur: 0.35, ease: EaseType.SineOut },
            { delta: [-0.14, -0.14], dur: 0.35, ease: EaseType.SineIn },
        ];

        const runCycle = () => {
            if (stopped) return;

            const runStage = (i: number, fromX: number, fromY: number) => {
                if (stopped) return;
                if (i >= stages.length) {
                    GTween.delayedCall(0.5).onComplete(runCycle);
                    return;
                }
                const s = stages[i];
                const toX = fromX + s.delta[0], toY = fromY + s.delta[1];
                GTween.to2(fromX, fromY, toX, toY, s.dur)
                    .setEase(s.ease)
                    .onUpdate((tw) => { node.setScale(tw.value.x, tw.value.y); })
                    .onComplete(() => runStage(i + 1, toX, toY));
            };
            runStage(0, node.scaleX, node.scaleY);
        };

        runCycle();
        return () => { stopped = true; };
    }

    /**
    * 单次浮动效果：延迟后先上移再下移，回到原位 类似于技能牌浮动效果
    * @param node FairyGUI 组件
    * @param delay 延迟时间（秒）
    * @param delayCall 延迟结束后、动画开始前的回调
    */
    public static floatEffect(node: GObject, delay: number, delayCall?: () => void) {
       GTween.delayedCall(delay)
           .onComplete(() => {
               delayCall?.();
               const startX = node.x;
               const startY = node.y;
               // 向上移动 10
               GTween.to2(startX, startY, startX, startY + 10, 0.2)
                   .setEase(EaseType.QuadOut)
                   .onUpdate((tw) => { node.setPosition(tw.value.x, tw.value.y); })
                   .onComplete(() => {
                       // 向下移动 10，回到原位
                       GTween.to2(startX, startY + 10, startX, startY, 0.2)
                           .setEase(EaseType.QuadIn)
                           .onUpdate((tw) => { node.setPosition(tw.value.x, tw.value.y); }); 
                   }); 
           }); 
    } 
    
    /**
     * 无限循环浮动效果：持续上下浮动
     * @param node FairyGUI 组件
     * @param offsetY 每次浮动的垂直位移（默认 10）
     * @param duration 单程时长（默认 0.2）
     * @returns 返回 stop 函数，用于停止动画
     */
    public static floatEffectLoop(node: GObject, offsetY: number = 10, duration: number = 2): () => void {
        let stopped = false;

        const runCycle = () => {
            if (stopped) return;

            const startX = node.x;
            const startY = node.y;

            // 向上移动
            GTween.to2(startX, startY, startX, startY + offsetY, duration)
                .setEase(EaseType.QuadOut)
                .onUpdate((tw) => { node.setPosition(tw.value.x, tw.value.y); })
                .onComplete(() => {
                    if (stopped) return;
                    // 向下移动，回到原位
                    GTween.to2(startX, startY + offsetY, startX, startY, duration)
                        .setEase(EaseType.QuadIn)
                        .onUpdate((tw) => { node.setPosition(tw.value.x, tw.value.y); })
                        .onComplete(() => {
                            if (stopped) return;
                            runCycle();  // 下一轮
                        });
                });
        };

        runCycle();
        return () => { stopped = true; };
    }

    /**
     * UI 渐隐效果：点击后淡出消失
     * @param node FairyGUI 窗口/组件（GObject / GComponent）
     * @param duration 渐隐时长（秒），默认 0.3
     * @param callBack 动画完成回调（可在此设置 visible=false 或移除节点）
     */
    public static fadeOut(node: GObject, duration: number = 0.3, callBack?: () => void): void {
        const startAlpha = node.alpha;
        GTween.to(startAlpha, 0, duration)
            .setEase(EaseType.QuadOut)
            .onUpdate((tw) => {
                node.alpha = tw.value.x;
            })
            .onComplete(() => {
                node.alpha = 0;
                callBack?.();
            });
    }

    /**
    * 飞入效果：飞到指定位置，先快后慢 类似于技能牌飞入效果
    * @param node FairyGUI 组件
    * @param toX 目标 X
    * @param toY 目标 Y
    * @param duration 时长，默认 0.35
    * @param callBack 完成回调
    */
    public static flyTo(node: GObject, toX: number, toY: number, duration: number = 0.35, callBack?: () => void): void {
       const startX = node.x;
       const startY = node.y;

       GTween.to2(startX, startY, toX, toY, duration)
           .setEase(EaseType.QuadOut)
           .onUpdate((tw) => { node.setPosition(tw.value.x, tw.value.y); })
           .onComplete(() => {
               node.setPosition(toX, toY);
               callBack?.();
           });
    }

    /**
     * 飞入效果（贝塞尔曲线）：沿曲线飞到目标位置，先快后慢 类似于技能牌飞入效果
     * @param node FairyGUI 组件
     * @param toX 目标 X
     * @param toY 目标 Y
     * @param ctrlX 控制点 X（曲线弯曲程度由控制点决定）
     * @param ctrlY 控制点 Y
     * @param duration 时长，默认 0.35
     * @param callBack 完成回调
     */
    public static flyToBezier(
        node: GObject,
        toX: number,
        toY: number,
        ctrlX: number,
        ctrlY: number,
        duration: number = 0.35,
        callBack?: () => void
    ): void {
        const startX = node.x;
        const startY = node.y;
    
        GTween.to(0, 1, duration)
            .setEase(EaseType.QuadOut)
            .onUpdate((tw) => {
                const t = tw.value.x;
                const u = 1 - t;
                const x = u * u * startX + 2 * u * t * ctrlX + t * t * toX;
                const y = u * u * startY + 2 * u * t * ctrlY + t * t * toY;
                node.setPosition(x, y);
            })
            .onComplete(() => {
                node.setPosition(toX, toY);
                callBack?.();
            });
    };

    // 斗牌技能表现形式1.技能牌缓动四散2.技能牌启动类似启动宝箱的四散坠落3.子弹时间慢动作 
} 