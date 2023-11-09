---
title: Deploy
description: How to deploy a smart contract to the Quai Network.
sidebar_position: 3
---

# Deploy

To deploy a smart contract on Quai Network, you simply send a transaction containing the contract bytecode without specifying a recipient.

Once deployed, your smart contract will be available to any user on the network to interact with.

## How to Deploy a Smart Contract

### Requirements

To deploy a smart contract on Quai, you'll need a few things:

- _QUAI to cover gas_: similar to a normal transaction, you'll need to set your gas limit. Be aware that contract deployment requires significantly more gas than a simple transfer.
- _Contract Bytecode_: generated using a [compiler](https://www.alchemy.com/overviews/solidity-compiler).
- _Deployment script or plugin_
- _Access to a Quai node_: you can do this either by [running your own node](../../participate/node/start-a-node.md), [accessing a publicly available node](../networks.mdx), or through API key via a node service.

### Deployment

Smart contracts on Quai Network can be deployed using a number of different methods. The most straightforward and widely used methods are using deployment tools like Hardhat. Contracts can also be deployed using the quais.js library, which offers increased flexibility and the ability to deploy via frontend or simple script.

The steps to deployment will vary based on the tooling you choose to use. Tutorials detailing smart contract deployment on Quai Network are coming soon.

## Cross-Chain Smart Contracts

Contrary to monolithic blockchains, Quai Network's multi-threaded architecture allows for the deployment of multi-chain smart contracts. These are smart contracts present in a single network context that contain references to sister contracts in alternate context(s). Multi-chain referencing smart contracts allow you as a developer to create seamless cross-chain applications that can:

- Asynchronously track state of contracts within other chains in the network
- Natively transfer value and tokens to different contexts without bridges
- Create a network secured mesh of smart contracts

### Multi-Chain Deployment

Sister contracts are created by deploying contracts across all chains that the project intends to support. After the deployment of these sister contracts, a trust on first-use (TOFU) strategy is used to link the contracts together, allowing each contract to be aware of the state and activities of all of its sisters. Each sister contract contains an objective reference to the public address of every other sister contract.

Contracts intended to function across many chains will contain initially empty slots for the addresses of its sisters. If a contract intends to maintain functionality across the initial network of 13 chains, 12 slots are required for all 12 sister contracts to be referenced.

Tutorials detailing how to deploy multi-chain smart contracts using a TOFU strategy will be provided.
