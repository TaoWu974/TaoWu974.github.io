---
layout: research-note
title: From intent to an antenna model
description: Literature-based antenna reconstruction and parameter optimization.
img: assets/img/papers/lads-h-slot.png
importance: 3
category: work
topic: LLMs
interactive: false
paper_url: https://eprints.gla.ac.uk/392786/
code_url: https://github.com/TaoWu974/LEAM
---

LADS connects literature-based antenna reconstruction with parameter optimization. LEAM is its open-source modeling component. The paper demonstrates a CST workflow in which descriptions and figures become parameterized solids, executable macros, and an SB-SADEA optimization setup.

## From literature to a simulation model

{% include paper-method.liquid paper="lads" %}

The system includes 11 LLM tools. Its UWB example reconstructs a cross-slotted monopole, then changes the geometry to an H-slot and the substrate to Rogers RT 5880, with engineers selecting and reviewing the modifications.

## Geometry and simulated response

<div class="paper-figure-grid">
{% include paper-figure.liquid asset="lads-h-slot.png" alt="Parameterized H-slotted monopole geometry" caption="The generated H-slot design has 12 design variables." source="https://eprints.gla.ac.uk/392786/1/392786.pdf" number="5" %}
{% include paper-figure.liquid asset="lads-response.png" alt="Simulated reflection coefficient and realized gain of the H-slotted antenna" caption="Reflection coefficient and realized gain of the optimized design; these are simulated responses." source="https://eprints.gla.ac.uk/392786/1/392786.pdf" number="6" %}
</div>

<div class="paper-results"><div><strong>3.1–10.6 GHz</strong><span>target UWB band</span></div><div><strong>0.99 dBi</strong><span>gain variation, versus 1.71 dBi in the reference</span></div><div><strong>721</strong><span>EM evaluations; about 12 hours</span></div></div>

A feasible design was found after 256 evaluations. The optimization then continued to reduce gain variation while maintaining the gain level.

## Paper and implementation

The published demonstration uses CST. The current [LEAM toolkit](https://github.com/TaoWu974/LEAM) also offers HFSS / PyAEDT modeling workflows; these extensions should be distinguished from the scope validated in the paper. [Documentation](https://taowu974.github.io/LEAM/).
