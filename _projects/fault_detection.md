---
layout: page
title: From Fault Detection to Data-Driven Control in Foundries
description: How classical ML, SPC/MPC, and Bayesian neural networks power fault detection and data-driven control in semiconductor fabs
img: assets/img/publication_preview/PCA_overall.png
importance: 1
category: work
---

Modern industrial systems—from power plants to chemical process lines—are becoming increasingly complex, tightly coupled, and heavily sensorized.  
Faults today rarely appear as sudden failures; instead, they begin as subtle drifts in multivariate data streams long before operators notice anything unusual. In wafer fabs at TSMC or SMIC, that drift quietly erodes yield long before hard alarms fire, making proactive detection economically critical.

This makes **early fault detection** a central capability in modern industrial AI—and the on-ramp to **data-driven control** (MPC/SPC/APC) in foundries.

In this post, we explore our work on **Roots Blower blockage detection** as a concrete example, compare multiple classical machine-learning models, and discuss how these ideas extend toward **data-driven control in semiconductor manufacturing** through **Fault Detection**, **Model Predictive Control (MPC)**, **Statistical Process Control (SPC)**, and our ongoing research on **Bayesian Neural Networks (BNNs)**—a method with powerful potential for small-sample and out-of-distribution scenarios that map directly to fabs.

---

## A Real-World Case: Roots Blower Blockage Detection

Roots blowers are widely used in flue-gas desulfurization systems.  
In early 2022, a real plant experienced an inlet-pipe blockage incident. Fortunately, the machine was logged with:

- 8 key sensor measurements
- Over **450,000 timestamped records**
- Clear labels for early “weak anomaly” signals observed by operators

The first step was to understand the feature space.  
Below is a PCA visualization of the entire dataset:

{% include figure.liquid loading="eager" path="assets/img/publication_preview/PCA_overall.png" alt="PCA distribution of Roots Blower sensor data" class="img-fluid rounded z-depth-1" %}

This view reveals that the normal state and pre-fault state are **strongly separable**—a promising sign for supervised or semi-supervised learning.

---

## Comparing Classical Machine-Learning Models

We tested six models commonly used in fault detection:

- Logistic Regression  
- Neural Network Logistic Regression  
- Random Forest  
- Gradient Boosting Decision Tree (GBDT)  
- Support Vector Data Description (SVDD, one-class method)  
- **K-Nearest Neighbors (KNN)**

Surprisingly, **all models achieved 100% accuracy on the validation set**, indicating a large separation margin between fault and non-fault samples.

But accuracy is not what matters most.

### What we truly care about:
> **Which model can raise a valid warning earliest—even without labeled data in the long “gray zone” where faults begin evolving?**

To address this, we introduced a **Poisson-based hypothesis test** on the number of predicted anomalies per day.  
This statistical decision boundary allows each model to raise a warning *only when the evidence is strong enough*—a key requirement in industrial SPC contexts.

---

## Results: KNN Gives the Earliest Reliable Warning

The figure below shows the number of predicted anomalies per day for all models, along with each model’s statistically derived alarm threshold.

{% include figure.liquid loading="eager" path="assets/img/publication_preview/Daily_prediction_counts.png" alt="Daily anomaly counts predicted by ML models" class="img-fluid rounded z-depth-1" %}

Among all methods:

- **KNN** issued a warning on **December 13th**, nearly **one month before** the actual blockage alarm.
- This matches the weak anomaly signals operators recorded in the maintenance log.
- Other models also produced early warnings, though generally later than KNN.

This demonstrates that even simple models—when combined with rigorous statistical logic—can serve as robust early-warning systems.

---

## Beyond This Project: The Larger Context

### 🔧 Machine Learning for Fault Detection  
ML has become indispensable for fault detection because:

- It handles **high-dimensional** sensor data
- Learns **nonlinear relationships** missed by physical models
- Provides **early-stage anomaly sensitivity** much greater than classical SPC thresholds
- Supports continuous, real-time decision making

As industrial systems become more automated, ML-based anomaly detection is rapidly replacing rule-based diagnostics.

---

### 📈 ML + Model Predictive Control (MPC)

Modern MPC relies on accurate prediction models.  
ML models—including neural networks and ensemble methods—can learn complex system dynamics that are difficult to model analytically.  
This enables:

- Better short-term predictions  
- Earlier detection of process drift  
- Preventive control actions before a failure escalates  

For nonlinear or poorly modeled systems, ML-enhanced MPC is already becoming standard practice.

---

### 📊 ML + Statistical Process Control (SPC)

Traditional SPC assumes independent, low-dimensional, stationary data—an unrealistic assumption for today’s industrial sensor networks.

ML solves this by:

- Extracting latent features  
- Learning nonlinear manifolds  
- Building adaptive control charts in learned feature spaces  

This fuses the interpretability of SPC with the powerful pattern-recognition capabilities of ML.

---

## From Fault Detection to Data-Driven Control in Fabs

In advanced process control (APC), fabs blend **fault detection**, **SPC**, and **MPC** to keep yield on target:

- Line, tool, and chamber signals feed detection models; SPC logic governs holds and lot quarantines.  
- MPC-like controllers adjust recipes and setpoints with safety margins informed by model uncertainty.  
- Cross-chamber learning and fleet analytics enable rapid drift isolation, minimizing scrap and cycle-time hits.  

The same ML foundations used for early anomaly sensing become the predictive core of closed-loop control when paired with calibrated uncertainty.

---

## Why Bayesian Neural Networks (BNNs) Are the Future

In our earlier research on PA (power-amplifier) and antenna design, **Bayesian Neural Networks** achieved excellent results as surrogate models.  
BNNs have unique advantages that generalize perfectly to fault detection:

### ✔ Strong performance with **small datasets**  
Critical in industrial settings, where faults are rare.

### ✔ Built-in **uncertainty estimation**  
Aligns naturally with control decisions, SPC charts, and risk-aware alarms.

### ✔ Better **out-of-distribution (OOD) robustness**  
A key requirement when systems drift over months.

### ✔ Supports **probabilistic MPC**  
Where future trajectories must include confidence bounds.

These properties mirror what **semiconductor fabs** demand:

- Excursions and killer defects are rare, so models must work with limited, imbalanced labels.  
- Recipe and tool drifts push data OOD; calibrated uncertainty is essential to decide when to hold lots, reroute wafers, or quarantine chambers.  
- Cross-tool transfer learning and predictive maintenance (vacuum pumps, chillers, etch/CMP/litho modules) benefit from models that know what they *don’t* know.  
- In advanced process control (APC) loops, BNN-enabled MPC can steer recipes with confidence bounds, while uncertainty-aware SPC flags subtle drifts without over-triggering holds or scrapping lots.

For systems like Roots Blowers, pumps, compressors, turbines—and high-value wafer fabrication lines at TSMC and SMIC—BNNs are a compelling path to earlier warnings, safer control, and higher yield.

---

## Conclusion

- In this case, classical ML plus SPC logic raised credible early warnings (KNN led).  
- Data-driven control (MPC/SPC) is becoming a practical bridge from detection to action in fabs and other assets.  
- BNNs look promising for small-sample, uncertainty-aware decisions in yield-critical fabs (TSMC, SMIC), but remain an active area of applied research.  

Taken together, these tools suggest a measured path toward more robust, data-driven operations in the fabs.