---
title: Hierarchical Structure
description: Detailed specification of Quai Network's hierarchical structure.
hide_table_of_contents: false
sidebar_position: 2
---

# Hierarchical Structure

Quai introduces a new, hierarchical structure of organizing blockchains that scales Proof-of-Work decentralization to handle all of global commerce.

Quai is the first blockchain network to shard state without sharding security, allowing the creation of sub networks to scale decentralized ledger technology without degrading security. The organization of these sub networks incentivizes [optimized network latency](./latency.md), which increases network throughput. Each of Quai's sub networks functions as an independent, asynchronous parallel execution thread. These sub networks are intertwined through [merged mining](../merged-mining/merged-mining.md), functioning as a multithreaded blockchain execution environment. Quai Network maintains interoperable composability across all threads via shared hash linked references between chains, which are known as [coincident blocks](../merged-mining/coincident-blocks.mdx).

Quai's merge-mined hierarchical structure is the first blockchain architecture to ensure trustless interoperability and shared full-network security across sub networks.

## Shard State Without Sharding Security

[Sharding](./sharding.mdx) is potentially a promising method of scaling blockchains. However, traditional implementations of sharding not only split up state, but also split the network security which introduces coordination complexity, risk, and latency in cross shard state updates. Quai Network uses [merged mining](../merged-mining/merged-mining.md), which solves these issues by allowing the base consensus mechanism to both secure and coordinate all shards in a way which maintains traditional hash-based security guarantees.

## Optimized Network Latency

[Network latency](./latency.md) is the primary factor that limits blockchain throughput. Quai Network drastically reduces latency across the network by incentivizing miners to not only produce hash but also minimize network latency. The latency of a miner to their peers directly impacts the profits of the miner through the uncle rate, meaning miners are incentivized to mine the chain with the lowest possible latency. Since Quai miners self-select which shard to mine, miners are incentivized to self-organize into the subnet in which they are least latent, resulting in lower overall network latency and higher throughput.

In addition to optimizing latency, Quai network also increases network performance through the sub-division of nodes into subnets. This allows nodes to group into topological close peers, minimizing ping times while also significantly decreasing the number of hops required for data to propagate in the sub-net and thus the shard. This improvement in network performance can be represented by consideration of the propagation requirements of data in a regular n-by-n graph.

This relationship is described by t = p*n*log_m(n) where t is time to propagation, p is the ping time, n is the number of nodes in the network, and m is the average number of connected peers. For example, when applying this formula to Bitcoin, data would require 8 hops with average measured ping latencies of 100ms. This would make the theoretical fastest propagation of data in the Bitcoin network 800ms. If the network were subdivided into 9 subnets, the number of hops would decrease to 3 while the expected ping times would drop to 10ms. Thus, in the smallest subnet, you would achieve data propagation in 30ms -- an almost 25x improvement.

## Parallel Execution Threads

Quai Network is a [multithreaded network of blockchains](../multithreaded-execution.md). All Quai blockchains act as an independent thread, producing blocks asynchronously and allowing for parallel execution across the network. By using multithreaded execution, Quai is able to process upwards of 50,000 transactions per second.
Quai's merge-mined hierarchy intertwines these many threads through [hash linked references](../merged-mining/coincident-blocks.mdx), which ensure transactions and contract interactions can occur atomically across all Quai chains. The many chains within Quai's multithreaded environment are organized into three tiers of network hierarchy. The following table assumes an initial 13 chain (3 region 9 zone) architecture:

| Chain Type | Level in Hierarchy | % of Network Hashrate | Block Time† |
| ---------- | ------------------ | --------------------- | ----------- |
| Prime      | 1 (top)            | 100%                  | ~1,000s     |
| Region     | 2 (middle)         | ~33%                  | ~100s       |
| Zone       | 3 (bottom)         | ~11%                  | ~10s        |

† *Block production in Quai Network is a stochastic process, meaning that real-world block times will have minor variance.*

### Prime

The highest tier of the hierarchy is Prime. The single Prime chain is mined by all miners, and has a high difficulty in order to ensure a high security guarantee behind each block. The Prime Chain is a header chain used exclusively to coordinate sub networks, and does not maintain any state. There are no accounts or transactions on the Prime chain.

### Region

Quai's single Prime chain organizes many Region chains, which are the second level of the hierarchy. With N Region chains, each Region chain will contain approximately 1/Nth of the total network hashrate. Through merged mining, Region chains are periodically hash linked to the Prime chain (and thus the remainder of the network). Quai Network's initial structure consists of 3 Region chains: Cyprus, Paxos, and Hydra. Similar to the Prime chain, Region chains do not carry any state, and exist exclusively to coordinate Zone chains.

### Zone

The bottom level of the hierarchy is Zone. Each of Quai's Region chains coordinate many Zone chains. Similar to Region chains, Zone chains are hash linked to dominant Prime/Region blocks through merged mining. Quai's initial structure consists of 9 Zone chains: Cyprus 1-3, Paxos 1-3, and Hydra 1-3. Zone chains are the only type of chain in Quai Network that maintain state and process transactions. Each Zone chain is a single execution thread, making all of Quai Network a [composable multithreaded execution environment](../multithreaded-execution.md).

## Hash Linked References

Simply by merge-mining Quai, miners create [hash linked references](../merged-mining/coincident-blocks.mdx) between chains that can be used to facilitate state transitions across chains. These hash linked references are known as coincident blocks, and occur naturally as a result of merged mining. Hash linked references between chains allow all chains within the network to reference and interact with each other as long as miners are producing blocks, acting as the first truly decentralized and trustless bridge between hash-based blockchains.
