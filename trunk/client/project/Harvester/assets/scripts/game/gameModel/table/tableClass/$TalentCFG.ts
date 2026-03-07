/**
 * 天赋配置表（手动维护，用于天赋树系统）
 */
export class $TalentCFG {
    public ID: number;
    public TreeId: number;
    public Name: string;
    public Desc: string;
    public Icon: string;
    public Layer: number;
    public PreReqIds: number[];
    public MaxRank: number;
    public EffectIds: number[];
    public X: number;  // 节点X坐标（可选）
    public Y: number;  // 节点Y坐标（可选）
}
