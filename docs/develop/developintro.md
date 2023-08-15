---
title: Networks
description: Network specification for development and testing environments.
slug: /develop
hide_table_of_contents: false
---

# Networks

## Overview

Currently, Quai Network is in the testnet and development phase. The roadmap for Quai Network includes three remaining testnets prior to Mainnet launch. These testnets will be called:

- Iron Age Testnet
- Golden Age Testnet
- Silicon Age Testnet

For each of these testnets, our team expects to run both a testnet and devnet and provide tools such as block explorers, network statistics pages, and faucets.

## Public Networks

### Mainnet

**Quai Network has not launched a live mainnet.**

### Testnet

Testnet serves as a place to experiment with new features and ensure they are stable for Mainnet release. This network can be used by both smart contract and protocol developers to easily test protocol upgrades and smart-contract deployments in a pseudo production environment.

QUAI on the testnet has no real value and thus testing deployments, interactions, and smart contracts are virtually free. As testnet QUAI has no value, there are no markets to purchase testnet tokens.
Developers looking to test can easily mint testnet QUAI from the testnet faucet. Faucets generally are a simple web interfaces that you can input an address where you'd like tokens to be sent. Additionally, you can spin up a miner and mine blocks to acquire testnet QUAI tokens.

The Quai Network testnet is named colosseum as it's where network upgrades go to "fight it out" prior to being pushed up to mainnet. To point your node and miner to testnet, you'll have to edit your `network.env` file to:

```
NETWORK=colosseum
```

#### Links and Specifications

- `chainId`: 9000
- Colosseum Faucet
- RPC endpoints:
  - Link Structure: `https://rpc.SHARDNAME.quaiscan.io`
  - rpc.prime.quaiscan.io
  - rpc.hydra.quaiscan.io
  - rpc.paxos2.quaiscan.io
- Explorer:
  - Link Structure: `https://SHARDNAME.quaiscan.io`
  - Cyprus 1 Block Explorer (Will be live on testnet launch)

### Devnet

Testnet serves as a place to experiment with new features and ensure they are stable for Mainnet release. This network can be used by both smart contract and protocol developers to easily test protocol upgrades and smart-contract deployments in a pseudo production environment.

QUAI on the devnet has no real value and thus testing deployments, interactions, and smart contracts are virtually free. As devnet QUAI has no value, there are no markets to purchase devnet tokens.

Developers interested in exploring devnet can mint testnet QUAI from the devnet faucet. Additionally, you can spin up a miner and mine blocks to acquire testnet QUAI tokens.

The Quai Network devnet is named garden as a reference to the Garden of Babylon. To point your node and miner to devnet, you'll have to edit your `network.env` file to:

```
NETWORK=garden
```

#### Links and Specifications

- `chainId`: 12000
- Garden Faucet
- RPC endpoints:
  - Provided upon devnet launch (TBD)
- Explorer:
  - Provided upon devnet launch (TBD)

Devnet acts as a staging ground for testnet and will allow for the rapid release of features to be included in testnet.

## Private Networks

An instance of Quai Network that is not connected to a live public network (garden, colosseum) is considered a private network. Private networks are generally run on a single or by a small group of trusted machines for development and testing purposes.

## Local Network

A local instance of Quai Network is an isolated development environment that can be spun up on a single machine. This private network offers faster block times, lower block difficulties with the full range of Quai Network capabilities.
Using a local network allows developers looking to launch applications to work faster and with better privacy than on a public testnet. They also provide the ability to easily control a network environment and develop privately.

To spin up a local instance of Quai Network, you'll need to change the network flag in your node's `network.env` config file to:

```
NETWORK=local
```

After changing the network flag, you can spin up a local node and miner as normal. The only method to acquire local QUAI is to run a miner. Mining occurs at a much faster rate than on a live testnet and thus tokens needed to test deployments or transactions can be acquired faster and more easily.

#### Important Links and Specs

- chainId: 1337
- Local RPC Endpoints:
  - `http://127.0.0.1:SHARD-PORT-NUMBER` or `http://localhost:SHARD-PORT-NUMBER`
