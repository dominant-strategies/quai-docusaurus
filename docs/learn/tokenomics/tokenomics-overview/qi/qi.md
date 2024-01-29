---
title: Qi
description: An explanation of the Qi token.
sidebar_position: 2
keywords:
  - quai network
  - tokenomics
  - token
  - qi
---

# The Qi Token

Qi is a token designed to enable and scale the use of cryptocurrency as a unit measure and medium of exchange within Quai Network. Qi has a highly responsive and accommodative supply, with an issuance and inflation rate in direct proportion to demand. 

Qi is the native token of the UTXO shards within Quai Network, with fixed denominations and no scripting capabilities.

## Qi Emissions

Qi rewards are issued in direct linear proportion to “hashes” of difficulty, or the expected number of hashes needed to mine a block at the current difficulty. If difficulty rises (the expected number of hashes needed to find a block goes up), the Qi reward of blocks will also begin to rise. Inversely, if the difficulty lowers (the expected number of hashes needed to find a block goes down), the Qi reward of blocks will begin to lower.  

$$
Block Reward_{Qi}  ∝ (Difficulty)
$$ 

Note that there is a proportionality constant/variable in the Qi [block reward](/learn/tokenomics/token-dynamics/block-rewards/block-rewards.md) function above, the exact calculus for which will be shared publicly closer to Mainnet launch.

## Qi Supply

The supply of Qi is determined by the following formula:

$$
Supply_{Qi} = ∑(Emissions_{Qi}) ± ∑(Conversions_{Qi})
$$

The block reward function only defines how many Qi tokens can *potentially* be emitted. Actual, realized supply emissions from [block rewards](/learn/tokenomics/token-dynamics/block-rewards/block-rewards.md) are determined by the choices miners must make to receive only either Quai or Qi, a selection they may change going forward at any time.

In addition to the effects from this new flow of Quai and/or Qi issuance, the respective supply stock of Qi is affected by the [conversion feature between existing Qi and Quai](/learn/tokenomics/token-dynamics/conversions/conversions.md) at the current block mining rewards ratio (e.g. between the # of Quai tokens/block and # of Qi tokens/block), which is accessible to anyone -- not just miners. 

As such, the supply of Qi at any given time is the cumulative result of [miner-selected emissions](/learn/tokenomics/token-dynamics/block-rewards/block-rewards.md) and [token conversions](/learn/tokenomics/token-dynamics/conversions/conversions.md).