---
original_url: /blog/2025/plotly/
title: 代理模型辅助优化：采样与验证
description: 昂贵仿真条件下，如何平衡性能改进与未知区域探索。
topic: 优化
note_type: 方法笔记
---

代理模型利用已有仿真结果近似设计空间，将评估预算集中于有潜力或信息不足的区域。预测用于选择候选点，最终性能仍由仿真验证。

## 序贯采样

{% include interactive-demo.liquid type="surrogate" title="预测、评估与更新" description="逐步增加评估点，观察预测均值与不确定性如何变化。可勾选目标函数进行对照。" %}

示例采用高斯过程，以“预测成本减去不确定性项”的下置信界选择下一点。它用于解释序贯采样，不能替代 E-GASPAD 的 BNN 或 DC-SADEA 的 XGBoost 模型。

## 不确定性与决策

不确定性取决于模型假设与数据覆盖。预测区间较窄不等于设计可行；多指标约束、模型失配和分布变化仍需独立检查。

## 相关研究

[功率放大器设计]({{ '/zh/projects/pa_project/' | relative_url }})采用局部 BNN 与混合搜索；[数字编码天线]({{ '/zh/projects/pixel_antenna/' | relative_url }})采用集成学习与二维遗传算子。两者均通过新增仿真结果更新设计数据库。
