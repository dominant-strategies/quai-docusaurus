---
title: Difficulty Adjustments
description: An explanation of difficulty within Quai Network and how it relates to the Quai and Qi tokens.
sidebar_position: 3
keywords:
  - quai network
  - tokenomics
  - token
  - difficulty
  - halving
---

# Difficulty Adjustments

Work-based protocols are simply systems for regulating supply-side production functions in response to observable market demand proxies. These protocols periodically set difficulty and block reward values, establishing a desired or expected rate of block production and new supply issuance based on the estimated hashrate demand deduced from the actual observed blocktime over the prior period. This process then continues across each subsequent period.

The mechanism works by adjusting system values such as difficulty for an upcoming period based on the previous period of activity's deviation from some expectation or optimization. 

![Image of difficulty adjustments over periods (P) at specific times (T)](/img/PT.png)

The protocol sets some difficulty at time T for upcoming period P, and then adjusts again at time T+1 to the degree that certain actual activity during P exceeds expected or desired activity. Mechanically speaking, the difficulty adjustment re-establishes some rate of block production (e.g. Bitcoin’s 10-minute block intervals).

At time T, a difficulty T is set such that: if hashrate P = hashrate P-1 , then blocktime P = expected blocktime. At time T+1, difficulty is adjusted in proportion to how much faster or slower blocks were produced than the expected or desired interval during period P. Thus:

$$
△DIFFICULTY_{T → T+1} = 𝑓(BLOCKTIME_{P}:BLOCKTIME_{EXPECTED})
$$

Another formulation of this is:

$$
△DIFFICULTY = 𝑓(△HASHRATE) 
$$

The following may also be a slightly more useful restatement in terms of the actual purpose or function of the mechanic and its underlying dynamics:
1. Difficulty set to achieve certain blocktimes based on existing hashrate 
2. More than expected miner hashrate deployed 
3. Faster blocktimes 
4. Increase in system difficulty
5. Harder to mine a block 
6. Blocktimes slow toward desired rate

The same flow works in the reverse as well, when less than expected miner hashrate is deployed, blocktimes slow, and difficulty must be adjusted downwards.

Changes in hashrate are driven by market demand. Simply put, miners will deploy more when they’re paid more. With this framing, we can see that mining processes and the difficulty adjustment are best understood as a reactive market supply and demand matching function.

**Quai Network makes difficulty adjustments on a rolling basis over a previous set of blocks (instead of in sequential periods), to best match the supply of hashrate and demand for network security.**
