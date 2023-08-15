---
title: Calculating Total Entropy
description: How total entropy accumulates in Quai Network.
slug: /total-entropy
hide_table_of_contents: false
sidebar_position: 2
---

# Calculating Total Entropy

Proof-of-Entropy-Minima (PoEM), while inspired by and based on Proof-of-Work (PoW), differs in a few critical ways. **Instead of measuring "work," PoEM measures entropy, a concept rooted in physics. By measuring entropy reduction, PoEM gives nodes a better idea of how much energy was used to create a block**.

PoEM more accurately measures the property that PoW aimed to measure with "work": how much energy was needed to create a proposed block or blockchain. How much entropy is reduced in the system by a block or blockchain is the opposite of how much entropy is created outside of it. **Since energy is needed to create order (reduce entropy), nodes can always tell which proposed block or blockchain used the most energy by looking at the entropy each one reduced**.

Total entropy is a better measure of accumulated energy expenditure than total difficulty. Both measure how unlikely a series of related events are. However, total entropy is calculated geometrically, meaning it multiplies events together. In contrast, PoW's total difficulty is calculated linearly, meaning it adds events together.

The starting point for the calculation of entropy change is the bits of entropy removed from a block. This is computed using a measure of [intrinsic block weight](./intrinsic-block-weight.md).

![TotalEntropy](../../../../../static/img/TotalEntropy.png)

## Calculate Change in Entropy

- **_ΔS_** = Number of possible states removed from the macrostate (simply: change in entropy)
- **_n_** = Bits of entropy removed from total bit field (approximately: number of leading zeroes found in hash)

$$
\Delta S = \frac{1}{2^{n}}
$$

## Calculate Total Entropy

- **Sₖ** = Total number of possible states removed from the macrostate at block k (simply: total entropy at block k)
- **Sₖ₋₁** = Total number of possible states removed from the macrostate at block k-1 (simply: total entropy at block k-1)
- **ΔSₖ** = Number of possible states removed from the macrostate in block k (simply: change in entropy)

$$
S_{k} = S_{k-1} * \Delta S_{k}
$$

## Calculate Total Entropy Using Bits

In reality, cumulatively measuring and storing Sₖ (the full value of total entropy) is impractical due to its exponential growth. Within only a few blocks, Sₖ becomes difficult for nodes to store and manipulate. Thus, in Quai Network, the calculation of entropy is represented in bits. In practice, entropy is calculated by taking a summation of logs, which allows total entropy to be stored as a linearly-growing value instead of an exponentially-growing value.

When utilizing this logarithmic compression, an arbitrary precision value can be selected which retains all necessary information while practically preventing hash collisions. Presently, Quai Network utilizes 64 bits of precision when calculating and storing total entropy.

- **Sᵇₖ** = Total bits of entropy removed from the system at block k
- **Sᵇₖ₋₁** = Total bits of entropy removed from the system at block k-1
- **ΔSᵇₖ** = Bits of entropy removed from the system in block k

$$
S_{k}^{b} = S_{k-1}^{b} + \Delta S_{k}^{b}
$$
