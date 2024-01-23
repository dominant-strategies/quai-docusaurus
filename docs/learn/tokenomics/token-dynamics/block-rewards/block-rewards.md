---
title: Block Rewards
description: An explanation of mining and block rewards in Quai Network.
sidebar_position: 1
keywords:
  - quai network
  - tokenomics
  - token
  - block reward
  - mining reward
---

# Block Rewards

:::info
Note that there are proportionality constants/variables in each of the block reward functions provided below. The exact calculus for these constants/variables will be shared publicly closer to Mainnet launch.
:::

Quai block rewards are proportional to "bits" of difficulty, which can be approximately represented by the number of leading zeros in each hash that "finds" a valid block. Quai has an effectively fixed supply, as [inflation trends towards zero over time](/learn/tokenomics/token-dynamics/supply-growth/supply-growth.md).

$$
Block Reward_{Quai} ∝ log_{2}(Difficulty)
$$ 

Qi block rewards are linearly proportional to "hashes" of difficulty, or the expected number of hashes needed to mine a block at the current difficulty.

$$
Block Reward_{Qi} ∝ (Difficulty)
$$ 

This logarithmic versus linear relationship produces the significant difference between Quai scarcity and Qi expansion. For every doubling (2x) in difficulty or hashes, there is only one added unit (+1) in bits. Over time, this ensures Quai’s scarcity, while Qi is naturally connected to the miner cost of production and thus functions as a loose measure of energy or electricity pricing.

Importantly, these block reward function only defines how many Quai/Qi tokens can *potentially* be emitted. Actual, realized supply emissions from block rewards are determined by the choices miners must make to receive only either Quai or Qi, a selection they may change going forward at any time.

