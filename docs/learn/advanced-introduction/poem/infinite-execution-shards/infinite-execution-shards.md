---
title: Coordinating Infinite Execution Shards
description: How Quai Network organizes many chains into one network.
slug: /infinite-execution-shards
hide_table_of_contents: false
sidebar_position: 3
---

# Coordinating Infinite Execution Shards

Proof-of-Work (PoW) systems, despite their inefficiencies, have been processing transactions and remained coordinated for over 15 years. However, when trying to coordinate multiple work-based blockchains or execution threads simultaneously, the time delay introduced by PoW becomes a significant issue.

**The need for time to establish consensus imposes a lower limit on how quickly chains can be coordinated**. Even in a closely interconnected system, coordination can't happen more frequently than this time limit. For instance, if a single-chain context takes an average of 1 second to reach consensus but needs up to 1,000 seconds in case of fork resolution, cross-chain coordination can only occur every 1,000 seconds or more. The ability to infinitely increase the number of execution shards in a system relies on having zero-time consensus. If consensus isn't immediate, there's a hard limit on the number of execution shards a network can coordinate.

Proof-of-Entropy-Minima (PoEM) offers a solution with its deterministic fork resolution, based on [intrinsic block weight](../instant-fork-resolution/intrinsic-block-weight.md). This allows nodes running the PoEM consensus mechanism to instantly pick the correct chain tip across various execution shards. This ensures all blockchains within the system stay synchronized and work towards a common objective. **PoEM's deterministic method for head selection ensures that all nodes can quickly agree on the canonical chain for each execution shard, reducing the time required to synchronize and validate transactions across the whole network. By removing the time-based nature of fork resolution from consensus, PoEM provides the necessary structure for coordinating infinite execution shards**.

PoEM's ability to coordinate an infinite number of execution shards greatly improves the scalability of distributed ledger technology. **As the demand for Quai transactions increases, PoEM can efficiently manage a growing number of chains or execution shards without compromising network security, performance, or reliability. This capability allows networks like Quai, based on PoEM, to support a broad range of applications and use cases that need high throughput and low latency, while maintaining a robust and secure consensus mechanism**.

Quai Network utilizes a [dynamic sharding](../infinite-execution-shards/dynamic-sharding.mdx) algorithm to facilitate the continuous addition of execution shards in a decentralized manner to meet demand. **Unlike existing blockchain networks that compromise security or per-shard processing capacity as they add shards, the only tradeoff to adding additional execution shards to Quai Network is an increase in [time to global settlement](../infinite-execution-shards/dynamic-sharding.mdx#time-to-global-settlement)**.
