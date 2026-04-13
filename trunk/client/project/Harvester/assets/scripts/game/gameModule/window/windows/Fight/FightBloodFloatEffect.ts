import { EaseType, GComponent, GObject, GTween, GTextField } from "fairygui-cc";
import { GameModules } from "../../../GameModules";
import { DamageResultTable } from "../../../../core_fight/core_attr/FightCalcResultTables/FightCalcResourceTables";

/** 战斗飘血：动态创建 ComBlood，上浮一段时间后销毁 */
export class FightBloodFloatEffect {
    private static readonly PKG = "FightCore";
    private static readonly RES = "ComBlood";
    private static readonly DURATION = 1;
    private static readonly OFFSET_Y = 80;
    private static readonly JITTER = 48;

    public static spawn(host: GComponent, anchor: GComponent, result: DamageResultTable): void {
        if (host == null || anchor == null) {
            return;
        }
        const text = result.isMiss ? "闪避" : Math.floor(result.damage).toString();
        const baseX = anchor.x + anchor.width * 0.5;
        const baseY = anchor.y + anchor.height * 0.25;
        const jitterX = (Math.random() - 0.5) * this.JITTER;
        const obj = GameModules.dynamicUI.addFromPackage(host, this.PKG, this.RES, baseX + jitterX, baseY);
        if (obj == null) {
            return;
        }
        this.applyText(obj, text);
        obj.setPivot(0.5, 0.5, true);
        const startX = obj.x;
        const startY = obj.y;
        const endY = startY - this.OFFSET_Y;
        GTween.to2(startX, startY, startX, endY, this.DURATION)
            .setEase(EaseType.QuadOut)
            .onUpdate((tw) => {
                if (obj.isDisposed) {
                    return;
                }
                obj.setPosition(tw.value.x, tw.value.y);
            })
            .onComplete(() => {
                GameModules.dynamicUI.removeChild(obj, true);
            });
    }

    // 血条飘血效果，更新血条文本
    private static applyText(root: GObject, text: string): void {
        (root as GComponent).getChild("lblBlood").text = text;
        // if (root instanceof GTextField) {
        //     root.text = text;
        //     return;
        // }
        // if (root instanceof GComponent) {
        //     const names = ["lblDamage", "lblTitle", "title", "n0", "txt"];
        //     for (const n of names) {
        //         const ch = root.getChild(n);
        //         if (ch instanceof GTextField) {
        //             ch.text = text;
        //             return;
        //         }
        //     }
        // }
    }
}
