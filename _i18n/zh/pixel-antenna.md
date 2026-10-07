---
original_url: /projects/pixel_antenna/
title: 像素化天线设计
description: XGBoost 代理模型辅助的二维遗传算法。
topic: 天线
note_type: 研究解读
---

DC-SADEA 面向高维二进制天线结构，将 XGBoost 代理建模与二维遗传算子结合。矩形子矩阵交叉保留空间模式，代理模型筛选候选结构，再由电磁仿真验证。

## 方法框架

{% include paper-method.liquid paper="dc-sadea" %}

## 样机与验证

{% include paper-figure.liquid asset="dc-prototype.png" alt="1920 像素超宽带天线样机的正反面" caption="1920 像素超宽带天线的制备样机。" source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="6" %}

<div class="paper-results"><div><strong>1920</strong><span>超宽带案例像素数</span></div><div><strong>2.9–13.6 GHz</strong><span>设计工作频段</span></div><div><strong>20 × 30 mm</strong><span>天线平面尺寸</span></div></div>

{% include paper-figure.liquid asset="dc-uwb-validation.png" alt="超宽带天线的仿真与实测对照" caption="反射系数、增益与辐射效率的仿真—实测对照。受设备限制，效率仅测量至 6 GHz。" source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="7" %}

## 户外基站天线

第二个 DC-SADEA 案例采用混合设计：保留传统双椭圆偶极子与反射板，将两组馈电结构像素化，以改善匹配和端口隔离。设计包含 1496 个像素，面向 3.3–3.8 GHz 与 4.8–5.0 GHz 双频段、双线极化工作。

<div class="paper-figure-grid">
{% include paper-figure.liquid asset="dc-base-station-layout.png" alt="户外基站天线整体结构、双椭圆偶极子及正反面像素化馈电区域" caption="5G 户外基站天线结构与像素化馈电区域。" source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="8" %}
{% include paper-figure.liquid asset="dc-base-station-prototype.png" alt="户外基站天线制备样机的正视与俯视照片" caption="基站天线实物样机：正视与俯视图。" source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="10" %}
</div>

## DC-SADEA 验证案例

| 案例        | 设计规模             | 主要结果                                     |
| ----------- | -------------------- | -------------------------------------------- |
| 超宽带天线  | 1920 像素            | 仿真最低增益 2.64 dBi、最低效率 80.7%        |
| 5G 基站馈电 | 1496 像素、14 项指标 | 覆盖 3.3–3.8 与 4.8–5.0 GHz 的匹配及隔离要求 |
| 电小天线    | 270 像素             | −3 dB 带宽：仿真 95 MHz，实测 90 MHz         |

电小天线案例中，五次独立运行平均使用 1623 次电磁评估达到可行性；标准 GA 的单次运行使用 8910 次。该比较对应特定算例与预算，不代表通用加速比。

## 相关应用：像素化寄生结构

[Hua 等在 EuCAP 2026 的另一篇论文](https://eprints.gla.ac.uk/392790/)展示了局部像素化的用法：固定方环槽天线的基础几何，仅优化微带馈线两侧的寄生金属区域。文中将该区域描述为对称的 24 × 24 二进制像素阵列，与馈线边缘保持 0.5 mm 间距。

<div class="paper-figure-grid equal-figures">
{% include paper-figure.liquid asset="uwb-parasitic-pixel-field.png" alt="微带馈线两侧的二进制寄生像素阵列" caption="馈线两侧的像素化寄生区域，基础天线几何保持不变。" source="https://eprints.gla.ac.uk/392790/1/392790.pdf" number="3" %}
{% include paper-figure.liquid asset="uwb-parasitic-optimized.png" alt="SADEA-VI 优化后馈线两侧的金属像素分布" caption="采用 SADEA-VI 得到的寄生金属像素结构。" source="https://eprints.gla.ac.uk/392790/1/392790.pdf" number="4" %}
</div>

作者报告的仿真与实测反射系数在 3.1–10.6 GHz 满足 −10 dB 目标。该案例采用文中标注的 **SADEA-VI**，说明像素编码不仅能用于整体辐射结构和馈电结构，也可用于局部寄生区域的优化。

<p class="paper-source">Qiang Hua, Xinxin Liu, Mobayode O. Akinsolu, Xinrui Wang and Pavlos Lazaridis. <a href="https://eprints.gla.ac.uk/392790/">A Novel Digitally Coded Ultra-Wideband Antenna Optimized by SADEA-VI</a>. EuCAP 2026. 上述寄生结构图提取自该论文接收稿（图 3、图 4），按 CC BY 4.0 标注来源并裁剪排版。</p>

<details class="demo-disclosure"><summary>二维交叉算子原理演示</summary>
{% include interactive-demo.liquid type="pixels" title="保留空间结构" description="以简化网格展示子矩阵交叉与变异，不计算天线性能。" %}
</details>
