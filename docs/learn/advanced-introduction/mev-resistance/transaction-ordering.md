---
title: Transaction Ordering
description: Ordering transactions via entropy removal/work.
sidebar_position: 1
---

# Transaction Ordering

Transaction ordering within Quai Network is objectively determined based on the **work done to each transaction**, instead of allowing block constructors to order transactions arbitrarily. Allowing block constructors to arbitrarily order transactions inevitably results in ordering based on priority fee, creating malincentives within the network that result in both value extraction from users and potential for MEV incentives to disrupt cooperative mining and extension of the chain.

![Transaction Ordering Diagram](/img/TransactionOrdering.png)

### Incentive Alignment

In addition to organizing transactions based on their hash values, the protocol incorporates the work done on each transaction into the overall entropy removal (weight) of the block. This approach causes blocks that contain transactions with more work (or entropy removed) having a higher likelihood of being appended to the canonical chain. This alignment between **transaction ordering** and **extension of the least entropic chain** is essential for maintaining network integrity.

### Transaction Aging

This new method of ordering requires careful consideration to prevent potential exploits. If miners can mine transactions independently and include them arbitrarily in future blocks, a malicious miner could amass a large number of mined transactions to dominate block creation. To prevent this, **each mined transaction must reference a canonical block as a reference point**. The contribution of a transaction's weight to a block's weight diminishes based on the age difference between a transaction's reference block and the block it is included in, which incentivizes miners to include transactions in their blocks as quickly as possible.

### Implementation

A new data structure (workObject) is added to transactions to accommodate this new ordering mechanism. The workObject includes a variety of fields used to properly measure both the work done to the transaction, and the number of blocks that have been mined since the reference block.

To see the formula(s) used to objectively determine ordering, visit [the implementation specification for mined transactions (QIP-6)](https://github.com/quai-network/qips/blob/master/qip-0006.md)
