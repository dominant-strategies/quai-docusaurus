---
title: Transaction Ordering
description: Ordering transactions via entropy removal/work.
sidebar_position: 1
---

# Transaction Ordering

Within Quai Network, the order of transactions within a block is determined based on the work done to each transaction, instead of allowing block constructors to order transactions arbitrarily. Allowing block constructors to arbitrarily order transactions inevitably results in ordering based on priority fee, creating malincentives within the network that result in both value extraction from users and the potential for large MEV incentives to disrupt cooperative mining/extension of the chain. 

![Transaction Ordering Diagram](/img/TransactionOrdering.png)

In addition to organizing transactions based on their hash values, the protocol incorporates the work done on each transaction into the overall entropy (weight) of the block. This approach means that blocks containing transactions with a higher amount of work, and therefore lower entropy, are more likely to be recognized as the primary block in the chain. This alignment between transaction ordering and the growth of the longest chain is essential for maintaining network integrity.

This new method of ordering requires careful consideration to prevent potential exploits. If miners can mine transactions independently and include them arbitrarily in future blocks, they could amass a large number of mined transactions to dominate block creation. To counter this, each mined transaction must reference a canonical block as a reference point. The contribution of a transaction's weight to a block's weight diminishes based on the age difference between the transaction's reference block and the block it ends up being included in. This mechanism incentivizes miners to include transactions in their blocks as quickly as possible.

A new data structure (workObject) is added to transactions to accommodate this new ordering mechanism. The workObject includes a variety of fields needed to properly measure both the work done to the transaction, and the number of blocks that have been mined since the reference block.

To see the formula(s) used to objectively determine ordering, visit [the implementation specification for mined transactions (QIP-6)](https://github.com/quai-network/qips/blob/master/qip-0006.md)


