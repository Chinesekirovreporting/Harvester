图标资源目录 - 混合方案

支持两种图标来源：
1. ui:// - FairyGUI 包内资源（在 FairyGUI 编辑器中创建 Icon 包）
2. icon/ - 本目录下的外部资源

子目录说明：
- skill/  技能图标，如 skill_fireball.png
- item/   道具图标，如 item_potion_hp.png
- hero/   英雄图标，如 hero_001.png
- common/ 通用图标（无类型前缀时使用）

配置表 Icon 字段可填：
- 短名：skill_fireball -> 自动加载 icon/skill/skill_fireball
- 完整路径：icon/skill/skill_fireball
- FairyGUI：ui://包ID/资源ID
