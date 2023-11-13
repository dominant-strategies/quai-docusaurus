---
title: User Overview
description: Learn the basics of using Quai.
hide_table_of_contents: false
sidebar_position: 1
keywords:
  - quai network
  - quai
  - user
---

Quai Network is a network of blockchains built to handle high load while keeping fees low for users. This page contains valuable information about how Quai Network functions from a user perspective.

## Addresses

Within Quai Network, each address "lives" on one of the Zone chains. The first byte of each address is used to identify which blockchain is able to modify/change the state of the account. Information on how these bytes of data are interpreted can be found in the [Sharding](../../learn/advanced-introduction/hierarchical-structure/sharding.mdx) page of the docs.

**From a user perspective, this means that you need at least one Quai address that "lives" on each Quai blockchain you want to interact with.** For example, if you want to hold NFTs on Zone 1, buy NFTs on Zone 2, and hold Quai on Zone 3, you'll need three accounts.

When creating a new account in a wallet that supports Quai Network, you'll usually have the option to choose which Zone you want that account to "live" in.

## Internal & External Transactions

When sending a transaction to an address in the same Zone as the originating address, an "internal transaction" occurs. Internal transactions are transactions that modify the state of one Zone in a way that doesn't impact the state of any other Zones. Internal transactions are the quickest type of transaction within Quai Network, as they only require local consensus (within the Zone) to settle.

When sending a transaction to an address in a different Zone from the originating address, an "external transaction" is emitted. External transactions are transactions that modify the state of multiple Zones. **External transactions are slower than internal transactions, as they require global consensus (amongst all affected Zones) to settle as opposed to just local consensus.** [The time an external transaction takes to settle](../../learn/advanced-introduction/poem/infinite-execution-shards/dynamic-sharding.mdx) is the primary tradeoff of Quai Network -- as more chains are added to the network (adding more throughput), cross-chain settlement times increase.

## Gas

Gas is a critical component of any blockchain utilizing the EVM or any other decentralized state machine. Gas is used to allocate the limited computational resources of the EVM in an open market.

Different EVM operations cost different amounts of gas. In Ethereum for example, a simple transfer of tokens has a base fee of 21,000 gas. More complex interactions, such as the creation of a smart contract, can cost 32,000 gas as a minimum.

Each Ethereum block has a “block gas limit,” or a maximum number of gas that computations in that block can use. This ensures that no blocks can require too much computation to impact the validation or production of future blocks. In Ethereum, the absolute maximum amount of gas a single block can consume is 30 million. Practically, Ethereum targets a 15 million block gas limit by fluctuating the base gas fee of operations.

The price of gas fluctuates with demand, and is priced in Gwei, the smallest unit of Ether. During periods of low demand, gas prices can be as low as 4-8 Gwei/gas. During periods of high demand, however, it is not uncommon for the price of gas to exceed 150 Gwei.

In Quai Network, gas fulfills the same purpose. **However, within Quai, each chain has its own market for gas. Thus, if one chain is experiencing a surge in demand, its price for gas will begin rising independently of all other chains.** As this gas price rises in one chain, all parties will be incentivized to distribute activity across the network to other chains with a lower cost of gas.
