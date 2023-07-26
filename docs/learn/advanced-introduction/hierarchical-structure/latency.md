---
title: Latency
description: How latency is minimized within Quai Network.
slug: /latency
hide_table_of_contents: true
sidebar_position: 2
---

# Latency

Latency is the primary factor limiting the throughput of a distributed ledger technology. Latency is the time it takes for a message or request to propagate to all nodes in the network. It is a measure of the responsiveness of a system and can be affected by various factors, such as network congestion, distance between the sender and receiver, and the complexity of the message or request.

High latency in a hash-based system directly leads to economic costs that affect the security of the network. Miners with higher latency are more likely to be inconsistent at the point of consensus (i.e. when a block is found), and thus more likely to find an uncle block, wasting the energy expended to create the block. Since energy is a scarce, economically valuable resource, high latency has a high economic cost to the security of a network. Low latency, on the other hand, minimizes wasted energy and facilitates smooth coordination across the network.
There are three primary kinds of latencies that impact overall latency: networking latencies, computation latencies, and input/output (I/O) latencies. Network bandwidth is related to the inverse of the sum of these latencies. Thus, decreasing latency increases bandwidth.

## Networking Latencies

Networking latencies have the largest impact on overall latency and throughput. Networking latencies refer to delays that are due to the transfer of data over a network. These delays are impacted by a variety of factors, such as the amount of data transmitted, the number of nodes in the network, the latency between nodes, and the number of required trips through the network.

Quai minimizes networking latency through the creation of optimized sub networks. Each miner is incentivized to self-select the lowest-latency sub networks to mine. Miners are incentivized to mine lower-latency chains, as a higher latency to peers directly lowers profits due to the increased likelihood of producing uncle blocks.
Miners will geographically organize over time due to this incentive, minimizing latency inside each sub network. Providing an initial suggestion for the geographic organization of miners will accelerate the convergence of miners into optimized sets.

![Optimized Sub Networks](/img/LatencyMap.png)

Quai's utilization of Proof-of-Entropy-Minima consensus further lowers network latency. PoEM ensures that only a single proof ever needs to be propagated throughout the network to achieve consensus. In contrast, Proof-of-Work requires a second proof to be shared before the network can reach consensus in a fork scenario. Proof-of-Stake consensus necessitates multiple rounds of propagation for each block to achieve consensus, as each proof must collect a specific number of social approvals to be considered valid. PoEM is an inherently faster method of reaching consensus than any alternative, as it minimizes both the amount of data transmitted and the number of trips that data must take through the network, thus optimizing network latency.

## I/O Latencies

I/O latencies refer to the delays that occur during the input/output operations of the network. These delays occur most often when a node is reading or writing data to its local storage. I/O latencies are impacted by the number of read/writes, the speed of storage devices, and state size. Quai Network will minimize I/O latencies by minimizing state size via state trimming, and optimizing node storage for RAM.

The larger the state of the network becomes, the more of an impact I/O latencies will have on overall throughput. Quai will keep state size manageable through the implementation of state trimming.

The fastest way for a node to query its state is to hold the state in random access memory (RAM). A node can query state from RAM more than 100x faster than it can query information from disk. Quai intends to optimize node caching to maximize the proportion of RAM queries and minimize the number of times that a node must slow down to query disk.

## Minimum Latency, Maximum Throughput

Maximum total network bandwidth, and thus throughput, can be achieved by minimizing overall network latency. By addressing the three primary contributors to overall network latency (networking latencies, computation latencies, and I/O latencies) Quai Network creates a highly performant network capable of processing upwards of 50,000 TPS.
