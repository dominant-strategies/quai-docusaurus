---
title: Miner Overview
description: Overview of the implemenation of a Quai Network GPU Miner.
hide_table_of_contents: false
sidebar_position: 1
keywords:
  - gpu miner
  - merged mining
  - latency
---

A miner is a computer performing complex mathematical calculations, known as hashing, in a competition to add the next block to a Quai blockchain. These ongoing competitions allow the network to reach consensus through the hierarchical longest chain rule (HLCR). Quai Network utilizes merged mining, which allows each miner to secure three Quai blockchains simultaneously. Further, Quai miners self-select the contexts they wish to mine, incentivizing reduced network latency via topological organization.

Mining in Quai Network can be performed via CPU miner or GPU miner. GPUs have a significant advantage in efficiency over CPUs when mining Quai.

- [Learn how to set up a GPU Miner](./gpu-miner/gpu-miner.md)
- [Learn how to connect a GPU miner to a node with the Stratum Proxy](../stratum-proxy/run-stratum.md)

## ProgPoW Hashing Algorithm

The specific types of mathematical calculations being done by a miner is referred to as the hashing algorithm of the network. Quai Network utilizes the ProgPoW hashing algorithm, an evolution of Ethash designed for improved ASIC resistance.

The ProgPoW algorithm was chosen due to the difficulty of creating application-specific integrated circuits (ASICs) that can mine ProgPoW. The use of ASIC-able algorithms such as SHA-256 quickly renders consumer-grade hardware impractical, resulting in large barrier to entry for competitive mining.

ProgPoW was developed as an EIP to replace Ethash, but was discarded due to the merge. The original ProgPoW EIP (EIP-1057) can be found [here](https://github.com/ethereum/EIPs/pull/1057). Additional information on ProgPoW can be found on the ETH Magicians forum [here](https://ethereum-magicians.org/t/progpow-a-compilation-of-reference-material/3040/4).

## Implementation of Merged Mining

Merged mining is the process of a single miner mining multiple blockchains simultaneously. Quai's hierarchical structure of blockchains allows each Quai miner to check each completed hash, known as a nonce, against the difficulty levels of 3 different Quai chains. If the nonce meets or exceeds any of the three difficulty levels, a block is mined.

This is functionally achieved by combining block headers of slices in the hierarchy during block production. The combining of headers is done by the Quai Network manager. Merged mining allows for both drastically increased throughput across the network and an increased frequency of miners finding a valid hash with no additional energy expenditure or hardware requirements.

## Latency Optimization

Quai miners self-select the 3 Quai chains that they merge-mine. Miners are incentivized to select the least latent chains to mine in order to minimize the production of uncle blocks. The incentive for each miner to optimize their own latency will minimize overall network latency as miners organize over time, maximizing the throughput of the network.

![Latency Map](/img/LatencyMap.jpg)
