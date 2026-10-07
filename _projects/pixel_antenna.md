---
layout: research-note
title: Pixelated Antenna Design
description: Spatially aware evolutionary optimization of high-dimensional binary antenna layouts.
img: assets/img/papers/dc-prototype.png
importance: 1
category: work
topic: Antennas
interactive: true
paper_url: https://eprints.gla.ac.uk/352578/
---

DC-SADEA addresses a binary geometry problem: preserving useful spatial structure while searching thousands of antenna pixels. XGBoost predicts candidate performance; a bespoke 2-D crossover exchanges rectangular regions rather than flattened vector segments.

## Method

{% include paper-method.liquid paper="dc-sadea" %}

## Prototype and validation

{% include paper-figure.liquid asset="dc-prototype.png" alt="Fabricated UWB antenna, front and back" caption="Fabricated prototype of the 1920-pixel UWB design." source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="6" %}

<div class="paper-results"><div><strong>1920</strong><span>pixels in the UWB example</span></div><div><strong>2.9–13.6 GHz</strong><span>design operating band</span></div><div><strong>20 × 30 mm</strong><span>antenna footprint</span></div></div>

{% include paper-figure.liquid asset="dc-uwb-validation.png" alt="Simulated and measured UWB reflection coefficient, gain and radiation efficiency" caption="Simulation–measurement comparison. Radiation efficiency was measured only up to 6 GHz because of equipment limitations." source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="7" %}

## Outdoor base-station antenna

The second DC-SADEA case uses a hybrid structure: conventional double-oval dipoles and a reflector are retained, while two feeding structures are digitally coded to improve matching and port isolation. The 1496-pixel design covers 3.3–3.8 GHz and 4.8–5.0 GHz with dual-linear polarization.

<div class="paper-figure-grid">
{% include paper-figure.liquid asset="dc-base-station-layout.png" alt="Outdoor base-station antenna geometry, double-oval dipoles and front/back pixel feeding regions" caption="5G outdoor base-station geometry and pixel-coded feeding regions." source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="8" %}
{% include paper-figure.liquid asset="dc-base-station-prototype.png" alt="Fabricated outdoor base-station antenna, front and top views" caption="Fabricated base-station prototype: front and top views." source="https://eprints.gla.ac.uk/352578/2/352578.pdf" number="10" %}
</div>

## DC-SADEA evaluation cases

| Case                       | Scope                          | Reported evidence                                         |
| -------------------------- | ------------------------------ | --------------------------------------------------------- |
| UWB antenna                | 1920 pixels                    | Simulated minimum gain 2.64 dBi; minimum efficiency 80.7% |
| 5G base-station feeds      | 1496 pixels; 14 specifications | Matching and isolation over 3.3–3.8 and 4.8–5.0 GHz       |
| Electrically small antenna | 270 pixels                     | 95 MHz simulated and 90 MHz measured −3 dB bandwidth      |

For the small-antenna case, DC-SADEA reached feasibility in an average of 1623 EM evaluations over five runs. Standard GA used 8910 evaluations in its single run. These budgets describe this benchmark, not a universal speedup.

## Related example: pixel-based parasitic loading

A separate [EuCAP 2026 paper by Qiang Hua, Xinxin Liu, Mobayode O. Akinsolu, Xinrui Wang and Pavlos Lazaridis](https://eprints.gla.ac.uk/392790/) demonstrates another use of digital coding: keep a square-ring slot antenna fixed and optimize a pixelated parasitic region on either side of its microstrip feed. The paper describes a symmetric 24 × 24 binary pixel field, separated from the feed edge by 0.5 mm.

<div class="paper-figure-grid equal-figures">
{% include paper-figure.liquid asset="uwb-parasitic-pixel-field.png" alt="Binary parasitic pixel field on both sides of a microstrip feed" caption="Pixel-based parasitic region around the feed; the baseline geometry remains fixed." source="https://eprints.gla.ac.uk/392790/1/392790.pdf" number="3" %}
{% include paper-figure.liquid asset="uwb-parasitic-optimized.png" alt="Optimized on/off metal pixel pattern beside the microstrip feed" caption="Optimized parasitic metal pattern reported using SADEA-VI." source="https://eprints.gla.ac.uk/392790/1/392790.pdf" number="4" %}
</div>

The authors report simulated and measured reflection coefficients meeting the −10 dB target across 3.1–10.6 GHz. Reported using **SADEA-VI**, this related application illustrates how pixel coding can refine a local parasitic region, as well as an entire radiator or a feeding structure.

<p class="paper-source">Qiang Hua et al. <a href="https://eprints.gla.ac.uk/392790/">A Novel Digitally Coded Ultra-Wideband Antenna Optimized by SADEA-VI</a>. EuCAP 2026. Parasitic-structure figures are cropped from the accepted manuscript (Figs. 3 and 4), attributed under CC BY 4.0.</p>

<details class="demo-disclosure"><summary>Explore the submatrix crossover</summary>
{% include interactive-demo.liquid type="pixels" title="Preserve a spatial motif" description="A teaching example of rectangular crossover and mutation. It does not simulate antenna performance." %}
</details>
