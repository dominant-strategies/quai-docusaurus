---
title: Deploy with SolidityX
description: A guide to deploying and linking  multi-chain smart contracts on Quai Network.
sidebar_position: 2
keywords:
  - multi chain smart contract
  - solidityx
  - hardhat
  - QRC20
  - QRC721
---

## Introduction

In this article, we'll detail how to **deploy, link, and interact with multi-chain smart contracts** across 2 different shards on Quai Network. _This method can be extended to deploy trustless cross-chain contracts across all 9 shards._

We'll be using the basic implementation of a [QRC721 token](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC721X.sol), an adapted version of the [ERC721 standard](https://eips.ethereum.org/EIPS/eip-721), to showcase cross-chain contracts for this tutorial.

## Prerequisites

To deploy single chain smart contracts on Quai, we'll need a few tool-kits and dependencies.

Here's an **overview of all of the dependencies** we'll be using:

- [**NodeJS**](https://nodejs.org/en/download/): Javascript runtime environment. Use the LTS version.
- Quai Network [**hardhat-example**](https://github.com/dominant-strategies/hardhat-example): A simple Hardhat project with sample contracts and deploy scripts.

## Environment Setup

### Dependencies

Start by cloning the `hardhat-example` repository, **navigating to the `SolidityX` directory** we'll be using for this tutorial, and installing the dependencies via `npm`.

```bash
git clone https://github.com/dominant-strategies/hardhat-example.git
cd hardhat-example/SolidityX
npm install
```

:::tip
If you've already cloned the `hardhat-example` repository for the [Single-Chain Deployment Tutorial](/develop/tutorials/solidity.md), you can skip the cloning step. Just navigate to the `SolidityX` directory and run `npm install`.
:::

### Smart Contracts

The `SolidityX` directory comes with 2 sample contracts: `QRC20.sol` and `QRC721.sol` inside of the `contracts/` directory. Both of the included contracts are the initial SolidityX/cross-chain implementations of existing token standards. Source code for the contracts can be found in the [SolidityX-Contracts Repository](https://github.com/dominant-strategies/SolidityX-Contracts)

As mentioned above, we'll be deploying the [QRC721 smart contract](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC721X.sol). Before configuring and deploying the QRC721, we recommend getting familiar with the [contract specs](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC721X.sol) as **constructor arguments passed to the contract work a bit different than standard Solidity contracts**.

### Environment Variables

We've included a sample environment file, [`.env.dist`](https://github.com/dominant-strategies/hardhat-example/blob/main/.env.dist), file at the root of the `hardhat-example` repo to hold token details, private keys, and RPC URLs in a secure fashion.

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

Hardhat uses `hardhat.config.js` to configure smart contract deployments. The config file allows you to define deployment networks, tasks, compilers, etc. `hardhat-example/SolidityX` contains a prebuilt `hardhat.config.js` file with configurations for **compiling, deploying, verifying SolidityX smart contracts** on Quai.

The below configuration file has **two main differences** from the `hardhat.config.js` file use for basic Solidity contract deployment:

- It imports the `quai-hardhat-plugin` to **handle SolidityX compiler download**
- Inclusion of the optional `solidityx` object to specify a locally built SolidityX compiler (_if you don't want to use the plugin to download the compiler_)

The file should look like this:

```javascript title="hardhat.config.js"
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomicfoundation/hardhat-toolbox");
require('quai-hardhat-plugin');
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

  // optional solidityx config for locally built solcx, if not specified solcx will be downloaded

  // common macOS path to local solc (uncomment and edit path if using macOS)
  // solidityx: { compilerPath: '/usr/local/bin/solc' },
  // common Linux path to local solc (uncomment and edit path if using Linux)
  // solidityx: { compilerPath: '/path/to/SolidityX/build/solc/solc' },


  solidity: {
    version: "0.8.0",
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

When deploying or verifying a contract, `hardhat.config.js` will pull your private keys and RPC URLs from the `.env` file and use them to deploy and verify your contracts.

### SolidityX Compiler

To be able to properly compile and deploy SolidityX contracts, we'll need the [SolidityX](https://github.com/dominant-strategies/SolidityX). There are two methods of installing the SolidityX compiler for use with Hardhat:

- Install the SolidityX compiler via [`quai-hardhat-plugin`](https://www.npmjs.com/package/quai-hardhat-plugin) (**Recommended**)
- Install and build the SolidityX compiler from source

#### Installing via Plugin

As noted above, the `hardhat.config.js` file already includes the `quai-hardhat-plugin` to handle the SolidityX compiler download. If you've followed the above steps, you're already set up to use the plugin to download the SolidityX compiler.

#### Installing from Source

:::warning
Building the compiler from source and importing still requires the `quai-hardhat-plugin` to be installed and configured in the `hardhat.config.js` file.
:::

Visit the [SolidityX Repository](https://github.com/dominant-strategies/SolidityX) for instructions on how to clone and build the SolidityX compiler for your specific operating system.

Once you've built the SolidityX compiler, you'll need to add path to your `solc` binary into the `compilerPath` variable in the `solidityX` object in your `hardhat.config.js`. The file already includes common paths for MacOS and Linux as comments.

## Deploy

### Compile with Hardhat + SolidityX

SolidityX contract compilation with Hardhat is simple and can be done using `npx` in the CLI.

Compile all of the contracts inside the `contracts/` directory with:

```bash
npx hardhat compile
```

Which should output something like:

```bash
Info Using SolidityX at: /Users/user/hardhat-example/SolidityX/solc
Warning: This is a pre-release compiler version, please do not use it in production.

Compiled 2 Solidity files successfully (evm target: istanbul).
```

### Deployment Scripts

Inside the `scripts/` directory, you'll find a deploy script for both `QRC20.sol` and `QRC721.sol`: `deployQRC20.js` and `deployQRC721.js`. For this tutorial, we'll be using `deployQRC721.js`.

The `deployQRC721.js` script works by pulling your specified network/accounts config from `hardhat.config.js` and the QRC721 arguments specified in the `.env` file at the root of the repository and uses them to deploy your contract.

Token arguments are consumed via the `tokenArgs` object:

```javascript
const tokenArgs = {
  name: process.env.QRC721NAME,
  symbol: process.env.QRC721SYMBOL,
  baseURI: process.env.QRC721BASEURI,
};
```

Your specified network configuration is consumed inside of the `provider` and `wallet` variables in tandem with the compiled contract ABI and bytecode to create a new contract instance:

```javascript
const provider = new ethers.providers.JsonRpcProvider(hre.network.config.url);
const wallet = new ethers.Wallet(hre.network.config.accounts[0], provider);
const contract = new ethers.ContractFactory(QRC721.abi, QRC721.bytecode, wallet);
```

We'll use these ideas to properly modify the token args and network specification to deploy our contracts in the next step.

### Deploy Your Contracts

For this tutorial, we'll be deploying **one instances** of our QRC721 contract on two different chains. You can extend the methodology used here to deploy and link contracts to any combination of shards within Quai Network.

We'll be deploying the first QRC721 contract on Cyprus-1 chain. To do this, we'll pass `cyprus1` as the network flag in the deployment command like below:

```bash
npx hardhat run scripts/deployQRC721.js --network cyprus1
```

Running this should output:

```bash
1 -- Deploy transaction broadcasted: 0xb3c0a0d0f3bc47f4bcd5df67666d76246636741afb6134c2ba4145c51ed030d3
2 -- Waiting for transaction to be mined.
3 -- Transaction mined. QRC721 deployed to: 0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601
  -- Gas used: 293212
```

Now, we can deploy an identical QRC721 contract to another shard within Quai, like Cyprus-2. Like before, you'll pass `cyprus2` as the network flag in the deployment command.

:::warning
When deploying QRC721s, we recommend changing the `baseURI` variable for each chain to prevent duplicate mints or additionally modifying the QRC721 contract to handle minting on different shards. This variable can be changed in the `.env` file at the root of the repository.
:::

```bash
npx hardhat run scripts/deploy.js --network cyprus2
```

Which again should output something like this:

```bash
1 -- Deploy transaction broadcasted: 0xf6802822b4f1994d0be4ae03e2b1302ed42f3b95bf0c4607f3fae671f9719333
2 -- Waiting for transaction to be mined.
3 -- Transaction mined. QRC721 deployed to: 0x2F4C5243BEd5dC46787378894eDF662Db9FE4685
  -- Gas used: 293543
```

We've now deployed our test QRC721 contract to both the Cyprus-1 and Cyprus-2 chains!

:::note
Make sure to save these two contract addresses, we'll need them in the next section.
:::

## Link Sister Contracts

To complete our cross-chain NFT deployment, we'll need to link the two deployed contracts.

_"Linking"_ the two QRC721 contracts can be done by adding the deployed contract addresses of our QRC721s to the **approved contracts array** within each contract. This can be done using the `AddApprovedAddresses` method. It accepts 2 arrays as arguments: chain indexes and approved addresses.

The `AddApprovedAddresses` method seen below can be used to add as few as 1 or as many as 8 sister contracts to the `approvedAddresses` array of a QRC721 or QRC20 contract.

```solidity title="QRC721.sol"
function AddApprovedAddresses(uint8[] calldata chain, address[] calldata addr) external {
    require(msg.sender == _deployer, "Sender is not deployer");
    require(chain.length == addr.length, "chain and address arrays must be the same length");
    for(uint8 i = 0; i < chain.length; i++) {
        require(chain[i] < 9, "Max 9 zones");
        require(ApprovedAddresses[chain[i]] == address(0), "The approved address for this zone already exists");
        ApprovedAddresses[chain[i]] = addr[i];
    }
}
```

Once the sister contract addresses have been added to the respective `ApprovedAddresses` of each of the QRC721 contracts, the cross-chain functionality of the `transferFrom` method becomes available, which allows anyone who owns a token from the collection to trustlessly send their it between shards that the contracts are deployed to.

#### Script

To link the sister contracts, we'll utilize `quais.js` and some of the Hardhat Runtime Environment that we used in the deploy script. Start by creating another file in the scripts directory named `addApprovedAddresses.js`.

```bash
touch scripts/addApprovedAddresses.js
```

Then, paste the following code into `addApprovedAddresses.js`:

```javascript title="addApprovedAddresses.js"
const quais = require('quais');
const { pollFor } = require('quais-polling');
const QRC721 = require('../artifacts/contracts/QRC721.sol/QRC721.json');

async function AddApprovedQRC721Addresses() {
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url);
  const privateKey = hre.network.config.accounts[0];
  const wallet = new quais.Wallet(privateKey, provider);
  const contractAddress = 'contract address you want to change the address array for'; // contract address to add approved addresses to
  const qrc721 = new quais.Contract(contractAddress, QRC721.abi, wallet);
  try {
    const tx = await qrc721.AddApprovedAddresses(
      [0, 1], // chain indexes (cyprus1 is 0, cyprus2 is 1, etc.)
      ['0x1...', '0x2....'] // contract addresses (must be in same order as chain indexes)
    );
    console.log('Transaction sent:', tx.hash);
    const txReceipt = await pollFor(provider, 'getTransactionReceipt', [tx.hash], 1.5, 1);
    console.log('Transaction mined with hash', txReceipt.hash);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

AddApprovedQRC721Addresses();
```

The `addApprovedAddresses.js` script uses the `QRC721.sol` ABI to compose and send a transaction that inserts new addresses to the `approvedAddresses` array in any deployed QRC721 contract.

The script works by:

1. First, creating a quais `provider` with our specified network configuration from Hardhat
2. Creating a quais `wallet` with our `provider` and key config from Hardhat
3. Defining the contract we'd like to add an approved address to with the imported `QRC721.sol` ABI, contract address, and `wallet`
4. Composing the `addApprovedAddresses` transaction with the inputs
   1. `chainIndex` array: integer chain indices corresponding to the addresses we'd like to add to `approvedAddresses`
   2. `address` array: the contract addresses that we'd like to add to `approvedAddresses`
5. Sending the transaction and waiting for inclusion in a block.

#### Transaction Data

Now that we've set up our script, **we're ready to link our two deployed contracts**.

Start by grabbing the addresses of the two contracts we deployed in the [deploy section](#deploy-your-contracts).

```bash
Cyprus 1 contract address: 0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601
Cyprus 2 contract address: 0x2F4C5243BEd5dC46787378894eDF662Db9FE4685
```

We'll take these contract addresses and use them to build the transaction data passed to the `addApprovedAddresses` method.

:::tip
**You can pass the same transaction data to every contract you want to link**, as the `addApprovedAddresses` method **can take in and handle its own contract address as an argument**. This removes the need to alter the transaction data for each contract you want to link.
:::

The transaction data we'll need to pass to the `addApprovedAddresses` method is **(notice the order of the arrays)**:

- `chainIndex` array: `[0, 1]`
- `address` array: `['0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601', '0x2F4C5243BEd5dC46787378894eDF662Db9FE4685']

The built transaction should look similar to this:

```javascript
const transactionData = await contract.populateTransaction.AddApprovedAddress(
  [0, 1], // chain indexes [cyprus1, cyprus2]
  ['0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601', '0x2F4C5243BEd5dC46787378894eDF662Db9FE4685'] // contract addresses [cyprus1, cyprus2]
);
```

:::info
You can extend this transaction data structure to link as many contracts as you'd like by adding additional chain indexes and contract addresses to the arrays. **Always make sure to add the same number of chain indexes and contract addresses to the arrays in matching order**.
:::

#### Linking Contracts

First, we're going to send the linking transaction to our Cyprus 1 contract. To do this, start by changing the `contractAddress` variable to our **Cyprus 1 contract address** in the `addApprovedAddresses.js` script:

```javascript
const contractAddress = '0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601';
```

Now, we're ready to run the script and complete the Cyprus 1 contract linkage. Make sure to pass the `--network cyprus1` flag **when sending transactions to the Cyprus 1 contract**.

```bash
npx hardhat run scripts/addApprovedAddresses.js --network cyprus1
```

The script should output something like this:

```bash
Transaction sent: 0x2a499178c3f0046b4d44a57a966f9e224759c1b3158af984fcb5a1432b16ee8e
Transaction mined with hash: 0x2a499178c3f0046b4d44a57a966f9e224759c1b3158af984fcb5a1432b16ee8e
```

We've now linked our Cyprus 1 contract to our Cyprus 2 contract, but we're not done yet.

To finish linking these two sister contracts, we'll need to send the exact same transaction data to the Cyprus 2 contract. In the `addApprovedAddresses.js` script, change the `contractAddress` variable to **our Cyprus 2 contract address**:

```javascript
const contractAddress = '0x2F4C5243BEd5dC46787378894eDF662Db9FE4685';
```

Lastly, send the linkage transaction to our Cyprus 2 token by running the script with the `--network cyprus2` flag:

```bash
Transaction sent: 0x348e8dea20b73089b51e6b3d2b3abd8a9e8ca63e06be20375cf721e13aabd590
Transaction mined with hash: 0x348e8dea20b73089b51e6b3d2b3abd8a9e8ca63e06be20375cf721e13aabd590
```

**Once the second transaction is confirmed, our two QRC721 contracts have been successfully linked across chains.** After minting a token, you can now send your NFTs from Cyprus 1 to Cyprus 2 without a bridge or external service!

This deployment and linking process can be repeated for any number of chains within Quai Network purely by deploying the contract to the desired chains and linking them with the `addApprovedAddresses` method. **You now have the tools to deploy and link contracts across all 9 shards within Quai Network**.

For a more detailed example on how to deploy and link contracts across all shards within Quai Network, check out the [Dominant Strategies' quais-by-example repo](https://github.com/dominant-strategies/quais-by-example/tree/main/contract-qrc721).

:::info
The same deploy and link method can be used for any other SolidityX based contract with cross-chain logic, including the [QRC-20 Token Standard](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol).
:::
