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

**Quai Network is a new Layer-1 that unifies all proven use-cases of cryptocurrency into a single, infinitely scalable network.** 

## Unification of Crypto Use-Cases
Cryptocurrencies, over their 15-year lifespan, have found three key product-market fits:
* Sovereign store-of-value (Digital Gold)
* Programmable base-layer (Digital Finance)
* Borderless medium-of-exchange (Digital Cash)

![Quai Unifies Crypto Use-Cases](/img/QuaiUnified.jpeg)

Each of these use cases has been siloed into distinct networks – Bitcoin as a sovereign store-of-value, Ethereum and Solana as programmable base-layers, and USDC and Tether as borderless mediums-of-exchange. 

Quai Network unifies these distinct use-cases into a single network through the use of a [novel two-token system](/learn/tokenomics/tokenomics-overview), with one token ([Quai](/learn/tokenomics/tokenomics-overview/quai)) designed to function as a programmable store-of-value and the other ([Qi](/learn/tokenomics/tokenomics-overview/qi)) designed to function as a non-programmable, energy-linked medium-of-exchange.

### Sovereign Store-of-Value
Within Quai Network’s two-token system, the [Quai token](/learn/tokenomics/tokenomics-overview/quai) functions as a [decreasingly inflationary](/learn/tokenomics/token-dynamics/supply-growth) and [programmable](/develop/smart-contracts/languages) store-of-value, using a [modernized, work-based consensus mechanism](/learn/advanced-introduction/poem) to ensure long-term sovereignty and decentralization. 

### Programmable Base-Layer
The Quai token can be utilized in [EVM-based smart contracts](/develop/smart-contracts/languages), enabling the use of Quai Network to host real-world assets, utility tokens, NFTs, and decentralized finance protocols. 

### Borderless Medium-of-Exchange 
The [Qi token](/learn/tokenomics/tokenomics-overview/qi) functions as an [energy-linked](/learn/tokenomics/tokenomics-overview), non-programmable medium-of-exchange designed to replace USDC and USDT in on-chain commerce. The design of the Quai/Qi two-token system utilizes [simple yet effective dynamics](/learn/tokenomics/token-dynamics) to keep the Qi token linked to the cost of energy in a completely decentralized manner. 

## Infinite Scalability
Quai Network achieves infinite scale by [extending Proof-of-Work](/learn/advanced-introduction/poem) to enable a variety of new innovations at the Layer-1 level.

![Visualization of Quai Network's Hierarchical Structure](/img/HierarchicalStructure.jpg)

### Execution Sharding
Through the use of an extension of Proof-of-Work consensus called [Proof-of-Entropy-Minima](/learn/advanced-introduction/poem), Quai Network is able to remain in consensus while coordinating an [infinitely growing number of execution shards](/learn/advanced-introduction/poem/infinite-execution-shards). This property allows Quai Network to [dynamically add shards to the network](/learn/advanced-introduction/poem/infinite-execution-shards/dynamic-sharding) in order to meet perpetually growing demand. The only tradeoff to adding shards to Quai (and thus increasing throughput) is an increased time to cross-shard settlement.

Quai Network’s native, pre-defined scaling creates a mechanism for congestion to be alleviated as demand increases, keeping fees permanently low even with growing usage. 

### Trustless Bridging
All shards in the network can natively transfer and receive state through the process of [merged mining](/learn/advanced-introduction/merged-mining), which asynchronously produces [objective links between shards](/learn/advanced-introduction/merged-mining/coincident-blocks). Quai extends traditional work-based block production to enable transfers between shards without introducing new trusted validation mechanisms.

Native and objective cross-chard communication ensures that Quai is not reliant on third-party bridges or validator sets at scale. 

### MEV Resistance 
Instead of using priority fee to order transactions, which inevitably incentivizes MEV, Quai Network uses [Proof-of-Work to order transactions within each block](/learn/advanced-introduction/mev-resistance/transaction-ordering). Under this new ordering mechanism, users can mine transactions with enough work to make their transactions [functionally impossible to MEV](/learn/advanced-introduction/mev-resistance).

The ability for users to send MEV-proof transactions positions Quai as an optimal Layer-1 for high-value DeFi activity. 

## Testnets

Currently, Quai Network is in the **testnet and development phase**. The roadmap for Quai Network includes two remaining testnets prior to Mainnet launch:

1. Golden Age Testnet
2. Silicon Age Testnet

For each of these Testnets, our team at [Dominant Strategies](https://dominantstrategies.io) expects to run both a Testnet and Devnet, in addition to providing tools such as [block explorers](/participate/use-quai/block-explorers.md), [network statistics pages](https://stats.quai.network), and [faucets](/participate/use-quai/testnet-faucet.md).

