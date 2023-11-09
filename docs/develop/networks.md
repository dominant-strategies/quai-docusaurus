---
title: Networks
description: Network specifications for development and testing environments.
hide_table_of_contents: false
sidebar_position: 1
---

# Networks

## Public Networks

### Mainnet

Quai Network has not yet been launched into a live Mainnet.

### Testnet

Testnet serves as a place to experiment with new features and ensure they are stable for Mainnet release. This network can be used by both smart contract and protocol developers to easily test protocol upgrades and smart-contract deployments in a pseudo production environment.

QUAI on the testnet has no real value and thus testing deployments, interactions, and smart contracts are virtually free. As testnet QUAI has no value, there are _no markets_ to purchase testnet tokens.

Developers looking to test can easily mint testnet QUAI from the [testnet faucet](https://faucet.quai.network). Faucets generally are a simple web interfaces that you can input an address where you'd like tokens to be sent. Additionally, you can spin up a miner and mine blocks to acquire testnet QUAI tokens.

The Quai Network testnet is named `colosseum` as it's where network upgrades go to "fight it out" prior to being pushed up to mainnet. To point your node and miner to testnet, you'll have to edit your `network.env` file to:

```
NETWORK=colosseum
```

#### Important Links and Specs

- `chainId`: 9000
- `NONCE`: 5926993
- [Colosseum Faucet](https://faucet.quai.network)
- Explorer:
  - Link Structure: \`https://\[SHARDNAME].colosseum.quaiscan.io
  - [Cyprus1 Block Explorer](https://cyprus1.colosseum.quaiscan.io/)
- RPC Endpoints:

| Zone Name | Zone Index | RPC Endpoint                              |
| --------- | ---------- | ----------------------------------------- |
| Cyprus-1  | [0 0]      | https://rpc.cyprus1.colosseum.quaiscan.io |
| Cyprus-2  | [0 1]      | https://rpc.cyprus2.colosseum.quaiscan.io |
| Cyprus-3  | [0 2]      | https://rpc.cyprus3.colosseum.quaiscan.io |
| Paxos-1   | [1 0]      | https://rpc.paxos1.colosseum.quaiscan.io  |
| Paxos-2   | [1 1]      | https://rpc.paxos2.colosseum.quaiscan.io  |
| Paxos-3   | [1 2]      | https://rpc.paxos3.colosseum.quaiscan.io  |
| Hydra-1   | [2 0]      | https://rpc.hydra1.colosseum.quaiscan.io  |
| Hydra-2   | [2 1]      | https://rpc.hydra2.colosseum.quaiscan.io  |
| Hydra-3   | [2 2]      | https://rpc.hydra3.colosseum.quaiscan.io  |

### Devnet

Testnet serves as a place to experiment with new features and ensure they are stable for Mainnet release. This network can be used by both smart contract and protocol developers to easily test protocol upgrades and smart-contract deployments in a pseudo production environment.

QUAI on the devnet has no real value and thus testing deployments, interactions, and smart contracts are virtually free. As devnet QUAI has no value, there are _no markets_ to purchase devnet tokens.

To get devnet QUAI tokens, you can spin up a miner and mine blocks.

The Quai Network devnet is named `garden` as a reference to the Garden of Babylon. To point your node and miner to devnet, you'll have to edit your `network.env` file to:

```
NETWORK=garden
```

#### Important Links and Specs

- `chainId`: 12000

Devnet acts as a staging ground for testnet and will allow for the rapid release of features to be included in testnet.

## Private Networks

An instance of Quai Network that is not connected to a live public network (garden, colosseum) is considered a private network. Private networks are generally run on a single or by a small group of trusted machines for development and testing purposes.

### Local Network

A local instance of Quai Network is an isolated development environment that can be spun up on a single machine. This private network offers faster block times, lower block difficulties with the full range of Quai Network capabilities.

Using a local network allows developers looking to launch applications to work faster and with better privacy than on a public testnet. They also provide the ability to easily control a network environment and develop privately.

To spin up a local instance of Quai Network, you'll need to change the network flag in your node's `network.env` config file to:

```
NETWORK=local
```

After changing the network flag, you can spin up a local node and miner as normal. The only method to acquire local QUAI is to run a miner. Mining occurs at a much faster rate than on a live testnet and thus tokens needed to test deployments or transactions can be acquired faster and more easily.

#### Networking Specifications

| Chain Name | Chain Index | HTTP Port |
| ---------- | ----------- | --------- |
| Prime      |             | 8546      |
| Cyprus     |             | 8578      |
| Paxos      |             | 8580      |
| Hydra      |             | 8582      |
| Cyprus1    | [0 0]       | 8610      |
| Cyprus2    | [0 1]       | 8542      |
| Cyprus3    | [0 2]       | 8674      |
| Paxos1     | [1 0]       | 8512      |
| Paxos2     | [1 1]       | 8544      |
| Paxos3     | [1 2]       | 8576      |
| Hydra1     | [2 0]       | 8614      |
| Hydra2     | [2 1]       | 8646      |
| Hydra3     | [2 2]       | 8678      |

:::danger
Do not open the above HTTP ports for any reason. You will be putting your local network security at risk.
:::

#### Important Links and Specs

- `chainId`: 1337
- `NONCE`: 0
- Local Node Endpoints:
  - `http://127.0.0.1:[SHARD-PORT-NUMBER]`
