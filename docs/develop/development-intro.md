---
title: Development Introduction
description: Learn the basics of developing on Quai.
sidebar_position: 1
keywords:
  - testnet
  - mainnet
  - development
  - quai
  - smart contracts
---

# Development Introduction

Quai Network is a network of many interoperable chains. A stylized representation of the network structure can be seen below:

![Network Visualization](/img/HierarchicalStructure.jpg)

The network is made up of 3 levels: Prime, Region, and Zone. Prime and Region chains act as coordination layers as they contain no state, transactions, or accounts.

The Zone layer is the most pertinent to application developers as each Zone chain within the layer contains its own state, virtual machine, transactions, and accounts. 

Interoperability is native in all Zone chains. The protocol supports direct transactions and contract interactions from one chain to another that are executed by the Zone chains and routed by the Prime and Region chains. This functionality allows for trustless applications built across many Zone chains. Developers can choose to deploy their applications on one or many of these Zone chains depending on their application’s complexity and use case.

## Differences between Quai and Ethereum

It is easiest to think of the Zone layer as a collection of individual Ethereum-like chains running in parallel. Each of these chains is a unique pseudo-EVM environment, meaning it retains much of the structure and functionality of the traditional EVM with some changes/additions. 

The main differences between Quai’s EVM and the traditional EVM are:
* [**Address Sharding**](/learn/advanced-introduction/hierarchical-structure/sharding.mdx#sharded-address-space): each Zone chain contains a unique set of addresses based on the address prefix. The prefix denotes which shard the address belongs to. Ex. shard 1 starts with 0x00, shard 2 starts with 0x01, etc.
* [**API Methods and Namespace**](/develop/apis/json-rpc-api.md): Quai’s API closely resembles that of Ethereum, but uses the quai_ namespace rather than the eth_ namespace. The API also contains many of, but not all of, the same methods as a traditional EVM API.
* [**Interoperability Opcodes**](/develop/smart-contracts/languages.md): Quai’s EVM handles traditional [Solidity](/develop/smart-contracts/languages.md#solidity-1) smart contracts, but also [SolidityX](/develop/smart-contracts/languages.md#solidityx-1) smart contracts – which adds support for opcodes added to handle cross-chain interactions between any of the Zone chains.
* **Available Tooling**: Because Quai has slight differences in the EVM, only a subset of existing Ethereum tooling has been adapted to handle the altered development environment.
* **Transaction Types**: Quai utilizes different transaction types than the typical EVM to handle transactions sent between Zone chains. 

## Available Tooling

As mentioned earlier, Quai has a subset of Ethereum tooling that has been adapted to handle the multi-chain network. This tooling includes:
* [**Pelagus Wallet**](https://pelaguswallet.io): a fork of Taho Wallet that handles address creation, management, and dApp connections across all of Quai’s zone chains.
* [**Hardhat**](https://github.com/dominant-strategies/hardhat-example): the only adapted smart contract deployment framework for Quai. The linked repository provides an example of how to deploy both vanilla Solidity and SolidityX smart contracts to any Quai zone chain.
* [**Quai-hardhat-plugin**](https://www.npmjs.com/package/quai-hardhat-plugin): a plugin built for hardhat that provides support for SolidityX deployments. Example usage can be seen in the [hardhat-example repository](https://github.com/dominant-strategies/hardhat-example). 
* [**Quais.js**](/develop/apis/javascript-apis.md): A fork of Ethers v5.7.2 adapted to work with any chain on Quai. The [quais-by-example repository](https://github.com/dominant-strategies/quais-by-example) provides examples of how quais is used, the utilities it adds, and the differences between it and Ethers. It should be noted that the traditional Ethers polling functionality has been disabled in Quais, which affects a number of methods.
* [**Quais-polling**](https://www.npmjs.com/package/quais-polling): a shim package for the quais SDK that reintroduces polling functionality in a conscious and efficient manner.

## Migrating your Ethereum App to Quai

Ethereum applications are typically built with one of 3 SDKs: Ethers, Web3.js, or Viem. Regardless of which of these SDKs your application uses, you will need to either incorporate or transition to the [Quais SDK](https://www.npmjs.com/package/quais) in your application to support Quai.

### Features

The Quais SDK is built to support Quai specific features that are not found in any of the other 3 Ethereum focused SDKs. These features include:
* **Contract Address Grinding**: similar to the address sharding mentioned above, contract addresses must have a shard prefix. During deployment, Quais handles address grinding to ensure the contract address has the correct shard prefix.
* **API Compatibility**: Quais utilizes the quai_ namespace, which allows developers to correctly make calls to any Quai RPC endpoint or wallet. Quai APIs also return different data types in comparison to Ethereum APIs, which the SDK is built to handle.
* **Utilities**: the quais SDK has a number of additional utility functions designed to make handling the hierarchy much easier.

### Migration

Quais.js is a fork of [Ethers v5.7.2](https://docs.ethers.org/v5/). Because of this, syntax in Quais is almost identical to Ethers with the caveat that the above changes have been applied. If your application is currently built with Viem or Web3.js, these guides are helpful to understand syntax mapping of your existing code to Quais:
* [**Viem to Ethers Guide**](https://viem.sh/docs/ethers-migration)
* [**Web3.js to Ethers Guide**](https://docs.ethers.org/v5/migration/web3/)

Almost all of the existing functions and utilities in Ethers, Viem, and Web3.js have direct mappings to similar or the same methods in Quais.js, with the exception of methods that utilize provider polling. 

### Polling

The largest breaking change in the Quais.js SDK is the removal of package wide polling, i.e. on instantiation of a http based provider, the provider polls an endpoint for data at a set interval. This affects methods that wait or watch for data, e.g. waiting for a transaction to be mined, watching for contract events, or returning data from the provider on block confirmation.

Polling has been removed from the SDK to prevent RPC endpoint overload on our minimal infrastructure via lazy instantiation and lifetime handling of polling instances. You can obtain similar polling functionality as before in the SDK via the [quais-polling package](https://www.npmjs.com/package/quais-polling), which promotes conscious and short lived polling instances for very specific sets of data. Any instance of waiting or watching for data in your application must be reworked using this package to retain functionality.

Basic examples of how to use the quais-polling package in your application can be found in the [quais-by-example repository](https://github.com/dominant-strategies/quais-by-example). Sending a transaction and awaiting confirmation can be found [here](https://github.com/dominant-strategies/quais-by-example/blob/main/send-transaction/index.js).


### Pelagus Wallet

[Pelagus wallet](https://pelaguswallet.io/) is the primary wallet used for applications on Quai Network. The wallet is a fork of Taho Wallet modified to support and handle accounts on all zone chains within the network. Similar to MetaMask, Pelagus injects the traditional window.ethereum object to the browser which can be used by your application to access user accounts.

Depending on whether or not the user has set Pelagus as their default wallet in settings, the extension can cause conflicts with MetaMask or other extension based wallets. To specifically access the Pelagus injected window.ethereum object, you can use this code snippet: 

```
const provider = window.ethereum.providers?.find((provider) => provider.isPelagus) || window.ethereum;
```

This provider selection uses the isPelagus identifier to access the Pelagus injected ethereum object over any other injections. Further information on Pelagus API methods can be found in the [Pelagus Wallet documentation](https://pelaguswallet.io/docs/).


## Resources Appendix

### SDK
* [Quais SDK repository](https://github.com/dominant-strategies/quais-5.js)
* [Quais SDK npm package](https://www.npmjs.com/package/quais)
* [Quais By Example](https://github.com/dominant-strategies/quais-by-example)
* [Usage in contract deployment](https://github.com/dominant-strategies/hardhat-example/blob/main/Solidity/scripts/deployERC20.js)
* [quais-polling repository](https://github.com/dominant-strategies/quais-polling)
* [quais-polling npm package](https://www.npmjs.com/package/quais-polling)

### Wallet
* [Pelagus Site](https://pelaguswallet.io/)
* [Pelagus Docs](https://pelaguswallet.io/docs/)
* [Example application using Pelagus](https://github.com/dominant-strategies/quai-next-dapp)
* [Extension Download](https://chromewebstore.google.com/detail/pelagus/gaegollnpijhedifeeeepdoffkgfcmbc)

### Smart Contracts
* [Supported Languages](https://qu.ai/docs/develop/smart-contracts/languages/)
* [What is SolidityX?](https://qu.ai/docs/develop/smart-contracts/languages/#choosing-solidity-vs-solidityx)
* [Quai-hardhat-plugin npm package](https://www.npmjs.com/package/quai-hardhat-plugin)
* [Deployment Tutorials](https://qu.ai/docs/category/tutorials/)
* [Deployment Example Repository](https://github.com/dominant-strategies/hardhat-example)

### Open Source Applications
* [Quai Mark](https://github.com/quaimark/quaimark-fe)
* [quai-next-dapp](https://github.com/dominant-strategies/quai-next-dapp)

### Documentation
* [Quai Developer Documentation](https://qu.ai/docs/develop/networks/)
* [Pelagus Documentation](https://pelaguswallet.io/docs/)
