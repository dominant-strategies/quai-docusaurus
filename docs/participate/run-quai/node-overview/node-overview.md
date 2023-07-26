---
title: Node Overview
description: Overview of the implemenation of a Quai Network node.
slug: /node-overview
hide_table_of_contents: true
sidebar_position: 1
---

# Node Overview

A node is a computer running an instance of Quai that communicates (peers) with other nodes. The web of communication between nodes makes up Quai Network.

Nodes are responsible for validating and propagating transactions across Quai Network. Each node maintains a copy of all or a subset of chains within the network, and handles the computation of state changes when a new block is added to their local copy of the ledger. Nodes uphold the integrity of Quai by ensuring the validity and accurate recording of all transactions.

There are 4 unique kinds of nodes that exist within Quai Network that manage different subsets of data, serve different purposes, and have differing hardware requirements.

## Node Types

### Full Node

A full node on Quai Network maintains the ledger and generates proposed blocks for mining in all shards. Full nodes operate by sending and receiving the latest blocks along with their header data to its peers in the network. Full nodes also have the ability to serve requests that query each of the shards through WebSockets and HTTP. Currently, full nodes on Quai Network serve as archive nodes since historical state is not pruned.

The hardware requirement to run a full node:

- Fast CPU with 4+ cores
- 16GB+ RAM
- Fast SSD with at least 100GB free space
- 25+ MBit/sec download Internet service

### Slice Node

A slice node on the network is a subset of a full node that validates Prime, a single Region, and a single Zone. An example of a slice node would be the combination of Prime, Cyprus, and Cyprus1. The benefit to running a slice node is that a node needs fewer resources. The trade-off is that cross-slice validation is delegated to the peered full nodes or coordinate slices. A slice node is the smallest subset of the network that a node can run and still trustlessly access the network.

The hardware requirement to run a full node:

- CPU with 2+ cores
- 4GB RAM
- 20GB free storage space to sync
- 8 MBit/sec download Internet service

### Extended Slice Node

An extended slice node is a slice node that is also running one or more additional Region or Zone chains coordinate to the selected slice. Extended slice nodes can be beneficial to node operators because it allows them to identify coordinate chain contention more quickly, lowering their uncle rate.

Extended slice nodes are not currently a pre-set configuration, however advanced node operators can explore this construction.

### Watcher Node

Watcher nodes are Quai Network nodes that observe a single subordinate Quai blockchain. Watcher nodes can be useful for organizations and businesses that are primarily monitoring a single Quai Network context, and are not concerned with coordinate or dominant chains. Watcher nodes are not a trustless way to interact with Quai Network, as they trust in the benevolence of dominant contexts.

Watcher nodes are not currently a pre-set configuration.

## Network Optimized Multi-Slice Setup

Quai Network incentivizes miners to self-select a slice to run their nodes which has the lowest peer latencies, thus optimizing network performance and throughput. Miners and nodes optimize latency for the following reasons:

1. Maximize block rewards by minimizing uncle count.
2. Decrease network latency by collocating with same slice peers.
3. Efficiently distribute network compute across multiple contexts.

To achieve this set up, users will run many individual slice nodes that combine to make a globally distributed full node. These nodes are connected through secure WebSockets and validate an individual slice on the respective instance.

## Networking

| Chain Name | HTTP Port | Websocket Port |
| ---------- | --------- | -------------- |
| Prime      | 8546      | 8547           |
| Cyprus     | 8578      | 8579           |
| Paxos      | 8580      | 8581           |
| Hydra      | 8582      | 8583           |
| Cyprus 1   | 8610      | 8611           |
| Cyprus 2   | 8542      | 8643           |
| Cyprus 3   | 8674      | 8675           |
| Paxos 1    | 8512      | 8613           |
| Paxos 2    | 8544      | 8645           |
| Paxos 3    | 8576      | 8677           |
| Hydra 1    | 8614      | 8615           |
| Hydra 2    | 8646      | 8647           |
| Hydra 3    | 8678      | 8679           |
