---
layout: research-note
title: Equipment anomaly detection and statistical alarms
description: A Roots blower blockage-detection case study.
img: assets/img/publication_preview/PCA_overall.png
importance: 5
category: work
topic: Industrial AI
note_type: Project note
interactive: true
---

This project examines early detection of an inlet-pipe blockage in a Roots blower. The dataset contains eight sensor measurements, more than 450,000 timestamped records, and weak-anomaly observations from operators.

## Data and model comparison

{% include figure.liquid path="assets/img/publication_preview/PCA_overall.png" alt="PCA distribution of the sensor dataset" caption="Feature distribution in the project dataset." class="img-fluid rounded" %}

Logistic regression, a neural-network classifier, random forest, GBDT, SVDD and KNN all achieved 100% accuracy on the validation set. This classification result does not establish warning timeliness or the false-alarm rate in deployment.

## From predictions to warnings

A Poisson hypothesis test on daily anomaly counts converts classifier outputs into an alarm decision. KNN triggered on December 13, nearly one month before the blockage alarm, matching weak-anomaly entries in the maintenance log.

{% include figure.liquid path="assets/img/publication_preview/Daily_prediction_counts.png" alt="Daily anomaly predictions and alarm thresholds for the compared models" caption="Original project figure: comparing warning times." class="img-fluid rounded" %}

<details class="demo-disclosure"><summary>Explore the Poisson threshold</summary>
{% include interactive-demo.liquid type="alarm" title="Background rate and alarm threshold" description="Adjust the assumed rate and significance level. The displayed counts are synthetic." caption="A single-day teaching example under a fixed background rate. Repeated monitoring also requires checks for multiple testing, count dependence and background drift." %}
</details>

## Beyond this case

Anomaly detection can inform statistical process control and model predictive control. Transfer to manufacturing requires separate validation of temporal generalization, rare faults, uncertainty calibration and control safety. This case demonstrates equipment warning, not a validated closed-loop semiconductor-fab controller.
