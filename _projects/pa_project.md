---
layout: research-note
title: Power amplifier design
description: BNN-assisted layout optimization with EM and harmonic-balance validation.
img: assets/img/papers/pa-doherty-layout.png
importance: 2
category: work
topic: Optimization
interactive: false
paper_url: https://eprints.gla.ac.uk/329166/
---

E-GASPAD combines local Bayesian neural network surrogates with a hybrid evolutionary search for layout-level power-amplifier design. The aim is to satisfy a complete set of RF specifications using costly EM and harmonic-balance evaluations, without requiring a high-quality initial design.

## Method

{% include paper-method.liquid paper="e-gaspad" %}

Local BNN models screen candidate designs. Local refinement improves promising solutions; a global phase and population reconstruction maintain diversity. The implementation connects MATLAB optimization to ADS / Momentum using parameterized subcircuits and AEL scripts.

## A wideband Doherty layout

{% include paper-figure.liquid asset="pa-doherty-layout.png" alt="Doherty power-amplifier layout with named design variables" caption="The 24–31 GHz Doherty MMIC layout. The study optimizes 31 design variables against 10 specifications." source="https://eprints.gla.ac.uk/329166/1/329166.pdf" number="9" %}

## Convergence and RF performance

{% include paper-figure.liquid asset="pa-convergence.png" alt="Average convergence of E-GASPAD and GASPAD for the class-AB case" caption="Average convergence across four runs in the class-AB example; the objective measures specification violation." source="https://eprints.gla.ac.uk/329166/1/329166.pdf" number="7" %}

| Case               | Variables / specifications | Mean full evaluations | Mean elapsed time |
| ------------------ | -------------------------- | --------------------- | ----------------- |
| 27–31 GHz class-AB | 27 / 7                     | 516                   | 52 h              |
| 24–31 GHz Doherty  | 31 / 10                    | 574                   | 60 h              |

The means are reported over four independent runs per case.

{% include paper-figure.liquid asset="pa-doherty-response.png" alt="Simulated gain and power-added efficiency of the optimized Doherty design" caption="Simulated large-signal gain and power-added efficiency across the Doherty operating band. The PA validation in this paper is simulation-based." source="https://eprints.gla.ac.uk/329166/1/329166.pdf" number="10" %}
