---
title: Token Overview
description: A high level overview of Quai Network's two-token system.
sidebar_position: 1
keywords:
  - quai network
  - tokenomics
  - token
  - quai
  - qi
---

# Token Overview: Quai & Qi

The Quai Network protocol has two different native tokens: [Quai](/learn/tokenomics/tokenomics-overview/quai/quai.md) & [Qi](/learn/tokenomics/tokenomics-overview/qi/qi.md). 

This two-token system is designed to spur the usage of Qi as a medium of exchange, while still accommodating for store-of-value and programmable money use-cases with Quai. 

![Quai and Qi at a glance](/img/QuaiQi.png)

Quai (pronounced “k-why”) comes from the character 块, which roughly translates as a colloquial word for money, equivalent to “buck” or “quid” in English.

Qi (pronounced “chee”) comes from the character 气, referring to a concept of "energy" or "life force".

Both Quai and Qi are natively emitted by the Quai protocol, and function as the gas token of their respective chains: Quai as the gas token for the programmable Quai chains, and Qi as the gas token for the fixed denomination UTXO Qi chains.

## Token Mechanics

All post-genesis supply issuance of both Quai and Qi occurs through the following mechanics. There will be a pre-set allotment of Quai supply generated and allocated as part of the Genesis block, as outlined in the [genesis allocations page](/learn/tokenomics/genesis-allocations.md).

### Emissions

Quai and Qi tokens are both brought into circulation and distributed via the same work-based consensus process (PoEM) that secures the network. Quai and Qi tokens serve as incentives for miners in the form of block rewards. Miners securing Quai Network with hashrate elect to receive their block rewards in either Quai or Qi tokens, and are able to change this selection at any time on a go-forward basis. 

Both tokens are designed with a dynamic issuance model to allow for highly responsive block rewards, which are determined based on difficulty. The [block rewards](/learn/tokenomics/token-dynamics/block-rewards/block-rewards.md) available in Quai or Qi for successfully mining a block are determined by separate but related functions that both utilize difficulty as their primary input.

Continuous [difficulty and reward adjustments](/learn/tokenomics/token-dynamics/difficulty-adjustments/difficulty-adjustments.md) are conducted on a rolling basis across a previous set of blocks, resulting in the quantities and ratio of Quai and Qi rewards changing - up or down - with each new block.

### Conversions

A fully automated mechanism is built into the protocol that enables all users to [convert between existing Qi and Quai using a mint/burn function](/learn/tokenomics/token-dynamics/conversions/conversions.md) at the current block reward ratio, at any time.

:::info
There is no fixed peg, backing, nor collateralization, between or underlying either the Quai or Qi tokens.
:::



