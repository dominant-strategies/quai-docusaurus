---
title: Interoperability
description: How cross-chain interactions are processed in Quai Network.
slug: /interoperability
hide_table_of_contents: false
sidebar_position: 5
---

# Interoperability

All Quai chains are interoperable and composed into a coordinated network. Transactions can be sent from any Quai Zone chain to any Quai Zone chain, ensuring Quai's usability as a single, composable network.

Cross-chain transactions in Quai are referred to as [external transactions (ETXs)](./etxs.md), and use [hash linked references](../merged-mining/coincident-blocks.mdx) to ensure atomic state transitions across chains. Quai Network uses [new EVM opcodes to facilitate ETXs](../../../develop/smart-contracts/opcode-additions.md). The braided structure of Quai Network also enables multi-chain smart contracts and cross-chain contract interactions. While contracts can be deployed to a single Quai thread in a similar way that contracts are traditionally deployed on a single-threaded blockchain, developers also have the ability to deploy contracts across multiple or all Quai chains to maintain the operability of dapps across the network.

Double-spend attacks attempting to take advantage of Quai's interoperability are protected by atomic rollbacks, meaning that if a dominant chain rolls back all chains subordinate to it will roll back to the canonical state as well.

## External Transactions (ETXs)

An External Transaction (ETX) is a transaction that trustlessly moves state between two Quai chains. ETXs are facilitated by hash linked references between chains. Two new opcodes have been added to the EVM to facilitate contract-based ETXs.

The blockchain that the ETX is originally broadcast from is referred to as the "origin chain" of the ETX. The blockchain that the ETX has been sent to is referred to as the "destination chain" of the ETX. All ETXs must travel up the hierarchy from the origin chain to reach a dominant chain of the destination chain. After the ETX has reached a chain dominant to the destination, it must then travel back down the hierarchy into the subordinate destination chain. There are two kinds of ETXs: account initiated and contract initiated.

## Multi-Chain Contracts

Quai's architecture enables contracts deployed on different Quai chains to be objectively interlinked. Linking contracts deployed on different Quai blockchains together allows contracts to be aware of and interact with the state of the contracts it is linked to. Existing multichain architectures segment projects into single sub networks by not offering full interoperable composability between blockchains. In Quai Network, a project may deploy and interlink contracts across all blockchains in the ecosystem, allowing users to interact with the project from any point in the network.
Further, contracts can be written to support external interactions. For example, an account located in Cyprus 1 may call the mint function of a contract deployed in Paxos 2. The resulting token(s) minted by the contract call could be sent cross-chain to return to the Cyprus 1 address that called the function.

## Atomicity

Atomicity is a key tenant of Quai's interoperability. An atomic process is one that either fully occurs or doesn't occur at all. Every transaction and contract interaction in Quai Network is atomic.
This atomicity is maintained through the PoEM consensus mechanism. Under PoEM, subordinate sub networks must always move forward (and roll back) in strict coordination with and with respect to all other sub networks. Thus, all state transitions in Quai -- even ETXs -- are atomic, and will either be completed in all contexts, or, in the case of any rollback, not occur in any context.
