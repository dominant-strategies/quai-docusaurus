---
title: Mined Transactions
description: How entropy can be removed from transactions to affect their ordering.
sidebar_position: 2
---

# Mined Transactions

When ordering transactions based on the amount of work performed on each transaction, a priority fee market is replaced by a new market for hash. Quai miners have the option to supply hash to users that demand MEV resistance on their transactions, creating an additional optional source of revenue for miners. Importantly, miners can still "discover" valid block hashes while mining transactions, and thus don't have to compromise block rewards to benefit from the new hash market. 

As mentioned in the [transaction ordering page of the documentation](/learn/advanced-introduction/mev-resistance/mined-transactions), a new workObject data structure has been added to each transaction to facilitate mined transactions and work-based ordering. The new transaction fields within the workObject are:

| **Field**  | **Field Type** |
| ---------- | ------------   |
| HeaderHash | common.Hash    |
| ParentHash | common.Hash    |
| Number     | big.Int        |
| TxHash     | common.Hash    |
| Nonce      | uint64         |

Mining transactions will take place by grinding the `Nonce` field in the new workObject structure. Once a workObject is found, the block producer will be able to determine if it is a mined transaction or a block based on the entropy threshold achieved. If the work done to/entropy removed from the workObject meets the difficulty threshold/entropy removal threshold for the chain being mined, then the workObject will be identified as a new block. If the entropy removed in the workObject does not exceed the entropy removal threshold for the chain being mined, the workObject will be identified as a mined transaction. Once the workObject has been identified as a block or mined transaction, it can then be combined with either the corresponding Header or Transaction body to create either an mined transaction or a block.

For more technical details on the full process of mining a transaction and for a more in-depth exploration of the game theory , visit the [mined transactions specification (QIP-6)](https://github.com/quai-network/qips/blob/master/qip-0006.md).