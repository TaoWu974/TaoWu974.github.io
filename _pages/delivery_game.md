---
layout: research-note
title: Game theory meets reinforcement learning
permalink: /blog/delivery-game/
description: A food-delivery pricing experiment with strategic agents.
topic: Game theory & reinforcement learning
note_type: Early research · EDGE 2022
standalone_note: true
interactive: false
paper_url: https://doi.org/10.1007/978-3-031-23470-5_2
---

An early project outside my main RF-design research: can delivery pricing account for both couriers' earnings and restaurants' preferences, rather than treating price as a decision made by the platform alone?

## A game, not just a prediction

We model pricing as a **Stackelberg game**. A courier-side agent proposes prices first; the restaurant responds with its willingness to purchase delivery services. Couriers want profitable orders, while restaurants weigh price against arrival time. Each side's best choice depends on the other's response.

{% include paper-figure.liquid asset="edge-delivery-system.png" alt="Original delivery-trading system illustration, showing courier offers and restaurant responses" caption="Delivery-trading scenario and agent-mediated interaction." number="1" source="https://doi.org/10.1007/978-3-031-23470-5_2" max_width="420px" %}

## Learning how to adjust the offer

The **Deep Q-Network (DQN)** learns small price adjustments from the current price and purchase intention. Its reward is the change in courier utility, not simply a higher quoted price: an expensive offer is unhelpful if the restaurant no longer wants it.

{% include paper-method.liquid paper="edge-delivery" %}

Game theory describes the strategic interaction; reinforcement learning supplies an adaptive pricing policy within that interaction. Edge computing and a consortium blockchain provide the proposed execution and transaction-recording architecture, rather than being the focus of this note.

## What the experiment suggests

The paper examines a four-courier scenario and a 100-order simulation. Under the modeled conditions, the competition-aware scheme produces more stable prices than the independent-pricing baseline and favors couriers with shorter arrival times.

This is a **simulation-based proof of concept**, not evidence of fairness on a deployed delivery platform. Real orders, heterogeneous delivery requirements and competition across platforms remain outside the validation. The lasting interest for me is the combination: learning a policy when the environment includes other decision-makers who respond to it.
