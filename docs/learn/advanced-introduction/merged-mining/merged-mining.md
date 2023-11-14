---
title: Merged Mining
description: How merged mining has been adapted and used to scale in Quai Network.
hide_table_of_contents: false
sidebar_position: 3
---

# Merged Mining

Merged mining is mining a combined header generated from multiple blockchains. The idea of merged mining was [first conceived by the pseudoanonymous Satoshi Nakamoto in December 2010](https://bitcointalk.org/index.php?topic=1790.msg28696#msg28696). Quai has extended Satoshi's concept with the implementation of merged mining in a network of blockchains which have the same shared protocol. This implementation allows all Quai chains to share security through the eventual commitment of all network hash power. In addition, the process of merged mining leads to the automatic creation of hash linked references between Quai chains which enable trustless cross-chain state transitions. By using merged mining to create a multithreaded execution environment, [Quai makes Proof-of-Work over 10,000 times more energy efficient than Bitcoin](./energy-efficiency.mdx)\*.

## What is Merged Mining?

Merged mining occurs when a miner is able to check each nonce they hash against the difficulty threshold of multiple distinct blockchains. In practice, this allows a single computer to mine and secure many blockchains simultaneously with no increase in hardware requirements or energy consumption.

Merged mining can be conducted only between blockchains utilizing the same hashing algorithm. All Quai blockchains use the [ProgPoW hashing algorithm](../../../participate/mining/miner-overview.md#progpow-hashing-algorithm), and third party chains that use ProgPoW can decide to merge-mine with Quai. Each Quai miner merge-mines three blockchains simultaneously -- one from each tier of Quai's hierarchy.

## Coincident Blocks

[Coincident blocks](./coincident-blocks.mdx) are blocks that are valid in multiple Quai blockchains. Coincident blocks create atomic, hash linked references between chains. When merged mining multiple blockchains, miners will occasionally find nonces that fulfill the difficulty requirements of multiple blockchains. Thus, coincident blocks are a natural byproduct of merged mining, and require no mechanism outside of Proof-of-Work mining to be created.

Coincident blocks keep all Quai blockchains interlinked by periodically pegging subordinate chains to the work of the Prime chain, and allow for data to be transmitted between chains in a trustless environment through the creation of hash linked references.

## Energy Efficiency

Merged mining enables Quai to utilize miners at much greater efficiency, reducing the per-transaction energy cost of Proof-of-Work. Because merged mining leads to no increase in energy expenditure but a drastic increase in available block space, Quai offers the most efficient allocation of energy resources, maximizing block space and on-chain security per kW/h.

## Merge-Mined Parachains

Quai allows [merge-mined parachains](./parachains.md) to derive security from Quai Network. While Quai's merged mining focuses on merge-mining many Quai-specific chains simultaneously, any blockchain that utilizes the [ProgPoW](../../../participate/mining/miner-overview.md#progpow-hashing-algorithm) hashing algorithm can bootstrap security and trustless bridging by enabling merged mining with Quai.

All Quai block headers contain data fields for Prime, Region, and Zone in addition to a single empty data field. This empty field allows Quai miners to insert the block header of a parachain into a Quai block header, creating a valid Quai block and a valid parachain block simultaneously. The parachain coincident block serves the same purpose as intra-network coincident blocks, in that it provides a hash linked reference between chains, facilitating trustless state transfers.

Parachain liveliness is determined by market forces. Each block leaves only a single empty data field, creating a competitive environment for parachains to incentivize Quai miners.

\*_Per transaction, assuming full transactional load and the same number of miners on both Quai Network and the Bitcoin Network._
