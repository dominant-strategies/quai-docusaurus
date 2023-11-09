---
title: Intrinsic Block Weight
description: How blocks are measured and compared in Quai Network.
hide_table_of_contents: false
sidebar_position: 1
---

# Intrinsic Block Weight

**Proof-of-Entropy-Minima (PoEM) measures the exact entropy, or randomness, taken out of the system when each block is formed**. It does this by subtracting the binary log of each block hash (the intrinsic block weight) from the bit field size (maximum length of hash). **By measuring intrinsic block weight, PoEM makes sure every decision between blocks can be made quickly and unanimously**.

In conventional Proof-of-Work systems, block validity is solely determined by whether a block surpasses a difficulty threshold. All blocks that meet this threshold are considered equally valid. This method, however, does not consider the varying amounts of entropy different blocks remove from the system. **In reality, each block demands a unique amount of energy expenditure for its creation. One proposed block can always be seen as "heavier" than the others, except in the extremely rare case of a simultaneous block hash collision**.

Measuring intrinsic block weight gives a more precise view of the actual energy expended when a block is created. By measuring this weight, nodes using the PoEM consensus method can tell any competing blocks apart based on the entropy they remove. Comparing the entropy taken out by each block allows all system nodes to make the same objective decision when picking the next block for the blockchain. **Therefore, given the same data, all network nodes will always agree on the same canonical chain**.

![PoEMHashOverview](/img/PoEMHashOverview.png)

### Calculate Bits of Entropy Removed From System From Intrinsic Block Weight

- **_n_** = Bits of entropy removed from total bit field (approximately: number of leading zeroes found in hash)
- **_l_** = Total bit field of mining algorithm (simply: length of hash)
- **_H_** = Intrinsic block weight (simply: block hash)

$$
n = l - \log_{2}{(H)}
$$
