---
title: Multithreaded Execution
description: How Quai Network processes transactions in parallel
slug: /multithreaded-execution
hide_table_of_contents: false
sidebar_position: 4
---

# Multithreaded Execution

The invention of multithreaded CPUs drastically increased the accessibility of throughput computing by unlocking the capabilities of parallel processing in a single CPU. Quai's multithreaded blockchain execution revolutionizes blockchain computing in a comparable way. The implementation of parallel processing of transactions in a single network increases the accessibility of a blockchain-based economy.

Single threaded blockchain networks require all transactions and interactions to pass through a single execution thread, which can quickly become bottlenecked during periods of high demand. Multithreaded blockchain networks allow for parallel processing where transactions can be validated and confirmed simultaneously in many different contexts.
Quai achieves multithreaded blockchain execution through the decoupling of local consistency and global consensus. In a single-threaded blockchain, global consensus on the validity of a block must be reached before the block can be included on-chain and coerce consistency. Quai's multithreaded execution introduces the concept of scoped consistency and consensus. Sub networks asynchronously produce blocks, which are eventually organized into the global network hierarchy. Subordinate blocks initially achieve local consensus and consistency, and approach global consensus as they are braided into the network hierarchy.

![Blockchain Visualization](/img/BlockchainVisualization.webp)

## Decoupling Consistency & Global Consensus

A large barrier to increased throughput in blockchains is the tight coupling of consistency and consensus. In database technology, consistency means that data is the same across all nodes in the network. In the context of blockchains, consensus means that all participants in the network agree on the correct state of the blockchain. Consensus is achieved when a new block is included on the blockchain. Traditional blockchains have a strong link between consistency and consensus, and require consensus to be reached before consistency can be achieved. Quai Network provides a guarantee of local and global consistency prior to global consensus, meaning that data can be included on-chain and consistent across subordinate chains prior to global consensus being reached.

Traditional blockchains that do not guarantee consistency prior to consensus suffer from latency delays at each point of consensus as nodes rush to become consistent. The decoupling of consistency from global consensus largely eliminates these latency delays, ensuring all nodes have all necessary data to verify legitimacy provided to them at each point of consensus.

Quai Network achieves this decoupling through its merge-mined, hierarchical structure of many sub networks. Each sub network is able to achieve local consistency and consensus prior to global consensus, allowing for much faster inclusion on-chain and greatly increased processing capacity. Quai Network maintains atomic block progression and rollbacks, meaning that if global consensus rejects the state of any subordinate chain(s), the resulting rollback will affect all chains involved in the rejected state. This mechanism protects against double-spend attacks attempted by coopting a subordinate chain, and ensures that all sub networks are obligated to follow global consensus.

## Segmented State

Quai Zones maintain unique subsets of global state. Sharding state reduces the storage and computation requirements of each sub network, the amount of data transmitted across the network, and allows the network to achieve consistency faster.

The division of state across sub networks minimize the storage and computation requirements of running each sub network. With N sub networks under the Prime chain, each sub network contains approximately 1/Nth of total network state. Thus, if a Quai node maintains P sub networks, it will only be required to store P/Nth of total network state, in contrast to single-threaded blockchains where storing the entire network state is required of all nodes. Further, nodes are only required to compute the state transitions of the sub networks that they maintain, avoiding unnecessary computation requirements.

Quai's multithreaded execution environment also minimizes the amount of data transmitted across the network, saving network bandwidth. Transactions internal to a sub network are only propagated to nodes maintaining that sub network. External transactions are propagated only to the contexts which will experience a state transition due to those ETXs. By only propagating data to the contexts where it is required, Quai saves network bandwidth, increasing TPS capacity.
The organization and scoped consensus of sub networks allows data to quickly achieve consistency. Quai's separation of consistency from global consensus allows sub networks to asynchronously append data, with objectively created hash linked references to each block used to gradually raise the scope of consensus. Every state transition in Quai Network initially achieves local consensus, and eventually receives global consensus as subordinate blocks are braided into the overall network hierarchy.

## Parallel Processing

Quai Network's multithreaded execution environment achieves the parallel processing of transactions and contract interactions within the network by separating the write locks and computations of different subnets. Blocks are produced asynchronously in all Quai sub networks, allowing local consistency to be attained within many sub networks in parallel.
Parallel processing allows Quai Network to process more than 50,000 transactions per second across all sub networks. Quai retains atomicity in a parallel processing environment by coordinating block production and rollbacks governed by [Proof-of-Entropy-Minima (PoEM) consensus](./poem/).
