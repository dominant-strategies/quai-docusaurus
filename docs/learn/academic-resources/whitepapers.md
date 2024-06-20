---
title: Whitepapers
description: Research papers and whitepapers that detail fundamental aspects of the Quai protocol.
sidebar_position: 1
keywords:
  - whitepaper
  - hashcore
  - block reduce
  - poem
---

# Whitepapers

## PoEM: Proof-of-Entropy-Minima

**Published 1 July 2023**

Nakamoto consensus has been incredibly influential in enabling robust blockchain systems, and one of its components is the so-called heaviest chain rule (HCR). Within this rule, the calculation of the weight of the chain tip is performed by adding the difficulty threshold value to the previous total difficulty. Current difficulty based weighting systems do not take the intrinsic block weight into account. This paper proposes a new mechanism based on entropy differences, named proof of entropy minima (POEM), which incorporates the intrinsic block weight in a manner that significantly reduces the orphan rate of the blockchain while simultaneously accelerating finalization. Finally, POEM helps to understand blockchain as a static time-independent sequence of committed events.

Read the full paper on [iacr.org](https://eprint.iacr.org/2024/200.pdf).

## Scalable Multi-Chain Coordination via the Hierarchical Longest Chain Rule

**Published in 2022 IEEE International Conference on Blockchain (Blockchain)**

This paper introduces BlockReduce, a Proof-of-Work based blockchain system which achieves high transaction throughput by means of a hierarchy of merged mined blockchains, each operating in parallel on a partition of the overall application state. Most notably, the full PoW available within the network is applied to all blockchains in BlockReduce, and cross-blockchain state transitions are enabled seamlessly within the core protocol. This paper shows that, given a hierarchy of blockchains and its associated security model, BlockReduce scales super-linearly in transaction throughput with the number of blockchains operated by the protocol. BlockReduce utilizes a novel consensus rule to select the canonical chain—i.e., the chain of blocks referencing state updates to be applied—for each blockchain. In Bitcoin and other more traditional systems, the Longest Chain Rule (LCR) stipulates that the canonical chain is the sequence of valid blocks with the most work (often referred to as the longest chain or, more accurately, the heaviest chain). BlockReduce follows a similar rule but must also account for the existence of coincident blocks within the hierarchy.

Read the full paper on [ieee.org](https://ieeexplore.ieee.org/document/9881846).

## Hashcore: Proof-of-Work Functions for General Purpose Processors

**Published in 2019 IEEE 39th International Conference on Distributed Computing Systems (ICDCS)**

Over the past five years, the rewards associated with mining Proof-of-Work blockchains have increased substantially. As a result, miners are heavily incentivized to design and utilize Application Specific Integrated Circuits (ASICs) that can compute hashes far more efficiently than existing general purpose hardware. Currently, it is difficult for most users to purchase and operate ASICs due to pricing and availability constraints, resulting in a relatively small number of miners with respect to total user base for most popular cryptocurrencies. In this work, we aim to invert the problem of ASIC development by constructing a Proof-of-Work function for which an existing general purpose processor (GPP, such as an x86 IC) is already an optimized ASIC. In doing so, we will ensure that any would-be miner either already owns an ASIC for the Proof-of-Work system they wish to participate in or can attain one at a competitive price with relative ease. In order to achieve this, we present HashCore, a Proof-of-Work function composed of "widgets" generated pseudo-randomly at runtime that each execute a sequence of general purpose processor instructions designed to stress the computational resources of such a GPP. The widgets will be modeled after workloads that GPPs have been optimized for, for example, the SPEC CPU 2017 benchmark suite for x86 ICs, in a technique we refer to as inverted benchmarking. We provide a proof that HashCore is collision-resistant regardless of how the widgets are implemented. We observe that GPP designers/developers essentially create an ASIC for benchmarks such as SPEC CPU 2017. By modeling HashCore after such benchmarks, we create a Proof-of-Work function that can be run most efficiently on a GPP, resulting in a more accessible, competitive, and balanced mining market.
Read the full paper on [ieee.org](https://ieeexplore.ieee.org/document/8884814).

## BlockReduce: Scaling Blockchain to Human Commerce

**Published 31 October 2018**

This paper introduces BlockReduce, a Proof-of-Work (PoW) based blockchain system which achieves high transaction throughput through a hierarchy of merged mined blockchains, each operating in parallel on a partition the overall application state. Most notably, the full PoW available within the network is applied to all blockchains in BlockReduce, and cross-blockchain state transitions are enabled seamlessly within the core protocol. This paper shows that, given a hierarchy of blockchains and its associated security model, the protocol scales super-linearly in transaction throughput with the number of blockchains operated by the protocol.

Read the full paper on [arxiv.org](https://arxiv.org/abs/1811.00125).
