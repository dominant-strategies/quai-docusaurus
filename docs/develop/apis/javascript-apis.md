---
title: JavaScript APIs
description: An overview of the JavaScript APIs available for interacting with Quai Network.
sidebar_position: 1
keywords:
  - sdk
  - api
  - javascript
  - quais
---

## Overview

Every application built on top of Quai Network requires a connection to the network in order to interact with smart contracts, send transactions, or sign messages on behalf of a user. Using the direct client JSON-RPC API is possible, but the methods can be quite verbose for use in application interfaces.

JavaScript APIs and SDKs offer a simplified interface for web applications to interact with Quai Network via one-line methods, conversion utils, and smart contract wrappers.

### Available Libraries

- **Quais.js -** A complete Quai Network interaction library for JavaScript and TypeScript.

  - [GitHub](https://github.com/dominant-strategies/quais5.js)
  - [Package](https://www.npmjs.com/package/quais)
  - [Example usage](https://github.com/dominant-strategies/quais-by-example)

- **quais-polling -** A polling shim-package that adds polling capabilities back to Quais.js in a simple but highly visible way.

  - [GitHub](https://github.com/dominant-strategies/quais-shim)
  - [Package](https://www.npmjs.com/package/quais-polling)

:::warning
Quais.js is a fork of [Ethers.js](https://docs.ethers.org/v5/) and functions similarly. **Polling capabilities have been removed from Quais.js to prevent unnecessary network requests.**
:::

### Library Features

#### Connect to Quai Nodes

Abstract providers make it easy to connect to, read data from, and broadcast transactions to Quai Network nodes. Providers are composable, so you can connect to remote endpoints, local nodes, or even custom infrastructure.

Providers can query **any zone chain** in the network for:

- Block data
- Transaction data and gas estimates
- Account balances
- Smart contract data
- And more...

##### Example

```javascript
// Connect to a remote node
const provider = new quais.providers.JsonRpcProvider('https://rpc.cyprus1.colosseum.quaiscan.io');

// Connect to an injected provider (e.g. Pelagus)
const provider = new quais.providers.Web3Provider(window.ethereum);
```

#### Smart Contract Functionality

Libraries like Quais.js provide smart contract wrappers that make it easy to call smart contract functions, return event data, and read state variables.

Smart contract wrappers serve as JavaScript interpreters for contract ABIs, allowing you to call functions and read data from smart contracts without having to interface with Solidity directly.

Smart contract wrappers also provide a number of useful features, including:

- Transaction simulation
- Raw transaction generation
- Event filtering

##### Example

```javascript
// set up a contract interface
const contract = new quais.Contract(contractAddress, contractABI, provider);

// call a contract function
const result = await contract.setGreeting('Hello, world!');

// read a contract state variable
const greeting = await contract.greet();
```

#### Utilities

Quais.js ships with a number of small but powerful utilities that make working with Quai Network simple. They provide useful shortcuts for converting units, getting shard information, and formatting data.

Other useful utilities include:

- Unit conversion and parsing
- Data encoding and formatting
- Address validation

##### Example

```javascript
// get shard name from an address
const shard = quais.utils.getShardFromAddress('0xa844d9a88331e9688d3065f92c11e25ab1e50aa6');

// parse units to BigNumber
const quai = quais.utils.parseUnits('1');

//RLP encode arbitrary data
const encoded = quais.utils.RLP.encode(['Hello, world!']);
```
