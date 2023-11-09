---
title: Multi-Chain Deployment Tutorial
description: A guide to deploying a multi-chain smart contract on Quai.
hide_table_of_contents: false
sidebar_position: 2
---

## Introduction

In this article, we'll detail how to **deploy, link, and interact with multi-chain smart contracts** across 2 different shards on Quai Network. _This_ _method can be extended to deploy trustless cross-chain contracts across all 9 shards._

We'll be using the basic implementation of a QRC20 token, an adapted version of the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20), to showcase cross-chain contracts for this tutorial.

:::warning
If you want to skip basic environment setup for contract deployment, the [hardhat-example](https://github.com/dominant-strategies/hardhat-example) repository provides a **pre-configured environment for deploying smart contracts on Quai Network**. Clone the repository on your local machine to get started.
:::

## Dependency Overview

To deploy multi-chain smart contracts, we'll need a few tool-kits and dependencies.

Here's an **overview of all of the dependencies** we'll install in the [Environment Setup section](#environment-setup):

- [**Hardhat**](https://hardhat.org/) **+** [**Quai-Hardhat**](https://github.com/dominant-strategies/quai-hardhat)**:** An EVM development environment toolkit with bundled support for Quai Network opcodes and contracts.
- [**SolidityX**](https://github.com/dominant-strategies/SolidityX)**:** Quai Network's implementation of Solidity with support for [cross-chain opcodes](../smart-contracts/opcode-additions.md).
- [**quais.js**](https://www.npmjs.com/package/quais)**:** A javascript library for blockchain development on Quai Network.
- [**quais-polling**](https://www.npmjs.com/package/quais-polling): A shim package that adds polling functionality back to quais.js for specific usecases.
- [**Dotenv**](https://www.npmjs.com/package/dotenv): A zero-dependency module that securely loads environment variables.
- [**NodeJS**](https://nodejs.org/en/download/)

:::info
Ensure you have NodeJS installed prior to moving on. **We'll install all other relevant dependencies in the Environment Setup section.**
:::

## Environment Setup

We'll be installing a slightly modified version of Hardhat called [quai-hardhat](https://github.com/dominant-strategies/quai-hardhat) that provides support for utilizing locally built Solidity compilers like [SolidityX](https://github.com/dominant-strategies/SolidityX/).

Hardhat is typically utilized through local installations within individual project directories. Start by creating an `npm` project.

```shell
mkdir deploy-multi-chain-contract
cd deploy-multi-chain-contract
npm init -y
```

Install quai-hardhat with:

```shell
npm install --save-dev git@github.com:dominant-strategies/quai-hardhat.git
```

Install quais, quais-polling, and dotenv:

```shell
npm install dotenv quais quais-polling
```

Lastly, initialize Hardhat:

```shell
npx hardhat
```

This command will display a number of project initialization options like below:

```shell
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

```shell
touch .env
```

After creating your environment file, we'll need to configure it for multi-chain deployments. This can be done by pasting the following code into the file:

```shell title=".env"
## Sample environment file - change all values as needed
## Default local deployment config

# Privkey for each deployment address
CYPRUS1PK="0x0000000000000000000000000000000000000000000000000000000000000000"
CYPRUS2PK="0x0000000000000000000000000000000000000000000000000000000000000000"
CYPRUS3PK="0x0000000000000000000000000000000000000000000000000000000000000000"
PAXOS1PK="0x0000000000000000000000000000000000000000000000000000000000000000"
PAXOS2PK="0x0000000000000000000000000000000000000000000000000000000000000000"
PAXOS3PK="0x0000000000000000000000000000000000000000000000000000000000000000"
HYDRA1PK="0x0000000000000000000000000000000000000000000000000000000000000000"
HYDRA2PK="0x0000000000000000000000000000000000000000000000000000000000000000"
HYDRA3PK="0x0000000000000000000000000000000000000000000000000000000000000000"

# Chain ID (local: 1337, testnet: 9000, devnet: 12000)
CHAINID="1337"

# Default local node RPC endpoints
CYPRUS1URL="http://localhost:8610"
CYPRUS2URL="http://localhost:8542"
CYPRUS3URL="http://localhost:8674"
PAXOS1URL="http://localhost:8512"
PAXOS2URL="http://localhost:8544"
PAXOS3URL="http://localhost:8576"
HYDRA1URL="http://localhost:8614"
HYDRA2URL="http://localhost:8646"
HYDRA3URL="http://localhost:8678"
```

In this environment file, we've introduced private keys and RPC endpoint URLs for each of the chains in Quai Network as well as the `CHAINID` variable to allow for easy configuration of the network environment you're deploying to.

**You'll need to change the chain specific keys and RPC endpoint URLs** for each of the chains you plan to deploy a contract on, i.e. if you want to deploy on Cyprus 1 and Paxos 2, you'll need to change the `CYRPUS1PK`, `PAXOS2PK`, `CYPRUS1URL`, and `PAXOS2URL` to deploy to those chains.

Information on endpoints can be found in the [local network specifications](../../develop/networks.mdx#local-network) section for **local nodes** and the [testnet specifications](../../develop/networks.mdx#testnet) section for **remote nodes**.

### SolidityX Compiler

To be able to properly compile and deploy SolidityX contracts, we'll need to clone and compile [SolidityX](https://github.com/dominant-strategies/SolidityX).

Clone the [SolidityX repository](https://github.com/dominant-strategies/SolidityX) to your machine with and navigate to it with:

```shell
git clone https://github.com/dominant-strategies/SolidityX.git && cd SolidityX
```

After you've cloned and navigated to the SolidityX directory, follow the build and compile instructions in the [SolidityX readme.md](https://github.com/dominant-strategies/SolidityX#the-solidity-contract-oriented-programming-language) file. This should create the `solc` and `soltest` directories on your machine.

:::info
Take note of the file location of the resultant location of the `solc` binaries. We'll need it in the next section.
:::

### Hardhat Configuration

Hardhat uses `hardhat.config.js` to configure smart contract deployments. The config file allows you to define deployment networks, tasks, compilers, etc.

For multi-chain deployments, we've created a specialized `hardhat.config.js` file that contains routing for each shard within Quai Network based on your defined environment variables.

The `hardhat.config.js` will also allow us to pass in our locally built SolidityX compiler for use with cross-chain enabled contracts. Replace the `customCompilerPath` variable with the path to your locally built `solc` from the [previous section](#solidityx-compiler).

:::info
This `hardhat.config.js` file is not the sole way to configure multi-chain contract deployments, but provides a template for easily executing them in efficient manner.
:::

```javascript title="hardhat.config.js"
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const chainId = Number(process.env.CHAINID)

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

	// path to locally built solc binaries
	customCompilerPath: '/path/to/solc/',

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
}
```

All changes made in your `.env` file will be auto-configured for deployments within the `hardhat.config.js` file and passed on to the dependent deploy scripts.

To deploy a contract to one of the chains defined above, all you'll need to do is pass the desired network name in as a flag to the deployment command.

### Smart Contracts

As mentioned in the above introduction, we'll be deploying the initial implementation of the [QRC-20 smart contract](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol).

:::info
Before configuring and deploying the QRC-20, we recommend getting familiar with the [contract specs](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol).
:::

Start by removing the sample `Lock.sol` contract provide by Hardhat in the `contracts` directory.

```shell
rm -rf contracts/Lock.sol
```

After `Lock.sol` has been removed, create a new contract in the same directory named `QRC20.sol`.

```shell
touch contracts/QRC20.sol
```

Copy the [QRC-20 Token code](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol) and paste it into the `QRC20.sol` file.

#### QRC-20 Configuration

Now that we've got our contract pasted inside of the contracts folder, we'll need to configure it for deployment. To start, edit the `_name`, `_symbol`, and `_totalSupply` variables in the constructor to your desired token name, symbol, and total supply.

```solidity title="QRC20.sol"
constructor() {
        _name = "Quai Cross-Chain Token"; // Change to your token name
        _symbol = "QXC"; // Change to your token symbol
        _deployer = msg.sender;
        _totalSupply = 1000E18; // 1000 tokens // Change to your desired token supply
        _mint(_deployer, _totalSupply);
        ...
}
```

:::info
Note, the `_totalSupply` variable is specific to each chain's contract deployment. Deploying the same contract with the same `_totalSupply` will mint the same total supply to each chain.
:::

We've now configured our QRC-20 contract and are ready to start deploying to different shards.

## Deploy

### Compile with Hardhat + SolidityX

If you've used Hardhat before in this directory, you'll need to reset your compilers before compiling any SolidityX based contracts. You can do this with the following command:

```shell
npx hardhat clean --global
```

Now that we've reset our compilers, we can go ahead and compile the `QRC20.sol` contract using the SolidityX compiler:

```shell
npx hardhat compile
```

Which should output:

```shell
Downloading compiler 0.8.0

Compiled 1 Solidity file successfully
```

### Add Deployment Script

The Hardhat sample project has a pre-made deployment script named `deploy.js` in the `scripts` directory. Copy the following into the `deploy.js` file.

```javascript title="deploy.js"
const quais = require('quais')
const hre = require('hardhat')
const { pollFor } = require('quais-polling')

async function main() {
	const ethersContract = await hre.ethers.getContractFactory('QRC20')
	const quaisProvider = new quais.providers.JsonRpcProvider(hre.network.config.url)

	const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], quaisProvider)
	await quaisProvider.ready

	const QuaisContract = new quais.ContractFactory(
		ethersContract.interface.fragments,
		ethersContract.bytecode,
		walletWithProvider
	)

	const quaisContract = await QuaisContract.deploy({ gasLimit: 4000000 })

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
		console.error(error)
		process.exit(1)
	})
```

`deploy.js` will pull the network configurations and deployment accounts from your `.env` and `hardhat.config.js` files via the [Hardhat Runtime Environment](https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment) based on the chain flag specified in your deployment command.

While this `deploy.js` script is configured for manual deployments to each desired shard, automating larger deployments is trivial. An example of a deployment configuration that automates deployments to all shards within Quai Network can be found in [Dominant Strategies' hardhat-example repo](https://github.com/dominant-strategies/hardhat-example/tree/main/scripts).

:::warning
Note, we've hardcoded the `gasLimit` in this deploy script to 4 million gas for sake of simplicity. When deploying a contract, it's generally more efficient to use [quais.js](https://www.npmjs.com/package/quais) to estimate the gas required for a deployment.
:::

### Deploy Your Contracts

For this tutorial, we'll be deploying **two instances** of our QRC-20 contract on two chains, each on a separate chain. You can extend the methodology used here to deploy contracts to any combination of shards within Quai Network.

We'll be deploying on QRC-20 contract to the Cyprus-1 chain. To do this, we'll pass `cyprus1` as the network flag in the deployment command like below:

```shell
npx hardhat run scripts/deploy.js --network cyprus1
```

Running this should output:

```shell
Found address 0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601 on shard zone-0-0 for shard zone-0-0
Deploying contract with address: [object Object]
Deployed at: 0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601
```

Now, we can deploy an identical QRC-20 contract to another shard within Quai, like Cyprus-2. Like before, you'll pass `cyprus2` as the network flag in the deployment command.

```shell
npx hardhat run scripts/deploy.js --network cyprus2
```

Which again should output something like this:

```shell
Found address 0x2F4C5243BEd5dC46787378894eDF662Db9FE4685 on shard zone-0-1 for shard zone-0-1
Deploying contract with address: [object Object]
Deployed at: 0x2F4C5243BEd5dC46787378894eDF662Db9FE4685
```

We've now deployed our "Quai Cross-Chain Token" to both the Cyprus-1 and Cyprus-2 chains!

:::warning
Make sure to save these two contract addresses, we'll need them in the next section.
:::

## Link Sister Contracts

To complete our cross-chain token deployment, we'll need to link the two deployed contracts.

"Linking" the two QRC-20 contracts can be done by adding the contract addresses to the approved contracts within each token. This is done using either the `AddApprovedAddress` which accepts a _single address_ or the `AddApprovedAddresses` method which only accepts an _array of 9 addresses_.

Since we're only adding a single contract address on each chain, we'll access the `AddApprovedAddress` method which can be seen below:

```solidity title="QRC20.sol"
function AddApprovedAddress(uint8 chain, address addr) public {
        bool isInternal;
        assembly {
            isInternal := isaddrinternal(addr)
        }
        require(!isInternal, "Address is not external");
        require(msg.sender == _deployer, "Sender is not deployer");
        require(chain < 9, "Max 9 zones");
        require(ApprovedAddresses[chain] == address(0), "The approved address for this zone already exists");
        ApprovedAddresses[chain] = addr;
}
```

Once the sister contract addresses have been added to the respective `ApprovedAddresses` of QRC-20 contracts, the `crossChainTransfer` method becomes available, which allows anyone who owns the QRC-20 token to trustlessly send their balance between the shards that the contracts are deployed to.

#### Script

To link the sister contracts, we'll utilize `quais.js` and some of the Hardhat Runtime Environment that we used in the deploy script. Start by creating another file in the scripts directory named `addApprovedAddress.js`.

```shell
touch scripts/addApprovedAddress.js
```

Then, paste the following code into `addApprovedAddress.js`:

```javascript title="addApprovedAddress.js"
const quais = require('quais');
const { pollFor } = require('quais-polling')
const QRC20 = require('../artifacts/contracts/QRC20.sol/QRC20.json');

async function AddApprovedQRC20Address() {
	const provider = new quais.providers.JsonRpcProvider(hre.network.config.url);    // grab network config from hre
	const privateKey = hre.network.config.accounts[0];                               // grab wallet from hre
	const wallet = new quais.Wallet(privateKey, provider);                           // create wallet from key and provider
	const contractAddress = "contract address you want to change the address array for";            // define contract address to add approved address to
	const contract = new quais.Contract(contractAddress, QRC20.abi, wallet);         // define contract from address and abi
	const transactionData = await contract.populateTransaction.AddApprovedAddress(
		integer addresss index,                                                      // index of address to add (0 = cyprus1, 1 = cyprus2, etc.)
		'contract address you want to add to the address array '            // address to add to approved addresses
	);
	try {
		const tx = transactionData;                             // define transaction data
		const txResponse = await wallet.sendTransaction(tx);	// send transaction
		console.log('Transaction sent:', txResponse.hash);      // log transaction hash
		const transactionReceipt = await pollFor(
			provider, // provider passed to poller
			'getTransactionReceipt', // method to call on provider
			[txResponse.hash], // params to pass to method
			1.5, // initial polling interval in seconds
			1 // request timeout in seconds
		)
		console.log('Transaction mined with hash', transactionReceipt.hash);
	} catch (error) {
		console.error('Error sending transaction:', error);
	}
}

AddApprovedQRC20Address();
```

The `addApprovedAddress.js` script uses the `QRC20.sol` ABI to compose and send a contract transaction that inserts a new address to the `approvedAddresses` array in any deployed QRC20 contract.

The script composes the contract interaction transaction by:

1. First, creating a quais `provider` with our specified network configuration from Hardhat
2. Creating a quais `wallet` with our `provider` and key config from Hardhat
3. Defining the contract we'd like to add an approved address to with the imported `QRC20.sol` ABI, contract address, and `wallet`
4. Composing the `addApprovedAddress` transaction with the inputs
   1. `chainIndex`: integer chain index (cyprus1 is 0, cyprus2 is 1, etc.)
   2. `address`: the contract address on another shard that we'd like to add to `approvedAddresses`
5. Sending the transaction and waiting for inclusion in a block.

#### Link Contracts

Now that we've set up our script, we're ready to link our two deployed contracts.

Start by grabbing the addresses of the two contracts we deployed in the [deploy section](#deploy-your-contracts).

```shell
Cyprus 1 contract address: 0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601
Cyprus 2 contract address: 0x2F4C5243BEd5dC46787378894eDF662Db9FE4685
```

First, we're going to add the Cyprus 2 contract address to the `approveAddresses` of our Cyprus 1 contract. In your `addApprovedAddresses.js` script, make the following changes:

Change the `contractAddress` variable to our **Cyprus 1 contract address**:

```javascript
const contractAddress = '0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601'
```

Then, add the edit the `transactionData` with the Cyprus 2 chain index and contract address:

```javascript
const transactionData = await contract.populateTransaction.AddApprovedAddress(
	1, // Cyprus 2 chain index
	'0x112C8693F5De667fb4867AD43f9c2FeFE1E95f03' // Cyprus 2 contract address
)
```

Now, we're ready to run the script and finish the first part of the contract linkage. Make sure to pass the `--network cyprus1` flag **when sending transactions to the Cyprus 1 contract**.

```shell
npx hardhat run scripts/addApprovedAddress.js --network cyprus1
```

The script should output something like this:

```shell
Transaction sent: 0x2a499178c3f0046b4d44a57a966f9e224759c1b3158af984fcb5a1432b16ee8e
Transaction mined with hash: 0x2a499178c3f0046b4d44a57a966f9e224759c1b3158af984fcb5a1432b16ee8e
```

We've now approved the address of our Cyprus 2 contract inside of the Cyprus 1 contract!

To finish linking these two sister contracts, we'll need to _do the reverse and approve the address of our Cyprus 1 contract inside the Cyprus 2 contract_. Go back to our `addApprovedAddress.js` script and make the following changes:

Change the `contractAddress` variable to **our Cyprus 2 contract address**:

```javascript
const contractAddress = '0x2F4C5243BEd5dC46787378894eDF662Db9FE4685'
```

And edit the `transactionData` with the Cyprus 1 chain index and contract address:

```javascript
const transactionData = await contract.populateTransaction.AddApprovedAddress(
	0, // Cyprus 1 chain index
	'0x1A3fA2C0B9c490a07a421d2b169E034C1bFcA601' // Cyprus 1 contract address
)
```

For the final step of the contract linkage, run the script with the `--network cyprus2` flag **to send the transaction to Cyprus 2**.

```
Transaction sent: 0x348e8dea20b73089b51e6b3d2b3abd8a9e8ca63e06be20375cf721e13aabd590
Transaction mined with hash: 0x348e8dea20b73089b51e6b3d2b3abd8a9e8ca63e06be20375cf721e13aabd590
```

**Once the script completes, our two QRC20 contracts have been successfully linked across chains.** You can now send your "Quai Cross Chain Token" from Cyprus 1 to Cyprus 2 without a bridge or external service!

This deployment and linking process can be repeated for any number of chains within Quai Network to create a network wide QRC20 token that can be **sent trustlessly to any shard**.

:::info
The same deploy and link method can be used for any other SolidityX based contract with cross-chain logic, including the [QRC-721 Token Standard](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC721X.sol).
:::
