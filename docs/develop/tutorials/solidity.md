---
title: Deploy with Solidity
description: A guide to deploying a simple single-chain smart contract on Quai Network.
sidebar_position: 1
keywords:
  - simple smart contract
  - solidity
  - hardhat
  - greeter
---

## Introduction

This article shows how to **deploy a Solidity smart contract using Hardhat** on any of Quai Network's chains. For more complex deployments involving SolidityX and multi-chain deployments, visit the [Deploy with SolidityX Tutorial](/develop/tutorials/solidityX.md).

## Prerequisites

To deploy single chain smart contracts on Quai, we'll need a few tool-kits and dependencies.

Here's an **overview of all of the dependencies** we'll be using:

- [**NodeJS**](https://nodejs.org/en/download/): Javascript runtime environment. Use the LTS version.
- Quai Network [**hardhat-example**](https://github.com/dominant-strategies/hardhat-example): A simple Hardhat project with sample contracts and deploy scripts.

## Environment Setup

### Dependencies

Start by cloning the `hardhat-example` repository, **navigating to the `Solidity` directory** we'll be using for this tutorial, and installing the dependencies via `npm`.

```bash
git clone https://github.com/dominant-strategies/hardhat-example.git
cd hardhat-example/Solidity
npm install
```

### Smart Contracts

The `Solidity` directory comes with 2 sample contracts: `ERC20.sol` and `ERC721.sol` inside of the `contracts/` directory. Both contracts are implementations derived from the [Open Zeppelin library](https://www.openzeppelin.com/contracts).

We'll be using the `ERC20.sol` sample contract for this tutorial, but you can also add your own contracts or use contracts from other libraries.

### Environment Variables

We've included a sample environment file, [`.env.dist`](https://github.com/dominant-strategies/hardhat-example/blob/main/.env.dist), file at the root of the `hardhat-example` repo to manage token details, private keys, and RPC URLs in a secure fashion.

:::note
The `.env.dist` file is a template file and should not be used as is. You should copy the `.env.dist` file to a new `.env` file in the repository root using the following command:

This file lives at the root of the `hardhat-example` repository and serves as the config file for both the `Solidity` and `SolidityX` directories.
:::

Copy the `.env.dist` file in the root to a new `.env` file in the repository root using the following command:

```bash
cp ../.env.dist ../.env
```

Open the `.env` file and add your private keys, RPC URLs, and token args for the contract you'd like to deploy. The `.env` file should look like this:

```bash title=".env"
# Unique Privkey for each deployment address
CYPRUS1PK="0x3700000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x00 - 0x1D
CYPRUS2PK="0x9400000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x1E - 0x3A
...more priv keys

# Chain ID (local: 1337, testnet: 9000, devnet: 12000)
CHAINID="9000"

# RPC endpoints
CYPRUS1URL="https://rpc.cyprus1.colosseum.quaiscan.io"
CYPRUS2URL="https://rpc.cyprus2.colosseum.quaiscan.io"
CYPRUS3URL="https://rpc.cyprus3.colosseum.quaiscan.io"
...more rpc urls

# Token Arguments
...more token args
```

:::info
The `PRIVKEY` values must all be for unique addresses and correspond to the chain name, i.e. your `CYPRUS1PK` should be the private key of your Cyprus-1 address.

All of the `RPCURL` values have already been filled in for you, but you can change them to your own RPC URLs if you're running your own nodes.
:::

Further information on RPC endpoints can be found in the [local network specifications](/develop/networks.md#local-network) section for **local nodes** and the [testnet specifications](/develop/networks.md#testnet) section for **remote nodes**.

After filling in your private keys, RPC URLs, we're now ready to securely consume them inside of `hardhat.config.js`.

### Hardhat Configuration

Hardhat uses `hardhat.config.js` to configure smart contract deployments. The config file allows you to define deployment networks, tasks, compilers, etc.

`hardhat-example` contains a prebuilt `hardhat.config.js` file with configurations for deploying and verifying smart contracts on any shard in the network.

The file should look like this:

```javascript title="hardhat.config.js"
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

module.exports = {
  defaultNetwork: "cyprus1",
  networks: {
    cyprus1: {
      url: `${process.env.CYPRUS1URL}`,
      accounts: [process.env.CYPRUS1PK],
      chainId: Number(process.env.CHAINID),
    },
    cyprus2: {
      url: `${process.env.CYPRUS2URL}`,
      accounts: [process.env.CYPRUS2PK],
      chainId: Number(process.env.CHAINID),
    },
    ...more networks
  },

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

etherscan: {
    apiKey: {
      cyprus1: "abc",
      ...more api keys
    },
    customChains: [
      {
        network: "cyprus1",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://cyprus1.colosseum.quaiscan.io/api",
          browserURL: "https://cyprus1.colosseum.quaiscan.io",
        },
      },
      ...more verification configs
    ],
  },
};
```

Inside the config file you can find deployment and verification definitions for:

- `cyprus1`
- `cyprus2`
- `cyprus3`
- `paxos1`
- `paxos2`
- `paxos3`
- `hydra1`
- `hydra2`
- `hydra3`

When deploying or verifying a contract, `hardhat.config.js` will pull your private keys and RPC URLs from the `.env` file and use them to deploy and verify your contracts. You can also specify the Solidity version and compiler settings in the `solidity` object.

## Deploy

### Compile with Hardhat

Smart contract compilation with Hardhat is simple and can be done using `npx` in the CLI.

Compile all of the contracts inside the `contracts/` directory with:

```bash
npx hardhat compile
```

Which should output:

```bash
Downloading compiler 0.8.20

Compiled 2 Solidity files successfully
```

### Deployment Scripts

Inside the `scripts/` directory, you'll find a deploy script for both `ERC20.sol` and `ERC721.sol`: `deployERC20.js` and `deployERC721.js`. For this tutorial, we'll be using `deployERC20.js`.

The `deployERC20.js` script pulls your network configuration from `hardhat.config.js` and your token arguments from the `.env` file at the root of the repository and uses them to deploy your contract.

Token arguments are consumed via the `tokenArgs` object:

```js
tokenArgs = {
  name: process.env.ERC20_NAME, // Name of token
  symbol: process.env.ERC20_SYMBOL, // Symbol of token
  initialSupply: process.env.ERC20_INITIALSUPPLY, // Initial supply of token, will be minted to deployer
};
```

Your specified network configuration is consumed inside of the `provider` and `wallet` variables in tandem with the compiled contract ABI and bytecode to create a new contract instance:

```js
const provider = new quais.providers.JsonRpcProvider(hre.network.config.url);
const wallet = new quais.Wallet(hre.network.config.accounts[0], provider);
const ERC20 = new quais.ContractFactory(ERC20Json.abi, ERC20Json.bytecode, wallet);
```

We'll use these ideas to properly modify the token args and network specification to deploy our contract in the next step.

:::tip
The `deployERC721.js` script functions in a similar manner, but with different contract arguments and a different contract ABI and bytecode. You can replicate this configuration for any contract you'd like to deploy.
:::

### Deploy Your Contract

The deploy script takes in a `--network` flag to specify the network you'd like to deploy to (available options can be found [here](#hardhat-configuration)). For this tutorial, we'll be deploying to `cyprus1`.

```bash
npx hardhat run scripts/deployERC20.js --network cyprus1
```

Which should output:

```bash
1 -- Deploy transaction broadcasted: 0x235fdeb85db5b6cee8da9780e2246907e8342751849f5ce3514847a5dffd916f
2 -- Waiting for transaction to be mined.
3 -- Transaction mined. ERC20 deployed to: 0x13d8c5fc0AB5A87870353f3C0409c102f2a772A9
  -- Gas used: 249168
```

Congratulations, you've now deployed a ERC20 token to Quai Network!

:::warning
The `ERC20.sol` and `ERC721.sol` sample contracts are basic implementations of each token for example purposes. It is highly recommended to modify these contracts to fit your specific use case before deploying them for any production use.
:::

## Interact with a Smart Contract

Hardhat console does not currently offer support for interaction with smart contracts on Quai Network. In order to interact with your smart contract, you'll need to utilize the the [client JSON RPC](/develop/apis/json-rpc-api.md) or [quais.js](https://www.npmjs.com/package/quais) library. You can find quais examples in the [quais-by-example](https://github.com/dominant-strategies/quais-by-example) repository.

## Summary

Now you have all the tools you need to create a simple Hardhat project, deploy, and interact with your own smart contracts.
