---
title: External Transactions (ETXs)
description: How cross-chain transactions are processed in Quai Network.
slug: /etxs
hide_table_of_contents: false
---

# External Transactions (ETXs)

An External Transaction (ETX) is a transaction that trustlessly moves state between two Quai chains. ETXs are facilitated by hash linked references between chains. Two new opcodes have been added to the EVM to facilitate contract-based ETXs.

The blockchain that the ETX is originally broadcast from is referred to as the "origin chain" of the ETX. The blockchain that the ETX has been sent to is referred to as the "destination chain" of the ETX. All ETXs must travel up the hierarchy from the origin chain to reach a dominant chain of the destination chain. After the ETX has reached a chain dominant to the destination, it must then travel back down the hierarchy into the subordinate destination chain. There are two kinds of ETXs: account initiated and contract initiated.

Two data fields are included in the headers of all Quai blocks that allow ETXs to be forward propagated from the origin chain to coordinate blockchains in the form of rollups. This method of forward propagating ETX rollups reduces the amount of ETXs required to be instantaneously processed at points of coincidence by more than 30x.

## Account Initiated ETX

### Propagate Up The Hierarchy

1. The TX is broadcasted to the origin chain as an internal transaction.
2. The TX is mined on the origin chain, removing the balance from the sending address and potentially emitting a number of ETXs.
3. The ETX(s) is propagated to dominant peers.
4. When a coincident block is found, dominant peers collect all pending ETXs linked through the subordinate manifest.
5. If the destination chain still has a dominant chain (i.e. is a Region chain), steps 3 and 4 are repeated.

### Propagate Back Down The Hierarchy

1. When a coincident block is found, pending ETXs are collected from each hash in each manifest of each block since the last coincident block from the same location.
2. All ETXs destined to the current chain or a subordinate chain are identified. These pending ETXs can now be referenced.
3. The pending ETXs is propagated to the destination chain, where it is added to a pending ETX set and available to be mined.
4. The ETX is included in a block mined on the destination chain, adding the balance to the receiving address.

## Contract Initiated ETX

### Propagate Up The Hierarchy

1. A contract interaction is initiated, potentially triggering the ISADDRINTERNAL convenience opcode
2. If ISADDRINTERNAL returns FALSE, (or another trigger occurs) a number of ETXs may be emitted from contract by triggering OP_ETX
3. The ETX(s) is propagated to dominant peers.
4. When a coincident block is found, dominant peers collect all pending ETXs linked through the subordinate manifest.
5. If the destination chain still has a dominant chain (i.e. is a Region chain), steps 3 and 4 are repeated.

### Propagate Back Down The Hierarchy

1. When a coincident block is found, pending ETXs are collected from each hash in each manifest of each block since the last coincident block from the same location.
2. All ETXs destined to the current chain or a subordinate chain are identified. These pending ETXs can now be referenced.
3. The pending ETXs is propagated to the destination chain, where it is added to a pending ETX set and available to be mined.
4. The ETX is included in a block mined on the destination chain, adding the balance to the receiving address.

## Forward Propagation of ETX Rollups

Each ETX emitted from a Quai block is included in two new data fields in the block header: etxTransactions and extRollupRoot. The etxTransactions field contains a list of hashes. Each hash contained in the etxTransactions field represents a unique ETX emitted from that block. The etxRollupRoot field included in each block header contains a single hash, which represents a cumulative rollup of all ETXs emitted since the previous coincident block.

The etxRollupRoot field is propagated to coordinate blockchains at each point of local consensus. This forward propagation enables precomputed state transition sets, which drastically reduce computation times when ETXs are mined into their destination chain. By forward propagating ETX rollups and allowing precomputed state transitions, Quai reduces the amount of computations required to process ETX state transitions at the destination chain by more than 30 times. It is critical to note that precomputed state transitions are not reference-able or canonicalized until a hash linked reference between the origin and destination chain is provided, proving the canonicalization of the emitted ETX.

Hash linked references are created in another data field, known as the subordinate block manifest (subManifest). The subManifest data field is empty in all blocks except coincident blocks. The subManifest data field contains a list of all subordinate block hashes produced since the prior coincident block. The subManifest creates a direct, objective reference to all subordinate blocks within each dominant blockchain, creating hash linked references between all Quai Network blockchains. Once this hash linked reference is provided to a coordinate context that has received a precomputed transition set, the ETX is known to be canonical and the state transition becomes reference-able.
