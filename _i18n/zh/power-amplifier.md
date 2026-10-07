---
original_url: /projects/pa_project/
title: 功率放大器设计
description: 局部 BNN 代理建模与版图级混合搜索。
topic: 优化
note_type: 研究解读
---

E-GASPAD 将局部贝叶斯神经网络（BNN）与混合进化搜索结合，在版图级联合优化功率放大器的多项射频指标。通过电磁与谐波平衡仿真评估候选设计，降低对高质量初始方案的依赖。

## 方法框架

{% include paper-method.liquid paper="e-gaspad" %}

局部 BNN 根据邻近样本建立预测模型，用不确定性辅助候选预筛选；局部搜索改进性能，全局搜索与种群重构保持多样性。MATLAB 优化器通过 AEL 脚本连接 ADS / Momentum。

## 宽带 Doherty 版图

{% include paper-figure.liquid asset="pa-doherty-layout.png" alt="宽带 Doherty 功率放大器的参数化版图" caption="24–31 GHz Doherty MMIC：31 个设计变量、10 项性能指标。" source="https://eprints.gla.ac.uk/329166/1/329166.pdf" number="9" %}

## 收敛与性能

{% include paper-figure.liquid asset="pa-convergence.png" alt="E-GASPAD 与 GASPAD 在 AB 类算例中的平均收敛曲线" caption="AB 类算例四次运行的平均收敛曲线，目标函数衡量指标违约程度。" source="https://eprints.gla.ac.uk/329166/1/329166.pdf" number="7" %}

| 案例              | 变量 / 指标 | 平均完整评估次数 | 平均耗时 |
| ----------------- | ----------- | ---------------- | -------- |
| 27–31 GHz AB 类   | 27 / 7      | 516              | 52 小时  |
| 24–31 GHz Doherty | 31 / 10     | 574              | 60 小时  |

各案例均统计四次独立运行。

{% include paper-figure.liquid asset="pa-doherty-response.png" alt="Doherty 设计的增益与功率附加效率仿真曲线" caption="优化设计在不同频率下的增益与功率附加效率。论文中的功放验证基于仿真。" source="https://eprints.gla.ac.uk/329166/1/329166.pdf" number="10" %}
