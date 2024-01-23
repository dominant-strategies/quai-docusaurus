---
title: Token Dynamics
description: An explanation of the emissions, conversions, and supplies of the Quai and Qi tokens.
sidebar_position: 3
keywords:
  - quai network
  - tokenomics
  - supply
  - emissions
  - conversions
  - supply
  - total supply
---

# Token Dynamics

There are a variety of dynamics between the [Quai](/learn/tokenomics/tokenomics-overview/quai/quai.md) and [Qi](/learn/tokenomics/tokenomics-overview/qi/qi.md) tokens that position Quai as an [increasingly-scarce store-of-value](/learn/tokenomics/token-dynamics/supply-growth/supply-growth.md), and Qi as a "flat token," loosely tied to the cost of generating a hash.  

The primary mechanisms used to achieve these features are emissions (primarily through block rewards), conversions (between Qi and Quai), and a highly responsive difficulty algorithm.

## Emissions (Block Rewards)

Quai and Qi block reward emissions are both calculated as functions of a measure of difficulty – or how hard it is to mine a block – but use this measurement of difficulty in drastically different ways. The specific relationships between difficulty and Quai/Qi emissions is explored in detail in the [Block Rewards](/learn/tokenomics/token-dynamics/block-rewards/block-rewards.md) page of the documentation.  

The logarithmic relationship between difficulty and Quai emissions versus the linear relationship between difficulty and Qi emissions produces the significant difference between Quai scarcity and Qi expansion. For every doubling (2x) in difficulty (or "hashes"), there is only one added unit (+1) in bits. Over time, this ensures Quai’s scarcity, while Qi is naturally connected to miners' costs of production, and thus is a measure of energy or electricity pricing.

The ability for miners to select which token (Quai or Qi) they wish to receive their block rewards in ties the emissions of Qi to demand. 

## Conversions

As a mechanism of allowing the supply of Qi to respond rapidly to changes in demand, an arbitrage market is opened by allowing for conversions between Qi and Quai to occur at any time, by any network participant, at a ratio determined by the current Quai and Qi block rewards. 

When demand for Qi falls, arbitrageurs can swap natively from Qi to Quai at the current conversion ratio, reducing the supply of Qi. When demand for Qi rises, more miners will be incentivized to accept their block rewards in Qi rather than Quai, increasing the supply of Qi. The conversion dynamic is explored more in-depth in the [Conversions](/learn/tokenomics/token-dynamics/conversions/conversions.md) page of the documentation.

## Difficulty

At a high level, Quai Network functions similar to most other work-based systems, determining block production (and thus emissions rates) by setting and adjusting block rewards and difficulty. 

Difficulty is adjusted in response to demand-driven miner hashrate changes by proxy through re-normalizing observed block time deviations. While systems such as Bitcoin implement difficulty adjustments at the end of sequential periods and update block rewards over long-term epochs, Quai Network adjusts difficulty on a rolling basis across a previous set of blocks.

When combined with the dual-token model of Quai and Qi, this results in the respective and relative quantities of Quai and Qi token rewards changing - up or down - according to their respective reward functions, with each new block. Quai Network's measurement of difficulty is further explored in the [Difficulty Adjustments](/learn/tokenomics/token-dynamics/difficulty-adjustments/difficulty-adjustments.md) page of the documentation.
