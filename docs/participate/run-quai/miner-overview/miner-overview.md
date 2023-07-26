---
title: Miner Overview
description: Overview of the implemenation of a Quai Network Miner.
slug: /miner-overview
hide_table_of_contents: true
sidebar_position: 2
---

# Miner Overview

A miner is a computer performing complex mathematical calculations, known as hashing, in a competition to add the next block to a Quai blockchain. These ongoing competitions allow the network to reach consensus through the hierarchical longest chain rule (HLCR). Quai Network utilizes merged mining, which allows each miner to secure three Quai blockchains simultaneously. Further, Quai miners self-select the contexts they wish to mine, incentivizing reduced network latency via topological organization.

## BLAKE3 Hashing Algorithm

The specific type of mathematical calculation being done by a miner is referred to as the hashing algorithm of the network. Quai Network utilizes the BLAKE3 hashing algorithm, an evolution of BLAKE2, a hashing algorithm utilized by other cryptocurrencies.

BLAKE3 is both GPU and ASIC mineable. BLAKE3 encourages innovation of mining hardware and the production of dedicated Quai mining machinery which will reinforce the security of the chain.

## Implementation of Merged Mining

Merged mining is the process of a single miner mining multiple blockchains simultaneously. Quai's hierarchical structure of blockchains allows each Quai miner to check each completed hash, known as a nonce, against the difficulty levels of 3 different Quai chains. If the nonce meets or exceeds any of the three difficulty levels, a block is mined.

This is functionally achieved by combining block headers of slices in the hierarchy during block production. The combining of headers is done by the Quai Network manager. Merged mining allows for both drastically increased throughput across the network and an increased frequency of miners finding a valid hash with no additional energy expenditure or hardware requirements.

## Latency Optimization

Quai miners self-select the 3 Quai chains that they merge-mine. Miners are incentivized to select the least latent chains to mine in order to minimize the production of uncle blocks. The incentive for each miner to optimize their own latency will minimize overall network latency as miners organize over time, maximizing the throughput of the network.

![Latency Map](/img/LatencyMap.png)
