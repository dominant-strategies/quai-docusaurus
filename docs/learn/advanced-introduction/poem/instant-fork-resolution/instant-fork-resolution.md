---
title: Instantaneous Fork Resolution
description: How blocks are compared in Quai Network.
slug: /fork-resolution
hide_table_of_contents: true
sidebar_position: 1
---

# Instantaneous Fork Resolution

Fork resolution is a significant challenge in blockchain systems. A fork happens when multiple versions of the blockchain are created and proposed at the same time. Forks can occur naturally when two miners find competing blocks, or they can be deliberately created by a bad actor.

**In a Proof-of-Work consensus mechanism, when two blocks that exceed the difficulty threshold are proposed simultaneously, there is no preference for either block.** They are both considered equally valid progressions of the blockchain. To resolve such a fork, one of the proposed chains needs to be extended to become longer than the other according to the Heaviest Chain Rule (HCR). **In systems like Bitcoin, it can take more than 10 minutes to produce another block and resolve the fork.**

Forks divide the computational power of the network as miners randomly choose one of the valid blocks to mine, hoping that their chosen block becomes the accepted one. Because Proof-of-Work treats all blocks that meet the difficulty threshold as equal, nodes cannot determine which block to build upon until another block is produced. **However, in reality, these blocks are not identical. One block always removes more entropy (randomness) from the system compared to the other proposed blocks.** Simply put, Proof-of-Work requires nodes to disregard meaningful aspects of proposed hashes, while PoEM allows for the measurement of each hash's full weight.

While Proof-of-Work fork resolution has worked for single-chain systems, the prolonged uncertainty it introduces makes it unreliable for achieving consensus with multiple blockchains.

Proof-of-Entropy-Minima (PoEM) employs the concept of [intrinsic block weight](./intrinsic-block-weight.md) to enable all nodes in the system to instantly and deterministically select the next block in the sequence. Intrinsic block weight measures the overall weight of a block's hash rather than just checking its difficulty level. **By using intrinsic block weight, all blocks can be compared fairly and accurately, allowing nodes to quickly choose which block to extend and resolve conflicts across all chains simultaneously.**

Furthermore, PoEM ensures that only a single proof ever needs to be propagated throughout the network to achieve consensus. In contrast, Proof-of-Work requires a second proof to be shared before the network can reach consensus in a fork scenario. Proof-of-Stake consensus necessitates multiple rounds of propagation for each block to achieve consensus, as each proof must collect a specific number of social approvals to be considered valid. **By eliminating consensus-based forks, PoEM ensures that consensus can always be reached by propagating a single proof. This approach ensures that miners are always certain of the block that all nodes will agree upon as the "tip" or "head" of the blockchain, resulting in the most efficient possible utilization of computational resources.**

![NodesForkResolution](../../../../../static/img/NodesForkResolution.png)

The PoEM mechanism, by removing the impact of latency, fundamentally changes the concept of "consensus." Traditional Proof-of-Work and Proof-of-Stake blockchains periodically attempt to reach consensus among all nodes at each block production point. In contrast, PoEM achieves "perpetual consensus" by eliminating all contention from consensus. All nodes in the system always agree on the "tip" of the blockchain simply by adhering to the Proof-of-Entropy-Minima algorithm. **PoEM always has a preference between any blocks or chains of blocks. Therefore, if two nodes are running PoEM, they will always agree, even if they do not have complete information about the system.**

## Example Fork Resolution: PoW vs. PoEM

![ExampleForkResolution](../../../../../static/img/ExampleForkResolution.png)

- Block Height: 1
- Difficulty Threshold: 16 (0x0000...)
- Proposed Block 2A Hash: 0x0000b9c86d37...
- Proposed Block 2B Hash: 0x0000b9c86d30...

### Proof-of-Work (PoW)

1. Two different miners independently find the hashes for Block2A and Block2B
2. Block 2A and Block 2B are proposed near-simultaneously
3. Block 2A is assigned a difficulty of 16, and Block 2B is assigned a difficulty of 16
4. Miners mine either Block2A or Block2B, whichever they saw first, until a Block3 is created that canonicalizes either Block2A or Block2B
5. Block 3 is created, canonicalizing either Block2A or Block2B and uncling the non-canonicalized block

### Proof-of-Entropy-Minima (PoEM)

1. Two different miners independently find the hashes for Block2A and Block2B
2. Block 2A and Block 2B are proposed near-simultaneously
3. Block 2A is assigned a difficulty of 16.462525964 and Block2B is assigned a difficulty of 16.462525967
4. All nodes and miners will immediately prefer Block2B to Block2A as soon as they are aware of Block2B
5. All miners mine on Block2B to extend the tip of the canonicalized chain
