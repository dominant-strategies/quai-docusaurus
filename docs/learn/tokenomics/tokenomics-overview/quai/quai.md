---
title: Quai
description: An explanation of the Quai token.
sidebar_position: 1
keywords:
  - quai network
  - tokenomics
  - token
  - quai
---

# The Quai Token

Quai is a digitally scarce asset designed to function as a programmable store-of-value within Quai Network. Quai has an effectively fixed supply in the sense that inflation trends toward zero and there will be a terminal supply amount -- however, [this terminal supply amount will be determined by market dynamics, and is not predefined](/learn/tokenomics/token-dynamics/supply-growth/supply-growth.md).  

## [Quai Emissions](/learn/tokenomics/token-dynamics/block-rewards/block-rewards.md)

Quai rewards are issued in proportion to the “bits” of difficulty that a valid block hash achieved, approximately represented by the number of leading zeros in the target value.

$$
Block Reward_{Quai}  ∝ log_{2}(Difficulty)
$$ 

Note that there is a proportionality constant/variable in the Quai block reward function above, the exact calculus for which will be shared publicly closer to Mainnet launch.

## Quai Supply

The supply of Quai is determined by the following formula:

$$
Supply_{Quai} = (Genesis_{Quai}) + ∑(Emissions_{Quai}) ± ∑(Conversions_{Quai})
$$

The block reward function only defines how many Quai tokens can *potentially* be emitted. Actual, realized supply emissions from block rewards are determined by the choices miners must make to receive only either Quai or Qi, a selection they may change going forward at any time.

In addition to the effects from this new flow of Quai and/or Qi issuance, the respective supply stock of Quai is affected by the [initial genesis allocation of Quai](/learn/tokenomics/genesis-allocations/genesis-allocations.md) and the [conversion feature between existing Qi and Quai](/learn/tokenomics/token-dynamics/conversions/conversions.md) at the current block mining rewards ratio (e.g. between the # of Quai tokens/block and # of Qi tokens/block), which is accessible to anyone -- not just miners. 

As such, the supply of Quai at any given time is the cumulative result of the [genesis allocation](/learn/tokenomics/genesis-allocations/genesis-allocations.md), [miner-selected emissions](/learn/tokenomics/token-dynamics/block-rewards/block-rewards.md), and [token conversions](/learn/tokenomics/token-dynamics/conversions/conversions.md).
