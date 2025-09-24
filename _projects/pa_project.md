---
layout: page
title: Power amplifier design
description: An optimization with a surrogate model of Bayesian neural network
img: assets/img/publication_preview/PA.png
importance: 1
category: work
---

The **Power Amplifier (PA)** has become a cornerstone in next-generation wireless systems. With mm-wave frequencies and wideband requirements, PA design is increasingly challenged by stringent specifications, large design spaces, and the computational burden of full-wave electromagnetic simulations.  

Since Bayesian Neural Networks (BNNs) have demonstrated great success as surrogate models in antenna design by effectively replacing Gaussian Processes, it was natural for us to consider applying BNNs to PA design as well. This motivation led to the development of E-GASPAD.

{% include figure.liquid loading="eager" path="assets/img/publication_preview/BNNStructure.png" alt="Overview mock-up of the Portfolio Analytics Platform" class="img-fluid rounded z-depth-1" %}

---

### What makes it different

* **BNN-powered surrogate modeling:** Unlike Gaussian Processes used in prior methods, Bayesian Neural Networks provide faster training and better scalability for high-dimensional design spaces while still offering uncertainty estimates.  

---

### Implementation highlights

**BNN surrogate models** are built locally for candidate designs, achieving up to 50× faster training compared to Gaussian Processes.  

---

### Outcomes

E-GASPAD was validated on two challenging real-world cases:  

- A **27–31 GHz class-AB PA**, where all 7 specifications were met within ~516 simulations (~52 hours), compared to over 1000 simulations for prior methods.  
{% include figure.liquid loading="eager" path="assets/img/publication_preview/PA_Case_1.png" alt="Overview mock-up of the Portfolio Analytics Platform" class="img-fluid rounded z-depth-1" %}

- A **24–31 GHz wideband Doherty PA**, achieving 10 stringent specs across 7 GHz bandwidth in ~574 simulations (~60 hours), demonstrating both speed and design quality.  
{% include figure.liquid loading="eager" path="assets/img/publication_preview/PA.png" alt="Overview mock-up of the Portfolio Analytics Platform" class="img-fluid rounded z-depth-1" %}

Compared to traditional approaches, early trials show:  
* **>2× faster convergence**  
* **Robust handling of ~30 design variables**  
* **First automated method effective across wideband, mm-wave, and complex PA topologies**  

---

E-GASPAD thus represents a leap forward in **AI-driven microwave circuit design**, balancing **optimization ability** and **efficiency** to deliver practical, high-performance PAs at scale.  
