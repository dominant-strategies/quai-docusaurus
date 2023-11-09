---
title: Development FAQ
description: Answers to frequently asked questions about developing on Quai.
hide_table_of_contents: false
---

# Development FAQ

## Smart Contracts

### Deploy Requirements

**What are the prerequisite requirements to deploy a smart contract?**

To deploy a smart contract on Quai, you'll need a few things:

- QUAI to cover gas: similar to a normal transaction, you'll need to set your gas limit. Be aware that contract deployment requires significantly more gas than a simple transfer.\_
- Contract Bytecode: generated using a [compiler](https://www.alchemy.com/overviews/solidity-compiler)
- Deployment script or plugin
- Access to a Quai node: you can do this either by [running your own node](../participate/node/start-a-node.md), [accessing a publicly available node](./networks.mdx), or through API key via a node service.

### Local v. Remote Deploy

**Do I have to run a local node to deploy, or can I use RPC endpoints?**

You can use either. Importantly, however, if you are deploying your contracts using your own local node, you must be synced to the tip of each blockchain you wish to deploy a contract on.

In practice, this means that if you are operating a slice node, you’ll need to use RPC endpoints to deploy to any chains other than the single Zone chain that your node maintains. On the other hand, if you are running a global node, you will be able to deploy against your local node in all chains and will not need to use an RPC endpoint for any chain.

RPC endpoints:

| Chain Name | Chain Index | RPC Endpoint                              |
| ---------- | ----------- | ----------------------------------------- |
| Cyprus-1   | [0 0]       | https://rpc.cyprus1.colosseum.quaiscan.io |
| Cyprus-2   | [0 1]       | https://rpc.cyprus2.colosseum.quaiscan.io |
| Cyprus-3   | [0 2]       | https://rpc.cyprus3.colosseum.quaiscan.io |
| Paxos-1    | [1 0]       | https://rpc.paxos1.colosseum.quaiscan.io  |
| Paxos-2    | [1 1]       | https://rpc.paxos2.colosseum.quaiscan.io  |
| Paxos-3    | [1 2]       | https://rpc.paxos3.colosseum.quaiscan.io  |
| Hydra-1    | [2 0]       | https://rpc.hydra1.colosseum.quaiscan.io  |
| Hydra-2    | [2 1]       | https://rpc.hydra2.colosseum.quaiscan.io  |
| Hydra-3    | [2 2]       | https://rpc.hydra3.colosseum.quaiscan.io  |

### QRC-721 Linking

**How does the “addApprovedAddress.js” script provided in the docs tutorial change when deploying a QRC-721?**

The addApprovedAddress.js script provided in the “Deploy a Multi-Chain Smart Contract” tutorial in the Quai docs is specifically designed to link the deployed QRC-20 contracts. To interlink QRC-721 contracts, you can use the same script, but need to replace all instances of “20” in the script with “721”.

You can use the exact same script to link QRC-721 and QRC-20 contracts **only** because they use the same method for linking/adding approved contracts. This may not be true for all contracts.