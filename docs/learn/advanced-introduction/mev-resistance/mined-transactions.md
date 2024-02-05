---
title: Mined Transactions
description: How entropy can be removed from transactions to affect their ordering.
sidebar_position: 2
---

# Mined Transactions

Quai Network's method of ordering transactions based on the amount of work performed on each transaction **replaces the traditional priority fee market with a new market for hash**. Quai miners have the option to supply hash to users that demand MEV resistance for their transactions, creating an **additional source of revenue for miners**. Importantly, miners can still "discover" valid block hashes while mining transactions, and thus won't compromise traditional block rewards by participating in the new hash market.

As mentioned in the [transaction ordering page of the documentation](/learn/advanced-introduction/mev-resistance/mined-transactions), a new `workObject` data structure has been added to each transaction to facilitate mined transactions and work-based ordering. The new transaction fields within the workObject are:

| **Field**  | **Field Type** |
| ---------- | -------------- |
| HeaderHash | common.Hash    |
| ParentHash | common.Hash    |
| Number     | big.Int        |
| TxHash     | common.Hash    |
| Nonce      | uint64         |

Mining transactions will take place by grinding the `Nonce` field in the `workObject`. Once a valid nonce is found, the block producer can determine if it is a mined transaction or a block based on the entropy threshold achieved. If the work done to the workObject meets the difficulty threshold for the chain being mined, then the workObject will be classified as a new block. If the work done to the workObject does not exceed the difficulty threshold for the chain being mined, the workObject will be classified as a mined transaction. Once the workObject has been classified, it can then be combined with the either the corresponding block header to create a block or the transaction body to create a mined transaction.

For more technical details on the full process of mining a transaction and for a more in-depth exploration of the game theory , visit the [mined transactions specification (QIP-6)](https://github.com/quai-network/qips/blob/master/qip-0006.md).
