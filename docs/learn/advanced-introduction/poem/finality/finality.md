---
title: Faster Finality
description: How transactions achieve finality in Quai Network.
slug: /finality
hide_table_of_contents: true
sidebar_position: 2
---

# Faster Finality

Hash-based blockchains have two kinds of finality: statistical (where a block is known to be canonical unless there's a 51% attack) and economic (where the cost of a 51% attack to roll back the blockchain exceeds the attacker's benefit). Proof-of-Entropy-Minima (PoEM) promises quicker statistical finality than other existing methods, achieved by a more precise measure of the energy used to create a block. **Instead of measuring "work," PoEM measures entropy, a concept rooted in physics**.

PoEM more accurately measures the property that PoW aimed to measure with "work": how much energy was needed to create a proposed block or blockchain. **Since energy is needed to create order (reduce entropy), nodes can always tell which proposed block or blockchain required the most energy to create by looking at the entropy each one reduced**.

## Faster Statistical Finality

Quai Network uses dominant and subordinate blockchains to manage an overarching network, which makes withholding attacks on dominant chains much more impactful than in a single-chain setting. A withholding attack happens when a valid block is not revealed for some time, causing miners to do redundant mining on the previous block.

In Bitcoin, a single-chain system, if an attacking miner finds a block, they could hold it back for around 10 minutes before another valid block is produced that would make the withheld block "stale." Such an attack would have a minimal impact on Bitcoin users, as transactions don't process in between blocks. However, in Quai Network, transactions are processed in subordinate blockchains between dominant Prime blocks. Thus, if Proof-of-Work was used, transactions in subordinate contexts would have no a guarantee of statistical finality without being included in a dominant block.
PoEM solves this issue by measuring entropy removal, a defined physical property, instead of an arbitrary "work" value. This change in measurement shifts consensus in Quai Network from a top-down approach (dominant chains lead and subordinate chains follow) to a bottom-up approach (subordinate chains lead and dominant chains follow). **Under PoEM, subordinate chains remove entropy faster than dominant chains. This drastically reduces the maximum time of a dominant withholding attack, and allows transactions in subordinate chains to achieve statistical finality independent of dominant block inclusion**.

**By calculating total entropy reduction**, [PoEM provides statistical finality at a practical depth of 1 subordinate block (10s)](https://qu.ai). Existing Proof-of-Work systems like Bitcoin may need over 10 minutes to guarantee that data is canonical in the event of a fork. In contrast, Proof-of-Stake systems can't ever truly promise statistical finality because their commitments are subjective, not mathematically scarce.