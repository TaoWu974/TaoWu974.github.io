---
layout: research-note
title: Tunable photonic filters
description: Memetic optimization of superstructure-grating phase shifts for multi-band photonic filtering.
img: assets/img/papers/photonic-phase-results.png
importance: 4
category: work
topic: Photonics
note_type: Paper companion
interactive: false
paper_url: https://eprints.gla.ac.uk/359591/
---

My contribution to this collaborative study was the **optimization algorithm for the superstructure grating (SSG)**. I adapted an existing self-adaptive differential-evolution approach with memetic local refinement to optimize the grating's phase-shift distribution. The fabricated microring resonator (MRR)–SSG device and measured spectra below are outcomes of the collaboration.

## From coupling-matrix synthesis to grating phase optimization

We found that photonic-filter parameter design shares key **optimization-landscape characteristics with filter coupling-matrix synthesis**: interacting parameters shape the spectrum, good designs satisfying multiple spectral requirements occupy restricted regions, and the landscape contains multiple local optima. Effective search therefore requires finding and preserving useful directions, as well as exploring different regions.

This observation motivates the algorithm transfer. Coupling-matrix synthesis adjusts coupling and resonance parameters to produce a target microwave response; SSG design adjusts phase shifts to control optical interference and produce a target multi-channel spectrum. At the optimization level, both seek a spectrally compliant design through interacting parameters.

| Optimization aspect    | Coupling-matrix synthesis                                                               | SSG phase design                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Design variables       | Coupling coefficients and resonance parameters                                          | Phase shifts at individual grating points                                         |
| Physical mechanism     | Energy coupling between resonators shapes frequency selectivity                         | Relative phases and optical interference shape a multi-channel spectrum           |
| Response evaluation    | Microwave S-parameters                                                                  | Optical transmission spectrum                                                     |
| Design objectives      | Passband matching and stopband suppression                                              | Target-notch uniformity and unwanted-channel suppression                          |
| Parameter interaction  | One coupling or resonance parameter can affect several spectral regions                 | One phase shift can affect the depth and shape of multiple channels               |
| Landscape structure    | Separated narrow valleys containing local optima                                        | A multimodal phase-coupled landscape with restricted spectrally compliant regions |
| Search challenge       | Enter the right valley and preserve useful search directions                            | Identify suitable phase combinations while coordinating multiple channels         |
| Global search strategy | SADEC adapts step sizes and crossover to balance direction preservation and exploration | Apply self-adaptive differential evolution to candidate phase profiles            |
| Local improvement      | Refine parameters within a valley to improve spectral compliance                        | Embed SQP in the evolutionary loop to refine candidate phase profiles             |
| Design output          | A spectrally compliant coupling matrix with the specified topology                      | A grating phase-shift sequence meeting the target spectral requirements           |

We build on the search principles in [Liu, Yang and Lancaster's SADEC work](https://eprints.gla.ac.uk/209561/) (_IEEE TMTT_, 2018), adding memetic refinement to explore candidate regions and improve phase profiles within promising ones.

The optimization uses **periodic-memetic self-adaptive differential evolution (SaDE–SQP)**, with occasional sequential quadratic programming (SQP) refinement of the full population. Embedding population-based search and local improvement in the same optimization loop combines global exploration with local convergence.

{% include paper-method.liquid paper="mrr-ssg" %}

{% include paper-figure.liquid asset="photonic-optimization-overview.png" alt="SSG schematic, memetic optimization loop, optimized phase profiles and simulated spectra" caption="Original method overview: SSG structure, evolutionary loop with occasional SQP, phase profiles and simulated transmission." source="https://eprints.gla.ac.uk/359591/2/359591.pdf" number="1(a–f)" %}

The design objective is to shape the multi-band response, including notch uniformity and suppression of unwanted channels. These phase-profile and simulated-spectrum results are the direct link between the optimization work and the photonic design.

## Device and experimental validation

The collaborative device combines the optimized SSG with an MRR. Resonance alignment and thermal modulation provide channel selection, and the team validates the overall design through device fabrication and spectral measurements.

{% include paper-figure.liquid asset="photonic-device.png" alt="Optical microscope and SEM images of the cascaded MRR–SSG photonic filter" caption="Optical microscope image and SEM detail of the fabricated device. The MRR and SSG have separate microheaters." source="https://eprints.gla.ac.uk/359591/2/359591.pdf" number="2" %}

## Measured spectral switching

{% include paper-figure.liquid asset="photonic-hopping.png" alt="Measured time-resolved optical spectra during thermal modulation" caption="Time-resolved optical spectra under thermal modulation for 5-, 7-, and 9-channel SSG configurations cascaded with an MRR." source="https://eprints.gla.ac.uk/359591/2/359591.pdf" number="4" %}

<div class="paper-results"><div><strong>335 → 670 GHz</strong><span>demonstrated channel-spacing switch</span></div><div><strong>52 → 15 GHz</strong><span>−3 dB linewidth after dual filtering</span></div><div><strong>&gt;30 dB</strong><span>stopband extinction under modulation</span></div></div>

In the five-channel SSG configuration, nine transmitted channels become four within 1540–1568 nm during modulation. The remaining spacing doubles to 670 GHz; outside the SSG range, the 335 GHz spacing persists. This is channel selection, not uniform translation of all passbands.

The paper also validates grating configurations with 670 GHz, 869 GHz and 1.05 THz spacing.
