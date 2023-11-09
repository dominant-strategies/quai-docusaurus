---
title: User FAQ
description: See the answers to frequently-asked-questions about Quai.
hide_table_of_contents: false
sidebar_position: 4
---

## TX Processing Times

**How long should I wait for my transaction to process?**

**Same Zone:** Referred to as an “internal” transaction. These transactions receive settlement in ~10 seconds.

**Near-Coordinate:** A near-coordinate transaction is an “external” transaction that traverses from one Zone to another Zone under the same Region. For example, a transaction from Cyprus-1 to Cyprus-2 is considered “near-coordinate.” Near-coordinate transactions receive settlement in ~300 seconds.

**Far-Coordinate:** A far-coordinate transaction is an “external” transaction that traverses from one Zone to another Zone under a different Region. For example, a transaction from Cyprus-1 to Paxos-1 is considered “far-coordinate. Far-coordinate transactions receive settlement in ~3,300 seconds.

| Transaction Type| ETX Emitted? | Description                                                                                                               | Settlement Time† |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Same Zone       | No           | A transaction where the originating Zone and the destination Zone are the same.                                           | ~10s             |
| Near-Coordinate | Yes          | A transaction where the originating Zone and the destination Zone are different, but are subordinate to the same Region.  | ~300s            |
| Far-Coordinate  | Yes          | A transaction where the originating Zone and the destination zone are different, and are subordinate to different Regions.| ~3300s.          |

*† Settlement time is given in averages. Block production in Quai Network is a stochastic process, meaning that real-world settlement times will have minor variance.*

## Installing Pelagus

**Where can I install Pelagus?**

[Pelagus Wallet](https://pelaguswallet.io/) can be installed from the [Chrome Web Store](https://chrome.google.com/webstore/detail/pelagus/gaegollnpijhedifeeeepdoffkgfcmbc).

## Spanish Seed Phrase

**Why is my Pelagus seed phrase in Spanish?**

The Pelagus seed phrases are generated in Spanish to make it impossible to reuse seed phrases used in Pelagus during Testnet on Mainnet. Upon Mainnet, Pelagus will use seed phrases generated in English.

## Pelagus Browsers

**What browsers is Pelagus supported on?**

As a Chromium-based extension, Pelagus is supported on most Chromium browsers, including Google Chrome, Brave, Opera, Edge, and more.

## Is Pelagus Mobile

**Can I use Pelagus on mobile?**

While largely untested, many mobile browsers can offer support for Chromium extensions. We recommend testing the Pelagus extension on mobile Chromium browsers like Kiwi or Yandex. Let us know if it works!

## Pelagus Refreshing

**Does Pelagus Wallet auto-refresh like Metamask?**

No. Unlike Metamask and most other browser extension wallets, Pelagus only submits RPC calls to update your balance, transaction history, etc. when you open, close, or interact with the application. To get Pelagus to query the RPCs and update your balance, you can close and re-open the extension or switch between accounts.

## Koala Wallet

**Where can I install Koala Wallet?**

[Koala Wallet](https://koalawallet.io/) can be installed from the [Chrome Web Store](https://chrome.google.com/webstore/detail/koala-wallet/lnnnmfcpbkafcpgdilckhmhbkkbpkmid), [iOS Apple Store](https://apps.apple.com/us/app/koala-wallet/id1627486259), and/or [Google Play Store](https://play.google.com/store/apps/details?id=com.eucalyptuslabs.kowallet).