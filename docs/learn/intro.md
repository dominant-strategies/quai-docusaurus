---
title: Introduction
description: A high level overview of Quai Network's fundamental building blocks.
keywords:
  - quai network
  - energy based money
  - merged mining
  - blockchain
  - consensus
---

# Quai Network

**Quai Network is crypto for the global and compute economies.**

**Quai is the only fully scalable and programmable Proof-of-Work Layer-1.** Through the implementation of a variety of **new Proof-of-Work primitives**, including a category-creating native “stablecoin” connected to the cost of energy, Quai brings reliable, real-world value on-chain to function as financial infrastructure for a compute-centric economy.

* **Transaction Mining** to create a profitable outlet for idle compute
* **Energy-Based “Stablecoin”** to function as decentralized money for the compute economy
* **Infinite Scalability** to accommodate an infinitely growing userbase of humans and AI agents

![Placeholder Image](/img/HierarchicalStructure.jpg)

## Transaction Mining
Instead of using priority fee to order transactions, which inevitably incentivizes MEV, **Quai Network uses [Proof-of-Work to order transactions](/learn/advanced-introduction/mev-resistance/transaction-ordering.md) within each block**. Through this new ordering mechanism, users can [mine transactions](/learn/advanced-introduction/mev-resistance/mined-transactions.md) with enough work to make their transactions functionally impossible to MEV. This feature allows users to **completely avoid frontrunning and sandwich attacks** when participating in DeFi on Quai.

[This new utilization of Proof-of-Work](/learn/advanced-introduction/mev-resistance/mev-resistance.md) not only provides miners with an additional revenue stream where they can mine transactions in tandem with blocks, but also creates new demand for idle compute. This new demand can take advantage of the large amounts of computing power idling in distributed compute hubs like Render Network and io.net, which are currently bottlenecked by demand rather than supply. 

## Energy-Based “Stablecoin”
Within Quai, Proof-of-Work is used not only to secure the network from attackers, but also to function as an [oracle for real-world demand and energy costs](/learn/tokenomics/token-dynamics/token-dynamics.md), allowing for the creation of a **completely [decentralized “stablecoin” tied to energy](/learn/tokenomics/tokenomics-overview/qi/qi.md)**. This token is not pegged to or backed by any asset, but rather exclusively uses [market incentives](/learn/tokenomics/token-dynamics/token-dynamics.md) to consistently drive the token’s price towards the cost of energy. 

Energy is the single largest input to both human activity and artificial intelligence. **The intrinsic value of energy to both man and machine makes it an ideal foundation for a new currency to be built upon.**

Quai Network joins protocols like [Hacash](https://hacash.money/) and [Themelio](https://docs.themelio.org/whitepapers/melmint-v2/) as a leader in the emerging category of decentralized Proof-of-Work “stablecoins.”

## Infinite Scalability
Through the use of a new Proof-of-Work fork-choice rule named [Proof-of-Entropy-Minima (PoEM)](/learn/advanced-introduction/poem/poem.md), Quai Network is able to remain in consensus while coordinating an [infinitely growing number of execution shards](/learn/advanced-introduction/poem/infinite-execution-shards/infinite-execution-shards.md). This property allows Quai Network to **add shards to the network as needed** in order to meet perpetually growing demand. The only tradeoff to adding shards to Quai (and thus increasing throughput) is an [increased time to cross-shard settlement](/learn/advanced-introduction/poem/infinite-execution-shards/dynamic-sharding.mdx). 

Trustless bridging between all shards in the network is achieved by [using miners to create objective links between shards](/learn/advanced-introduction/merged-mining/coincident-blocks.mdx). 

Quai Network’s native, pre-defined scaling creates a mechanism for congestion to be alleviated as demand increases, **keeping fees permanently low** even with growing usage. 

# Testnets

Currently, Quai Network is in the **testnet and development phase**. The roadmap for Quai Network includes two remaining testnets prior to Mainnet launch:

1. Golden Age Testnet
2. Silicon Age Testnet

For each of these Testnets, our team at [Dominant Strategies](https://dominantstrategies.io) expects to run both a Testnet and Devnet, in addition to providing tools such as [block explorers](/participate/use-quai/block-explorers.md), [network statistics pages](https://stats.quai.network), and [faucets](/participate/use-quai/testnet-faucet.md).

