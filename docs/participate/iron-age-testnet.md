---
title: Iron Age Testnet
description: Important links, resources, and routing for Quai Network's Iron Age Testnet.
sidebar_position: 2
keywords:
  - quai testnet
  - iron age testnet
  - quai iron age
---

## Important Links

The Iron Age Testnet is the third public test of the Quai protocol. The following is a hub of links and resources that may be valuable to Testnet participants:

| Name                                                                                                               | Description                                                                                                |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| [**Pelagus Wallet Extension**](https://chrome.google.com/webstore/detail/pelagus/gaegollnpijhedifeeeepdoffkgfcmbc) | An open-source Quai-native wallet built by the [Dominant Strategies](https://dominantstrategies.io/) team. |
| [**Iron Age Testnet Faucet**](https://faucet.quai.network/)                                                        | Receive small amounts of Iron Age Testnet Quai coins at no cost.                                           |
| [**QuaiScan Block Explorer**](https://cyprus1.colosseum.quaiscan.io/)                                              | View the Quai protocol in a human-readable way.                                                            |
| [**Dominant Strategies Github**](https://github.com/dominant-strategies)                                           | The home of all Dominant Strategies repositories, including go-quai, quai-gpu-miner, and go-quai-stratum.  |
| [**Testnet Schedule & Incentives Article**](https://qu.ai/blog/iron-age-testnet-schedule/)                         | A detailed schedule of the Iron Age Testnet.                                                               |
| [**Network Stats Page**](https://stats.quai.network/)                                                              | An invite-only node stats page for RPC/infrastructure providers.                                           |
| [**Node Setup Tutorial**](/participate/node/run-a-node.md)                                                         | Learn how to run a Testnet node.                                                                           |
| [**GPU Miner Setup Tutorial**](/participate/mining/gpu-miner/gpu-miner.md)                                         | Learn how to run a GPU miner and connect it to a stratum proxy.                                            |
| [**Contract Deployment Tutorial(s)**](/develop/tutorials/single-chain.md)                                          | Learn how to deploy single-chain or multi-chain smart contracts.                                           |
| [**Testnet Terms of Use**](/participate/iron-age-testnet-tos.md)                                                   | Disclaimers and policies for interacting with Quai Network testnets.                                       |

## Incentivization

The Iron Age Testnet offers incentives in Mainnet Quai tokens to [Quai miners who mine valid blocks](https://qu.ai/blog/mining-quai-network-iron-age/), and developers accepted to the [Quai Genesis program](https://qu.ai/genesis).

### Miners

#### Phase 1

In phase 1 of the Iron Age Testnet mining rewards, 8 million Mainnet Quai tokens will be distributed to individuals who mine valid blocks on canonical Quai Network chains. This period of mining incentivization will last up until Iron Age Testnet block 600,000 in each zone.

The Mainnet rewards earned by each address will be determined by calculating what proportion of total Testnet blocks were mined by the address. For example, if a zone 1 address mined 10 blocks and a total of 1,000 blocks were mined for the duration of the Iron Age Testnet in zone 1, that address would receive 1% of mining rewards for zone 1, or 8,888.889 Quai. All rewards will be tracked, calculated, and distributed via on-chain data – be sure to hold onto the private keys for the address(es) you use to mine!

:::note
Phase 1 of the Iron Age Testnet has ended, check below for details on Phase 2.
:::

#### Phase 2

In phase 2 of the Iron Age Testnet mining rewards, 4 million Mainnet Quai tokens have been allocated for distribution to individuals who mine valid blocks on canonical Quai Network chains throughout the Iron Age Testnet up to block 1,200,000 in each zone or until the launch of the Golden Age Testnet, whichever comes first.

Miners can mine up to 180,000 per address per shard during this phase. Mining additional blocks past 180,000 will result in wasted hash. Mainnet rewards will still be determined based on the proportion of total Testnet blocks mined by each address.

:::warning
No individual mining address will be able to receive more than 5% of the mining rewards for a single slice. Each individual will be able to KYC/claim a maximum of one mining address per chain on Mainnet.
:::

:::danger
**IMPORTANT NOTE FOR TESTNET MINERS:** The Iron Age Testnet will support the creation of mining pools; however, our team at Dominant Strategies will not be maintaining or recommending any mining pools for this Testnet. Due to the way mining rewards are tracked and calculated, allocating your hash power to a pool that you don’t control will lead to your mining rewards being earned by the pool operator.
:::

Learn how to start mining Quai in the [GPU miner documentation](/participate/mining/miner-overview.md).

### Developers

Wave 1 of applications are open for [Quai Genesis, a Quai Network grants program](https://qu.ai/genesis). Within Wave 1 of the Genesis grants program, two teams will be selected to work closely with the Dominant Strategies team to deploy their project on Quai in exchange for a grant in Mainnet Quai tokens. One or more teams will be selected and incentivized to build in each of the following categories:

- Decentralized Exchange
- Wallet

The goal of Wave 1 is to incentivize and support the creation of foundational services/tooling on Quai. Later waves of the Genesis program will focus more broadly on smart contract creation and dApp deployment. Full details on how to apply to the Quai Genesis grants program can be found [on the Quai website](https://qu.ai/genesis/).

Learn how to start developing on Quai in the [developer documentation](/develop/smart-contracts/deploy.md).
