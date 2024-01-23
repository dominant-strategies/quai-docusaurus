---
title: Multi-Chain Deployment Tutorial
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

We'll be using the basic implementation of a [QRC20 token](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol), an adapted version of the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20), to showcase cross-chain contracts for this tutorial.

:::warning
If you want to skip basic environment setup for contract deployment, the [hardhat-example](https://github.com/dominant-strategies/hardhat-example) repository provides a **pre-configured environment for deploying smart contracts on Quai Network**. Clone the repository on your local machine to get started.
:::

## Dependency Overview

To deploy multi-chain smart contracts, we'll need a few tool-kits and dependencies.

Here's an **overview of all of the dependencies** we'll install in the [Environment Setup section](#environment-setup):

- [**NodeJS**](https://nodejs.org/en/download/): Javascript runtime environment.
- [**Hardhat**](https://hardhat.org/) **+** [**quai-hardhat-plugin**](https://www.npmjs.com/package/quai-hardhat-plugin)**:** An EVM development environment toolkit with plugin support for Quai Network opcodes and contracts.
- [**SolidityX**](https://github.com/dominant-strategies/SolidityX)**:** Quai Network's implementation of Solidity with support for [cross-chain opcodes](/develop/smart-contracts/opcode-additions.md).
- [**quais.js**](https://www.npmjs.com/package/quais)**:** A javascript library for blockchain development on Quai Network.
- [**quais-polling**](https://www.npmjs.com/package/quais-polling): A shim package that adds polling functionality back to quais.js for specific use cases.
- [**Dotenv**](https://www.npmjs.com/package/dotenv): A zero-dependency module that securely loads environment variables.

:::info
Ensure you have NodeJS installed prior to moving on. **We'll install all other relevant dependencies in the Environment Setup section.**
:::

## Environment Setup

We'll be installing Hardhat with the accompanying [quai-hardhat-plugin](https://www.npmjs.com/package/quai-hardhat-plugin) that provides support for utilizing locally built Solidity compilers like [SolidityX](https://github.com/dominant-strategies/SolidityX/).

Hardhat is typically utilized through local installations within individual project directories. Start by creating an `npm` project.

```bash
mkdir deploy-multi-chain-contract
cd deploy-multi-chain-contract
npm init -y
```

Install Hardhat with:

```bash
npm install hardhat --save-dev
```

Install quais, quais-polling, quai-hardhat-plugin and dotenv:

```bash
npm install dotenv quais quais-polling quai-hardhat-plugin --save-dev
```

Lastly, initialize Hardhat:

```bash
npx hardhat
```

This command will display a number of project initialization options like below:

```bash
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

For the purpose of this article, we'll be selecting `Create a Javascript Project`, which will provide us with a basic project structure to adapt for a multi-chain contract deployment.

:::info
Selecting this option allows you to automatically install `@nomicfoundation/hardhat-toolbox`.
:::

### Environment Variables

Deploying a multi-chain smart contracts via Hardhat requires private keys for multiple addresses with funds available to deploy contracts in each deployment chain. In order to keep private keys from being committed to a repository, we'll load them in from a `.env` file. Hardhat by default includes your `.env` files in the `.gitignore` file to prevent keys or sensitive information from making it off of your machine.

:::danger
Private key safety is paramount and you should ensure that when deploying, your keys are properly handled.
:::

To create an `.env` file, run the following command:

```bash
touch .env
```

After creating your environment file, we'll need to configure it for multi-chain deployments. This can be done by pasting the following code into the file:

```bash title=".env"
# Unique Privkey for each deployment address
CYPRUS1PK="0x3700000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x00 - 0x1D
CYPRUS2PK="0x9400000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x1E - 0x3A
CYPRUS3PK="0x0200000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x3B - 0x57
PAXOS1PK="0x7100000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x58 - 0x73
PAXOS2PK="0x8500000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x74 - 0x8F
PAXOS3PK="0x0400000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0x90 - 0xAB
HYDRA1PK="0x9100000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0xAC - 0xC7
HYDRA2PK="0x5900000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0xC8 - 0xE3
HYDRA3PK="0xa700000000000000000000000000000000000000000000000000000000000000" # For pubkey starting with 0xE4 - 0xFF

# Chain ID (local: 1337, testnet: 9000, devnet: 12000)
CHAINID="9000"

# RPC endpoints
CYPRUS1URL="https://rpc.cyprus1.colosseum.quaiscan.io"
CYPRUS2URL="https://rpc.cyprus2.colosseum.quaiscan.io"
CYPRUS3URL="https://rpc.cyprus3.colosseum.quaiscan.io"
PAXOS1URL="https://rpc.paxos1.colosseum.quaiscan.io"
PAXOS2URL="https://rpc.paxos2.colosseum.quaiscan.io"
PAXOS3URL="https://rpc.paxos3.colosseum.quaiscan.io"
HYDRA1URL="https://rpc.hydra1.colosseum.quaiscan.io"
HYDRA2URL="https://rpc.hydra2.colosseum.quaiscan.io"
HYDRA3URL="https://rpc.hydra3.colosseum.quaiscan.io"
```

In this environment file, we've introduced private keys and RPC endpoint URLs for each of the chains in Quai Network as well as the `CHAINID` variable to allow for easy configuration of the network environment you're deploying to.

**You'll need to change the chain specific keys and RPC endpoint URLs** for each of the chains you plan to deploy a contract on, i.e. if you want to deploy on Cyprus 1 and Paxos 2, you'll need to change the `CYPRUS1PK`, `PAXOS2PK`, `CYPRUS1URL`, and `PAXOS2URL` to deploy to those chains.

Information on endpoints can be found in the [local network specifications](/develop/networks.md#local-network) section for **local nodes** and the [testnet specifications](/develop/networks.md#testnet) section for **remote nodes**.

### SolidityX Compiler

To be able to properly compile and deploy SolidityX contracts, we'll need the [SolidityX](https://github.com/dominant-strategies/SolidityX).There are two methods of installing the SolidityX compiler for use with Hardhat:

- Install the SolidityX compiler via [`quai-hardhat-plugin`](https://www.npmjs.com/package/quai-hardhat-plugin) (**Recommended**)
- Install and build the SolidityX compiler from source

#### Installing via Plugin

If you've installed `quai-hardhat-plugin` already, the SolidityX compiler will be installed automatically when you run `npx hardhat compile` for MacOS and Linux users. Windows is not currently supported by the plugin.

#### Installing from Source

**Note:** Building the compiler from source still requires the `quai-hardhat-plugin` to be installed.

Visit the [SolidityX Repository](https://github.com/dominant-strategies/SolidityX) for instructions on how to clone and build the SolidityX compiler for your specific operating system.

Once you've built the SolidityX compiler, you'll need to add path to your `solc` binary into the `customCompilerPath` variable in the `hardhat.config.js` file. The file already includes common paths for MacOS and Linux as comments.

:::info
Take note of the file location of the resultant location of the `solc` binaries. We'll need it in the next section.
:::

### Hardhat Configuration

Hardhat uses `hardhat.config.js` to configure smart contract deployments. The config file allows you to define deployment networks, tasks, compilers, etc.

For multi-chain deployments, we've created a specialized `hardhat.config.js` file that contains routing for each shard within Quai Network based on your defined environment variables.

With the help of `quai-hardhat-plugin`, `hardhat.config.js` allows us to pass in our locally built SolidityX compiler for use with cross-chain enabled contracts. Replace the `compilerPath` variable with the path to your locally built `solc` from the [previous section](#solidityx-compiler).

:::info
This `hardhat.config.js` file is not the sole way to configure multi-chain contract deployments, but provides a template for easily executing them in efficient manner.
:::

```javascript title="hardhat.config.js"
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox');
require('quai-hardhat-plugin');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const chainId = Number(process.env.CHAINID);

module.exports = {
  defaultNetwork: 'cyprus1',
  networks: {
    cyprus1: {
      url: process.env.CYPRUS1URL.toString(),
      accounts: [process.env.CYPRUS1PK],
      chainId: chainId,
    },
    cyprus2: {
      url: `${process.env.CYPRUS2URL}`,
      accounts: [process.env.CYPRUS2PK],
      chainId: chainId,
    },
    cyprus3: {
      url: `${process.env.CYPRUS3URL}`,
      accounts: [process.env.CYPRUS3PK],
      chainId: chainId,
    },
    paxos1: {
      url: `${process.env.PAXOS1URL}`,
      accounts: [process.env.PAXOS1PK],
      chainId: chainId,
    },
    paxos2: {
      url: `${process.env.PAXOS2URL}`,
      accounts: [process.env.PAXOS2PK],
      chainId: chainId,
    },
    paxos3: {
      url: `${process.env.PAXOS3URL}`,
      accounts: [process.env.PAXOS3PK],
      chainId: chainId,
    },
    hydra1: {
      url: `${process.env.HYDRA1URL}`,
      accounts: [process.env.HYDRA1PK],
      chainId: chainId,
    },
    hydra2: {
      url: `${process.env.HYDRA2URL}`,
      accounts: [process.env.HYDRA2PK],
      chainId: chainId,
    },
    hydra3: {
      url: `${process.env.HYDRA3URL}`,
      accounts: [process.env.HYDRA3PK],
      chainId: chainId,
    },
  },

  // optional solidityx config for locally built solcx, if not specified solcx will be downloaded

  // common macOS path to local solc (uncomment and edit path if using macOS)
  // solidityx: { compilerPath: '/usr/local/bin/solc' },
  // common Linux path to local solc (uncomment and edit path if using Linux)
  // solidityx: { compilerPath: '/path/to/SolidityX/build/solc/solc' },

  solidity: {
    compilers: [
      {
        version: '0.8.0',
      },
    ],
  },

  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
};
```

All changes made in your `.env` file will be auto-configured for deployments within the `hardhat.config.js` file and passed on to the dependent deploy scripts.

To deploy a contract to one of the chains defined above, all you'll need to do is pass the desired network name in as a flag to the deployment command.

### Smart Contracts

As mentioned in the above introduction, we'll be deploying the initial implementation of the [QRC-20 smart contract](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol).

:::info
Before configuring and deploying the QRC-20, we recommend getting familiar with the [contract specs](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol).
:::

Start by removing the sample `Lock.sol` contract provide by Hardhat in the `contracts` directory.

```bash
rm -rf contracts/Lock.sol
```

After `Lock.sol` has been removed, create a new contract in the same directory named `QRC20.sol`.

```bash
touch contracts/QRC20.sol
```

Copy the [QRC-20 Token code](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol) and paste it into the `QRC20.sol` file.

## Deploy

### Compile with Hardhat + SolidityX

If you've used Hardhat before in this directory, you'll need to reset your compilers before compiling any SolidityX based contracts. You can do this with the following command:

```bash
npx hardhat clean --global
```

Now that we've reset our compilers, we can go ahead and compile the `QRC20.sol` contract using the SolidityX compiler:

```bash
npx hardhat compile
```

Which should output:

```bash
Downloading compiler 0.8.0

Compiled 1 Solidity file successfully
```

### Add Deployment Script

The Hardhat sample project has a pre-made deployment script named `deploy.js` in the `scripts` directory. Copy the following into the `deploy.js` file.

In the `deploy.js` script below, you can configure your token deployment details via the `constructorArgs` object. The `constructorArgs` object contains the following parameters:

- `name`: The name of your token
- `symbol`: The symbol of your token
- `totalSupply`: The total supply of your token

:::info
Note, the `_totalSupply` variable is specific to each chain's contract deployment. Deploying the same contract with the same `_totalSupply` will mint the same total supply to each chain.
:::

```javascript title="deploy.js"
const hre = require('hardhat');
const quais = require('quais');
const { pollFor } = require('quais-polling');
const QRC20Json = require('../artifacts/contracts/QRC20.sol/QRC20.json');

const constructorArgs = {
  name: 'Test Token',
  symbol: 'TSTK',
  totalSupply: 10000000,
};

async function main() {
  const quaisProvider = new quais.providers.JsonRpcProvider(hre.network.config.url);
  const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], quaisProvider);

  const QuaisContract = new quais.ContractFactory(QRC20Json.abi, QRC20Json.bytecode, walletWithProvider);
  const quaisContract = await QuaisContract.deploy(
    constructorArgs.name,
    constructorArgs.symbol,
    constructorArgs.totalSupply,
    {
      gasLimit: 5000000,
    }
  );
  const deployReceipt = await pollFor(
    quaisProvider, // provider passed to poller
    'getTransactionReceipt', // method to call on provider
    [quaisContract.deployTransaction.hash], // params to pass to method
    1.5, // initial polling interval in seconds
    1 // request timeout in seconds
  );
  console.log('Contract deployed. Transaction hash: ', deployReceipt.transactionHash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

`deploy.js` will pull the network configurations and deployment accounts from your `.env` and `hardhat.config.js` files via the [Hardhat Runtime Environment](https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment) based on the chain flag specified in your deployment command.

While this `deploy.js` script is configured for manual deployments to each desired shard, automating larger deployments is trivial. An example of a deployment configuration that automates deployments to all shards within Quai Network can be found in [Dominant Strategies' hardhat-example repo](https://github.com/dominant-strategies/hardhat-example/tree/main/scripts).

:::warning
Note, we've hardcoded the `gasLimit` in this deploy script to 5 million gas for sake of simplicity. When deploying a contract, it's generally more efficient to use [quais.js](https://www.npmjs.com/package/quais) to estimate the gas required for a deployment.
:::

### Deploy Your Contracts

For this tutorial, we'll be deploying **two instances** of our QRC-20 contract on two chains, each on a separate chain. You can extend the methodology used here to deploy contracts to any combination of shards within Quai Network.

We'll be deploying on QRC-20 contract to the Cyprus-1 chain. To do this, we'll pass `cyprus1` as the network flag in the deployment command like below:

```bash
npx hardhat run scripts/deploy.js --network cyprus1
```

Running this should output:

```bash
Found address 0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601 on shard zone-0-0 for shard zone-0-0
Contract deployed. Transaction hash: 0xb3c0a0d0f3bc47f4bcd5df67666d76246636741afb6134c2ba4145c51ed030d3
```

Now, we can deploy an identical QRC-20 contract to another shard within Quai, like Cyprus-2. Like before, you'll pass `cyprus2` as the network flag in the deployment command.

```bash
npx hardhat run scripts/deploy.js --network cyprus2
```

Which again should output something like this:

```bash
Found address 0x2F4C5243BEd5dC46787378894eDF662Db9FE4685 on shard zone-0-1 for shard zone-0-1
Contract deployed. Transaction hash: 0xf6802822b4f1994d0be4ae03e2b1302ed42f3b95bf0c4607f3fae671f9719333
```

We've now deployed our "Quai Cross-Chain Token" to both the Cyprus-1 and Cyprus-2 chains!

:::warning
Make sure to save these two contract addresses, we'll need them in the next section.
:::

## Link Sister Contracts

To complete our cross-chain token deployment, we'll need to link the two deployed contracts.

_"Linking"_ the two QRC-20 contracts can be done by adding their deployed contract addresses to the approved contracts array within each token contract. This can be done using the `AddApprovedAddresses` method. It accepts 2 arrays as arguments: chain indexes and approved addresses.

The `AddApprovedAddresses` method seen below can be used to add as few as 1 or as many as 8 sister contracts to the `approvedAddresses` array of a QRC-20 contract.

```solidity title="QRC20.sol"
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

Once the sister contract addresses have been added to the respective `ApprovedAddresses` of each of the QRC-20 contracts, the `crossChainTransfer` method becomes available, which allows anyone who owns the QRC-20 token to trustlessly send their balance between the shards that the contracts are deployed to.

#### Script

To link the sister contracts, we'll utilize `quais.js` and some of the Hardhat Runtime Environment that we used in the deploy script. Start by creating another file in the scripts directory named `addApprovedAddresses.js`.

```bash
touch scripts/addApprovedAddresses.js
```

Then, paste the following code into `addApprovedAddresses.js`:

```javascript title="addApprovedAddresses.js"
const quais = require('quais');
const { pollFor } = require('quais-polling');
const QRC20 = require('../artifacts/contracts/QRC20.sol/QRC20.json');

async function AddApprovedQRC20Addresses() {
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url); // grab network config from hre
  const privateKey = hre.network.config.accounts[0]; // grab wallet from hre
  const wallet = new quais.Wallet(privateKey, provider); // create wallet from key and provider
  const contractAddress = 'contract address you want to change the address array for'; // contract address to add approved addresses to
  const qrc20 = new quais.Contract(contractAddress, QRC20.abi, wallet); // define contract from address and abi

  try {
    const transaction = await qrc20.AddApprovedAddresses(
      [0, 1], // chain indexes (cyprus1 is 0, cyprus2 is 1, etc.)
      ['0x1...', '0x2....'] // contract addresses (must be in same order as chain indexes)
    );
    console.log('Transaction sent:', transaction.hash); // log transaction hash
    const transactionReceipt = await pollFor(
      provider, // provider passed to poller
      'getTransactionReceipt', // method to call on provider
      [transaction.hash], // params to pass to method
      1.5, // initial polling interval in seconds
      1 // request timeout in seconds
    );
    console.log('Transaction mined with hash', transactionReceipt.hash);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

AddApprovedQRC20Addresses();
```

The `addApprovedAddresses.js` script uses the `QRC20.sol` ABI to compose and send a transaction that inserts new addresses to the `approvedAddresses` array in any deployed QRC20 contract.

The script works by:

1. First, creating a quais `provider` with our specified network configuration from Hardhat
2. Creating a quais `wallet` with our `provider` and key config from Hardhat
3. Defining the contract we'd like to add an approved address to with the imported `QRC20.sol` ABI, contract address, and `wallet`
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

**Once the second transaction is confirmed, our two QRC20 contracts have been successfully linked across chains.** You can now send your "Quai Cross Chain Token" from Cyprus 1 to Cyprus 2 without a bridge or external service!

This deployment and linking process can be repeated for any number of chains within Quai Network purely by deploying the contract to the desired chains and linking them with the `addApprovedAddresses` method. **You now have the tools to deploy and link contracts across all 9 shards within Quai Network**.

For a more detailed example on how to deploy and link contracts across all shards within Quai Network, check out the [Dominant Strategies' quais-by-example repo](https://github.com/dominant-strategies/quais-by-example/tree/main/contract-qrc20).

:::info
The same deploy and link method can be used for any other SolidityX based contract with cross-chain logic, including the [QRC-721 Token Standard](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC721X.sol).
:::
