---
layout: page
title: Pixelated Antenna Design
description: XGBoost surrogate–assisted 2-D GA for pixelated antennas
img: assets/img/publication_preview/Pixelated_Antenna.png
importance: 1
category: work
---

The **Pixelated Antenna Design** project shows how an **XGBoost surrogate** plus a **2-D, submatrix-crossover GA** speeds up pixelated antenna design. XGBoost learns the 0/1s → performance mapping, then spend EM time only on candidates that look promising. This surrogate-assisted optimization approach makes **topology-free antenna design** a practical tool for discovering unconventional, high-performance structures.

{% include figure.liquid loading="eager" path="assets/img/publication_preview/Pixelated_Antenna.png" alt="Pixelated antenna (hero demo)" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="300px" %}

---

### Motivation

Pixelization (digitally coded geometry) turns an antenna into an $m \times n$ binary grid (1 = metal, 0 = empty). That invites wild, high-performance shapes—but also **thousands of bits** and **expensive EM runs**. We propose:

- **XGBoost** as a fast, accurate surrogate for binary inputs and continuous EM metrics.  
- A **2-D GA** with **submatrix crossover** that swaps rectangular pixel blocks—so useful geometric motifs survive recombination.  
- **Surrogate-aware model management (SMAS)** to simulate only the most promising designs.

---

### Methodology
The takeaway is that, instead of the popular convolution neural networks with tons of samples, we use a tree-based model to predict one antenna's performance with few samples, then iteratively searches over the binary design space and updates the model to refine its accuracy.

1) **Geometry encoding**  
An $m \times n$ 0/1 matrix defines the pixel mask over the design area.

2) **Surrogate modeling**  
**XGBoost** drives the loop; **CART** and **GBDT** are shown only to explain the idea (single tree → boosted trees → XGBoost). Training updates online as new EM-validated samples arrive.

{% include figure.liquid loading="eager" path="assets/img/publication_preview/CART.jpg" alt="CART (background concept)" class="img-fluid rounded z-depth-1" %}
{% include figure.liquid loading="eager" path="assets/img/publication_preview/GBDT.png" alt="GBDT (background concept)" class="img-fluid rounded z-depth-1" %}

3) **2-D GA with submatrix crossover**  
Pick parent pairs and a random rectangle; **swap the submatrices** to recombine 2-D features. Then apply light mutation (rate $\approx 1/d$, with $d$ = number of pixels). Selection respects **performance + diversity** using a Z-scored **Hamming distance** to the current best—keeping the search curious, not myopic.

{% include figure.liquid loading="eager" path="assets/img/publication_preview/GA operators.png" alt="2-D GA: submatrix crossover & mutation" class="img-fluid rounded z-depth-1" %}

---

### Outcomes

**Example 1 — Full-pixel UWB design (1920 pixels)**  
- Target: match or beat state-of-the-art UWB at the same footprint.  
- Result: **2.9–13.6 GHz** with $\lvert S_{11}\rvert \le -10\,\text{dB}$; **min gain ≈ 2.64 dBi**, **min efficiency ≈ 80.7%**; simulation and measurement align.  
{% include figure.liquid loading="eager" path="assets/img/publication_preview/UWB_original.jpg" alt="UWB baseline (demo)" class="img-fluid rounded z-depth-1" %}

**Example 2 — 5G outdoor base-station (hybrid: conventional + pixelated feeds)**  
- Pixelization only on the **dual feeds** (total **1496** pixels) to sharpen matching and isolation.  
- Result: over **3.3–3.8 GHz** and **4.8–5.0 GHz**: $\max \lvert S_{11}\rvert, \max \lvert S_{22}\rvert \le -14\,\text{dB}$ and $\max \lvert S_{21}\rvert \le -25\,\text{dB}$, with stable patterns and gain.  
{% include figure.liquid loading="eager" path="assets/img/publication_preview/OB_feeding_structure.jpg" alt="OB feeding structure (demo)" class="img-fluid rounded z-depth-1" %}

**Example 3 — Low-resolution ESA (270 pixels) study**  
- Specs: 1 GHz center, $\lvert S_{11}(1\,\text{GHz})\rvert \le -12\,\text{dB}$, efficiency $\ge 6\%$, **maximize bandwidth**.  
- Result: **95 MHz** $(-3\,\text{dB})$ bandwidth, **≈ 6.38%** efficiency.  
- Compute win: feasible design in **~1623 EM** sims on average; standard GA needed **8910** for feasibility and **72,900** to reach a comparable bandwidth.  
{% include figure.liquid loading="eager" path="assets/img/publication_preview/Pixelated_Antenna.png" alt="Pixelated antenna (demo)" class="img-fluid rounded z-depth-1 mx-auto d-block" max-width="300px" %}

---

### Highlights

- **XGBoost + 2-D GA** scales to **high-res binary** design while preserving spatial patterns.  
- **Big EM savings** vs. brute-force GA+EM; strong results on UWB, base-station feeds, and ESA.  
- **Drop-in workflow** for fully pixelated antennas or hybrid pixelated substructures across bands and specs.

---

### Research Significance

- **Miniaturization & Sustainability** – Using less metal and material reduces environmental impact and is critical for weight-sensitive platforms such as satellites.  
- **Matching Enhancement** – Faster and better impedance matching without designing complex matching networks.  
- **Decoupling in Large Arrays** – Mutual coupling reduction enables stronger isolation and higher array performance.
