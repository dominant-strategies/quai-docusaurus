---
title: Single-Chain Deployment Tutorial
description: A guide to deploying a single-chain smart contract on Quai.
hide_table_of_contents: false
sidebar_position: 1
---

# Single-Chain Deployment Tutorial

## Introduction

This article shows how to **deploy a simple smart contract using Hardhat** on any of Quai Network's 9 chains. This tutorial covers deploying a **simple, non SolidityX** based smart contract to a single chain within Quai Network. For more complex deployments involving SolidityX or multi-chain deployments, visit the [Multi-Chain Deployment Tutorial](../tutorials/multi-chain.md).

:::warning
If you want to skip basic environment setup for contract deployment, the [hardhat-example](https://github.com/dominant-strategies/hardhat-example) repository provides a **pre-configured environment for deploying smart contracts on Quai Network**. Clone the repository on your local machine to get started.
:::

## Prerequisites

### NodeJS

To use Hardhat, you'll need the LTS version of [nodejs](https://nodejs.org/en/download/). NodeJS bundles `npm` and `npx`.

Hardhat also supports yarn usage.

### Hardhat

[Hardhat](https://hardhat.org/) is an EVM development environment for professionals written in TypeScript. It is useful for performing frequent tasks such as running tests, automatically checking code for mistakes, or interacting with a smart contract.

### Quai Network and Solidity

It is useful to have basic knowledge of both [Quai Network](../../learn/intro.md) and [Solidity](https://docs.soliditylang.org/en/latest/). Quai Network utilizes a modified version of Solidity named [SolidityX](https://github.com/dominant-strategies/SolidityX) that provides support for [additional opcodes](../smart-contracts/opcode-additions.md#examples).

Deployment of a smart contract on a Quai Network chain requires:

* An active instance of a [Quai Network full node](../../participate/node/start-a-node/start-a-node.md) or a [remote node's RPC endpoint](../networks.mdx#important-links-and-specs).
* Sufficient balance in the address that you are deploying with.

## Environment Setup

### Initialize Hardhat

Hardhat is utilized through a local installation within individual project directories. Start by creating an `npm` project.

We'll be installing a slightly modified version of Hardhat called [quai-hardhat](https://github.com/dominant-strategies/quai-hardhat). Quai-hardhat adds [SolidityX compiler](https://github.com/dominant-strategies/solidityX) support while retaining all of the base functionality of Hardhat that EVM developers are accustomed to.

:::info
While SolidityX compiler support is not explicitly required for this tutorial, we'll go through the process of installing it for future use.
:::

```bash
mkdir deploy-simple-quai-contract
cd deploy-simple-quai-contract
npm init -y
```

Running `npm init` will prompt you to name your project and configure a few other variables.

Install Hardhat by running:

```bash
npm install --save-dev git@github.com:dominant-strategies/quai-hardhat.git
```

Install dependencies:

```bash
npm install dotenv quais quais-polling
```

Initialize the Hardhat development process using:

```bash
npx hardhat
```

After running this command, Hardhat will output a number of options below:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
Welcome to Hardhat v2.17.2
? What do you want to do? …
❯ Create a Javascript project
  Create a TypeScript project
  Create an empty hardhat.config.js
  Quit
```

For this article, we will select the `Create a Javascript project` option. This will provide you with a preset basic Hardhat project structure with simple smart contracts, tests, and example scripts written in Javascript.

:::info
Selecting this option allows you to automatically install `@nomicfoundation/hardhat-toolbox`.
:::

### Smart Contracts

The `Create a Javascript project` setup option provides a sample contract named `Lock.sol`. In this tutorial, we're going to deploy a simpler contract example named `Greeter.sol`.

In the contracts folder, create a file named `Greeter.sol` and paste the following code into it.

```
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;
contract Greeter {
    string private greeting;
    constructor(string memory _greeting) {
        greeting = _greeting;
    }
    function greet() public view returns (string memory) {
        return greeting;
    }
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
```

The `Greeter.sol` contract allows the deployer to initialize a contract with a greeting stored on-chain, retrieve the greeting string, and change the greeting as needed.

### Environment Variables

To prevent committing your private keys or RPC endpoints, create an environment file to securely store variables. Ensure that `.env` is in your `.gitignore`.

Use the following command to create an environment file:

```
touch .env
```

After creating the `.env` file, paste the following code into it:

```
## Sample environment file - change all values as needed
# Privkey 
PRIVKEY="0x0000000000000000000000000000000000000000000000000000000000000000"
# RPC 
RPCURL="http://localhost:8610" # Cyprus-1 URL
```

You can define your `RPCURL` with either a local or remote endpoint. Information on endpoints can be found on the [Node Overview page](../../participate/node/node-overview/#networking-and-conventions) for **local nodes** and the [Network Specification](../networks.mdx#important-links-and-specs) page for **remote nodes**.

After providing a private key and a desired RPC URL, we're now ready to securely consume them inside of `hardhat.config.js`.

### Hardhat Configuration

Hardhat uses `hardhat.config.js` to configure smart contract deployments. The config file allows you to define deployment networks, tasks, compilers, etc.

Paste the following code into your `hardhat.config.js` file to configure deployments to either the `colosseum`, `garden`, or `local` networks.

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox');

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

module.exports = {
  defaultNetwork: "colosseum",
  networks: {
    // testnet
    colosseum: {
      url: `${process.env.RPCURL}`,
      accounts: [process.env.PRIVKEY],
      chainId: 9000, // colosseum chainId
    },
    // devnet
    garden: {
      url: `${process.env.RPCURL}`,
      accounts: [process.env.PRIVKEY],
      chainId: 12000, // garden chainId
    },

    // local
    local: {
      url: `${process.env.RPCURL}`,
      accounts: [process.env.PRIVKEY],
      chainId: 1337, // local chainId
    },
  },

  // include compiler version defined in your smart contract
  solidity: {
    compilers: [
      {
        version: '0.8.9',
      },
    ],
  },

  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
```

## Deploy

### Compile with Hardhat

Smart contract compilation with Hardhat is simple and can be done using `npx` in the CLI.

If you've used Hardhat before in this directory, you'll need to reset your compilers before compiling any SolidityX based contracts. You can do this by running:

```bash
npx hardhat clean --global
```

Now that we've reset our compilers (or not if you have a clean install of Hardhat), we can go ahead and compile the `Greeter.sol` contract using:

```bash
npx hardhat compile
```

Which should output:

```
Downloading compiler 0.8.9
Downloading Solidity X from https://github.com/dominant-strategies/SolidityX/releases/download/0.0.1/solc
Compiled 1 Solidity file successfully
```

:::info
Quai-hardhat will automatically download the SolidityX compiler on first compile, regardless of whether the contract you're compiling utilizes it.
:::

### Add Deployment Script

The Hardhat sample project has a pre-made deployment script named `deploy.js` in the `scripts` directory. Copy the following into the `deploy.js` file.

```javascript
const quais = require('quais');
const { pollFor } = require('quais-polling')
const hre = require('hardhat');

async function main() {
	const ethersContract = await hre.ethers.getContractFactory('Greeter');
	const quaisProvider = new quais.providers.JsonRpcProvider(hre.network.config.url);

	const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], quaisProvider);
	await quaisProvider.ready;

	const QuaisContract = new quais.ContractFactory(
		ethersContract.interface.fragments,
		ethersContract.bytecode,
		walletWithProvider
	);

	const quaisContract = await QuaisContract.deploy('Hello Quai', {
		gasLimit: 1000000
	});


	// Use quais-polling to wait for contract to be deployed
	const deployReceipt = await pollFor(
		quaisProvider, // provider passed to poller
		'getTransactionReceipt', // method to call on provider
		[quaisContract.deployTransaction.hash], // params to pass to method
		1.5, // initial polling interval in seconds
		1 // request timeout in seconds
	)
	console.log('Contract deployed to address: ', deployReceipt.contractAddress)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

```

Using `deploy.js`, we can set the initial greeting and log out the contract address upon deployment. Scripts can be used to automate many different functions other than deployment.

### Deploy Your Contract

To deploy `Greeter.sol` to the local network set in your `hardhat.config.js`, run:

```bash
npx hardhat run scripts/deploy.js --network local
```

Which should output:

```
Found address 0x0f12d55D09D5E53DB2941a6119d27aa83cFD11f7 on shard zone-0-0 for shard zone-0-0
Deploying contract with address: [object Object]
Deployed at: 0x13d8c5fc0AB5A87870353f3C0409c102f2a772A9
```

Congratulations, you've now deployed a simple smart contract to Quai Network!

## Interact with a Smart Contract

Hardhat console does not currently offer support for interaction with smart contracts on Quai Network. In order to interact with your smart contract, you'll need to utilize the the [client JSON RPC](../apis/json-rpc-api.md) or [quais.js](https://www.npmjs.com/package/quais) library, which functions similar to [ethers.js](https://www.npmjs.com/package/ethers).

## Summary

Now you have all the tools you need to launch a local instance of Quai Network, create a simple Hardhat project, deploy, and interact with your own smart contracts.