---
title: MEV Resistance
description: How Quai Network minimizes miner extractable value.
sidebar_position: 2
---

# MEV Resistance

**Miner Extractable Value, or MEV**, occurs when block constructors (miners) have opportunities to profit due to their ability to order transaction within a block. There are many different kinds of MEV, but two of the most common are:

- **Frontrunning**: when a profitable transaction is spotted in the mempool and an identical transaction is created and ordered in front of it
- **Sandwich Attacks**: when transactions are ordered directly before and after a trader's transaction to profit from the price slippage caused by their trade.

Within existing blockchain systems, the mechanisms used to order blocks is different than the mechanism used to order transactions within blocks. Commonly (in work-based systems), while blocks are ordered by work, transactions within each block are subjectively ordered by miners, creating a system where fees/miner bribes can be used to manipulate block ordering (and thus conduct MEV attacks). Quai Network offers MEV resistance by aligning the incentives used for block ordering with the incentives for transaction ordering. 

While MEV has large impacts on users, these conflicts between block and transaction ordering markets can also **damage chain progression and security**. Large MEV opportunities can outweigh block reward incentives, leading miners to compete for MEV rather than cooperatively extending the heaviest/least entropic chain. Implementing one unified market for both block and transaction ordering eliminates this competition, enhancing both the security and finalization speed of the network. To implement a hash-based ordering market, it must govern both transaction and block ordering, removing conflicts between transaction and block progression.

Within this new system of ordering based on work, MEV becomes significantly more difficult, and in many cases, impossible when a transaction is mined with sufficient work. In order to execute a MEV attack (e.g. a sandwich or front-run), a MEV bot would have to mine a transactions to order them in front of/around the targeted transaction. This may seem trivial for transactions which do not have significant amounts of work -- however, the sandwiching attack would require finding a mined transaction which is directly in front of and behind the target transaction. Moreover, any MEV bot would have to execute these attacks in real-time, performing all the necessary work between the point at which the target transaction first appears in a public mempool and when it is included in a block (within Quai, expected to be ~10s or less). As more work is performed on a transaction, it becomes more and more unrealistic for any MEV bot to be able to perform more work than the target transaction in the ~10s timeframe between when the bot is first aware of the MEV opportunity and when the target transaction has been included in a block.

## Transaction Ordering

For transaction ordering, Quai Network utilizes a base fee for processing to function as spam resistance, with transaction order determined by worked transaction hashes. **Transactions are merge-mined with blocks**, and the work done on a transaction dictates its order in a block. The highest work transactions are prioritized. Algorithmically, this involves sorting transaction hashes within each block based on their values, with more worked hashes processed first.

More details on how transactions are ordered inside blocks can be found in the [transaction ordering page](/learn/advanced-introduction/mev-resistance/transaction-ordering) of the documentation.

## Mined Transactions

Transactors looking to achieve MEV resistance will need to mine their transactions due to Quai Network's method of ordering transactions based on work done. While transactions can easily be submitted with the base processing fee and no work done, they will receive no MEV protection and will always be ordered at the end of blocks.

Quai Network's concept of mined transactions creates a new revenue stream/incentive for miners. Miners are able to to supply **hashrate-as-a-service** to users demanding MEV resistance on their transactions, while also checking each hash they generate to see if it meets the difficulty threshold to function as a valid block hash. If a hash is generated while a miner is mining a transaction that meets the difficulty threshold of the slice they are mining, they will be able to propagate that transaction as a valid block.

More information on how transactions are mined and how they function in the network, visit the [mined transactions page](/learn/advanced-introduction/mev-resistance/mined-transactions) of the documentation.
