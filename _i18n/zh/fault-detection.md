---
original_url: /projects/fault_detection/
title: 设备异常检测与统计预警
description: 罗茨鼓风机堵塞检测案例。
topic: 工业机器学习
note_type: 应用笔记
---

本案例研究罗茨鼓风机进气管堵塞的早期识别。数据包含 8 类传感器测量、45 万余条时间记录，以及操作人员记录的弱异常信号。

## 数据与模型

{% include figure.liquid path="assets/img/publication_preview/PCA_overall.png" alt="传感器数据的 PCA 分布" caption="项目数据的特征分布。" class="img-fluid rounded" %}

比较逻辑回归、神经网络、随机森林、GBDT、SVDD 与 KNN。六类模型在验证集上均达到 100% 分类准确率，但该指标不能说明预警是否及时，也不能据此判断生产环境中的误报率。

## 预警判定

以每日异常预测计数进行泊松假设检验，将模型输出转化为统计告警。KNN 于 12 月 13 日触发预警，比实际堵塞告警提前近一个月，与维护记录中的弱异常信号吻合。

{% include figure.liquid path="assets/img/publication_preview/Daily_prediction_counts.png" alt="各模型每日异常预测计数及阈值" caption="项目原图：比较各模型的告警时点。" class="img-fluid rounded" %}

<details class="demo-disclosure"><summary>泊松告警阈值演示</summary>
{% include interactive-demo.liquid type="alarm" title="背景率与告警阈值" description="调整背景异常率与显著性水平，观察单日检验阈值。图中使用合成计数。" caption="固定背景率下的教学示例，不复现项目数据；连续监测还需评估重复检验、计数相关性及背景漂移。" %}
</details>

## 从检测到控制

异常检测可为统计过程控制（SPC）与模型预测控制（MPC）提供状态信息。向晶圆制造等场景迁移时，仍需验证时间外泛化、稀有故障识别、不确定性校准和控制安全性。本案例仅验证设备预警，不构成晶圆厂闭环控制的实证结果。
