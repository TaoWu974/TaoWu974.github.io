---
original_url: /projects/leam/
title: 从设计意图到天线模型
description: 文献复现、参数化建模与天线优化。
topic: 大语言模型
note_type: 研究解读
---

LADS 连接文献复现、参数化建模与天线优化，LEAM 为其开源建模组件。论文以 CST 为平台，将文献描述和图像转化为几何实体、宏脚本与 SB-SADEA 优化配置。

## 方法框架

{% include paper-method.liquid paper="lads" %}

系统包含 11 个 LLM 工具。超宽带案例从十字槽单极子天线出发，由工程师选择结构与材料修改，将槽形改为 H 槽、基板改为 Rogers RT 5880，再优化 12 个设计变量。

## 几何与仿真结果

<div class="paper-figure-grid">
{% include paper-figure.liquid asset="lads-h-slot.png" alt="参数化 H 槽单极子天线几何" caption="生成的 H 槽天线模型。" source="https://eprints.gla.ac.uk/392786/1/392786.pdf" number="5" %}
{% include paper-figure.liquid asset="lads-response.png" alt="H 槽天线反射系数与增益的仿真结果" caption="优化后的反射系数与实现增益；曲线为仿真结果。" source="https://eprints.gla.ac.uk/392786/1/392786.pdf" number="6" %}
</div>

<div class="paper-results"><div><strong>3.1–10.6 GHz</strong><span>目标超宽带频段</span></div><div><strong>0.99 dBi</strong><span>增益变化范围，参考设计为 1.71 dBi</span></div><div><strong>721</strong><span>电磁评估次数，约 12 小时</span></div></div>

第 256 次评估获得可行设计，随后继续降低增益变化，同时维持增益水平。

## 开源实现

论文验证基于 CST。当前 [LEAM 工具包](https://github.com/TaoWu974/LEAM) 另提供 HFSS / PyAEDT 工作流，其支持范围应与论文已验证范围区分。[项目文档](https://taowu974.github.io/LEAM/)。
