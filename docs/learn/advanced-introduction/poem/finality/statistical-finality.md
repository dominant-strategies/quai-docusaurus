---
title: Statistical Finality
description: How Quai Network achieves faster statistical finality.
sidebar_position: 2
---

# Statistical Finality

Finality, specified in this context as **"statistical finality"** to differentiate from economic finality, refers to the mathematical certainty that data added to the blockchain is immutable unless there's a 51% attack. The time taken for data to reach statistical finality is the duration needed for the majority of known participants to agree that the data is canonical.

Under PoEM, the statistical finality of subordinate Zone blockchains doesn't depend on the production or inclusion of dominant blocks.

## Calculating the Maximum Duration of a Withholding Attack in Proof-of-Entropy-Minima

The formula for the maximum number of subordinate blocks that the "luckiest" possible Prime block (hash of all zeroes and a single 1 at the end) can be withheld for an still cause a reorg is defined below, where k = maximum number of subordinate blocks that can be reorged by a withholding attack, l = the bit field of the hashing algorithm used for mining, and mt = threshold entropy of the subordinate chain.

$$
k < \frac{l}{m_{t}}
$$

**Assuming a standard 256-bit field with a Zone difficulty/entropy threshold of 25, the longest possible withholding attack in a PoEM system would last about 10 Zone blocks (100 seconds).** This means that if a miner finds a Prime block hash of 63 zeroes followed by a 1, which takes away the maximum possible entropy from the system, that extension of the Prime chain will still be outweighed by the extension of any subordinate Zone within 10 blocks, or approximately 100 seconds, after the block is found.

It's important to note that this calculation depicts the maximum length of an attack under ideal circumstances. **The variable 'k' represents the length of a flawless attack, where each subordinate block removes just enough entropy to be considered valid. In reality, coming across a series of blocks that precisely meet this entropy removal threshold is very unlikely. Hence, the actual length of withholding attacks depends not only on the "luckiness" of the withheld block, but also on the "luckiness" of block production in subordinate chains**. Subordinate blocks often surpass the minimum entropy removal threshold, which further restricts the maximum length of a withholding attack.

PoEM tracks the removal of entropy, which enables short sequences of Zone blocks (1-2 blocks) to outweigh a single held back Prime or Region block. PoEM treats total entropy as a geometric feature, rather than treating "work" as a linear feature. This approach practically eliminates the risk of withholding attacks that could arise from directly measuring the intrinsic weight of a block. As a result, transactions in subordinate contexts can achieve statistical finality independently of their inclusion in a dominant chain. **Statistically, under PoEM, only one in 2^40 blocks will remove enough entropy to ensure a one-block withholding attack. Given a 10-second target Zone block time, a single-block withholding attack is likely to happen about once every 350,000 years**.
