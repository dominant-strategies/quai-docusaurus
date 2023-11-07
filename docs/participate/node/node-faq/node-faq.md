---
title: Node FAQ
description: Answers to commonly asked questions about Quai nodes.
slug: /node-faq
hide_table_of_contents: false
sidebar_position: 4
---

# Node FAQ

## Setup & Config

### Node Hardware Specs

**What hardware specifications are required to run a slice node? What about a global node?**

The hardware requirement to run a slice node during the Iron Age Testnet:

* CPU with 4+ cores
* 16GB RAM
* 1TB free storage space to sync
* 10+ MBit/sec download Internet service

The hardware requirement to run a global node during the Iron Age Testnet:

* Fast CPU with 4+ cores
* 32GB+ RAM
* Fast SSD with at least 3TB free space
* 10+ MBit/sec download Internet service

### VPS / vGPU

**Can I use a VPS to run a node and/or a virtual GPU to run a miner?**

Yes. However, be cautious with how much VPS/virtual GPUs can end up costing, especially with the current hardware requirements to run a node. Additionally, be aware of the terms and conditions of your chosen service, as many VPS providers explicitly ban cryptocurrency mining.

:::warning
Many users have experienced issues specifically with Contabo VPNs. We recommend against the use of Contabo VPNs to run a node or mine in the Iron Age Testnet.
:::

### Node Types

**What types of nodes does go-quai support?**

The go-quai client currently supports full nodes (nodes that store the entire state of the network, and verify each new state transition from genesis) of the following constructions:

*Single-Slice (or just Slice):* A node running the Prime chain, a self-selected Region chain, and a self-selected Zone chain.

*Multi-Slice:* A node running the Prime chain, one or more self-selected Region chains, and two or more self-selected Zone chains.

*Global:* A node running the Prime chain, all Region chains, and all Zone chains.

The go-quai client currently does not support the following node types:

*Light Node:* A node that only verifies new state transitions and does not retain historical state.

*Archive Node:* A node that verifies new state transitions and maintains the entire historical state of the network, taking and storing a snapshot of state block by block.

| go-quai          | Single-Slice       | Multi-Slice              | Global (All Slices) |
| ---------------- | ------------------ | ------------------------ | ------------------- |
| **Light Node**   | Light Slice Node   | Light Multi-Slice Node   | Light Global Node   |
| **Full Node**    | Full Slice Node    | Full Multi-Slice Node    | Full Global Node    |
| **Archive Node** | Archive Slice Node | Archive Multi-Slice Node | Archive Global Node |

As of the Iron Age Testnet, Full Slice, Full Multi-Slice, and Full Global are the only three supported node constructions.

### Global v. Slice Node

**Are there any advantages to running a global node over a slice node?**

While there is no direct benefit to running a global node over a slice node, some miners may find it useful to run a global node in order to be able to quickly change which slice of the network they are hashing.

A slice node will be sufficient to trustlessly interact with the network in all necessary ways for the vast majority of users -- however, for users seeking quick and complete access to data on all chains (e.g. developers deploying/maintaining a multi-chain dapp, miners looking to rapidly switch their hashrate between chains), a global node may be the optimal setup.

### Network.env

**What is the network.env file for?**

The `network.env` file can be thought of as the configuration file for your node. When starting, your node will look at the `network.env` file to know which slices to run, which network to run on (colosseum, garden, etc.), where mining rewards should be paid out to, and more.

* `COINBASE` : The address in each chain (slice) that mining rewards are paid to. Note that there is one coinbase address per chain.
* `NETWORK` : the network (testnet [colosseum], devnet [garden], etc.) your node is running on.
* `SLICES` : This parameter determines which slices of the network the node will run (i.e. determines whether the node will be a slice node, a multi-slice node, or a global node).

The [“Starting and Running a Node”](../start-a-node/start-a-node.md) page contains information on the most important things to change in this file.

The `network.env` file can be edited with the following IDEs:

* [vim](https://www.vim.org/)
* [nano](https://www.nano-editor.org/)
* [Visual Studio Code](https://visualstudio.microsoft.com/)

### Networks

**What networks are available to run?**

* `NETWORK=colosseum` The main network of the Iron Age Testnet
* `NETWORK=garden` The development network of the Iron Age Testnet
* `NETWORK=local` The local development environment

:::warning
The Garden developer network operates on the BLAKE3 hashing algorithm at low difficulty, meaning the Garden developer network has a significantly higher chance of reorgs than the main Colosseum network.
:::

### Configuring Slices

**How do I tell my node which slices to run?**

In the codebase, a slice is identified by its region and zone index. Region and zone indices are 0-indexed and range from 0-2.

| Region    | Zone   | Chain Name | Chain Index |
| --------- | ------ | ---------- | ----------- |
| Region-1  | Zone-1 | Cyprus-1   | [0 0]       |
| Region-1  | Zone-2 | Cyprus-2   | [0 1]       |
| Region-1  | Zone-3 | Cyprus-3   | [0 2]       |
| Region-2  | Zone-1 | Paxos-1    | [1 0]       |
| Region-2  | Zone-2 | Paxos-2    | [1 1]       |
| Region-2  | Zone-3 | Paxos-3    | [1 2]       |
| Region-3  | Zone-1 | Hydra-1    | [2 0]       |
| Region-3  | Zone-2 | Hydra-2    | [2 1]       |
| Region-3  | Zone-3 | Hydra-3    | [2 2]       |

The `SLICES` parameter of the network.env file determines which slices of the network the node will run (i.e. determines whether the node will be a slice node, a multi-slice node, or a global node). To spin up a slice node, edit the network.env file to modify the slices you want to run. For example, if you wanted to run two slices, you would change the_ `SLICES` line to the following (be aware of spacing):

```bash
SLICES="[FIRST_REGION_NUM FIRST_ZONE_NUM],[SECOND_REGION_NUM SECOND_ZONE_NUM]"
```

**Example** `SLICES` **configurations:**

Multi-Slice Node running Cyprus-1, Cyprus-2, and Cyprus-3:`SLICES="[0 0],[0 1],[0 2]"`

Slice Node running Paxos-3:`SLICES="[1 2]"`

Global node running all slices:`SLICES="[0 0],[0 1],[0 2],[1 0],[1 1],[1 2],[2 0],[2 1],[2 2]"`

## Node Maintenance

### Checking Nodelogs

**How do I check my nodelogs?**

To show your recent nodelogs for a specific chain, you can run the following:

```go
// This command will display recent logs from Cyprus-1.
// To edit which chain's logs will display, edit the chain index.
cat nodelogs/zone-0-0.log
```

To stream your nodelogs for a specific chain, you can run the following (to exit the stream, you can run ctrl+c):

```go
// This command will display a stream of logs from Cyprus-1.
// To edit which chain's logs will display, edit the chain index. 
tail -f nodelogs/zone-0-0.log
```

To show the most recent blocks your node appended in a specific chain, run the following line of code:

```go
// This command will display recent logs containing "Appended" from Cyprus-1.
// To edit which chain's logs will display, edit the chain index. 
cat nodelogs/zone-0-0.log | grep Appended
```

To display an ongoing stream of logs showing which blocks are being appended, run the following line of code (to exit the stream, use ctrl+c):

```go
// This command will display a stream of logs containing "Appended" from Cyprus-1.
// To edit which chain's logs will display, edit the chain index.
tail -f nodelogs/zone-0-0.log | grep Appended
```

If you are running a global node and/or want to check the logs of all chains simultaneously to see which blocks are being appended, the chain index can be replaced with *:

```go
// This command will display a stream of logs from Cyprus-1.
// To edit which chain's logs will display, edit the chain index. 
tail -f nodelogs/zone-0-0.log
```

```go
// This command will display a stream of logs containing "Appended" from all chains.
tail -f nodelogs/*.log | grep Appended
```
### Nodelogs By Chain

**What is the difference between checking Prime, Region, and Zone nodelogs? Which nodelogs should I check?**

Quai Network runs a hierarchy of chains. All nodes run the Prime chain and a minimum of one Region and Zone chain.

Slices are identified by Zones. Thus, when checking nodelogs, you should check the logs for the Zone(s) that your node is running. Since block time for Zones are the fastest, checking the Zone nodelogs provides the most accurate understanding of where your node has synced to/what is happening in your node at any given point in time.

### Updating a Node

**If/when a new release of go-quai comes out as part of the Testnet, what do I need to do to update my node?**

First, stop your existing node:

```go
make stop
```
Next, pull the latest code to your machine:

```go
git fetch --all
```

Next, check out the newest release:

```go
// Replace [NEW RELEASE] with the newest go-quai release (e.g. v0.17.0-rc.1)
git checkout [NEW RELEASE]
```

Then, you can remake the go-quai binaries:

```go
make go-quai
```

Now you’re able to restart your node:

```go
make run
```

You can check the status of your node using the previously mentioned nodelogs commands.

### Resetting a Node

**How do I delete my node's database and reset my state?**

:::danger
Do not do this without good reason! There should be no need to clear state for the vast majority of users participating in Testnet. Resetting a node is a NON-REVERSABLE PROCESS -- after you clear your database, you will need to completely re-sync your node from genesis.
:::

Developers and node runners may find that situations arise where they need to completely clear their node of synced state and/or do a full reset in the case of an issue or bug.  A full reset of a node involves stopping the node, clearing the current nodelogs, and removing all synced state.

As a final reminder, resetting your node is non-reversible and should only be done if you fully understand the implications of removing all synced state.

For **Linux Machines**, we'll remove the `nodelogs` directory and the base `.quai` directory which contains all synced state. To do this, run the following command:

```
// Remove nodelogs
rm -rf nodelogs 
// Remove go-quai database
rm -rf ~/.quai
```

For **MacOS machines**, we'll use a different command to remove the same directories:

```
// Remove nodelogs 
rm -rf nodelogs 
// Remove go-quai database
rm -rf ~/Library/Quai
```

After running one of the two above commands, the node has been fully reset and is ready to be restarted.

## Networking

### UPNP Issues

**I got the error “ERROR: This computer is not publicly reachable and cannot join the P2P network. Please forward the necessary ports or enable UPnP on your router. See https://docs.quai.network/ for guidance.” when trying to start my node. How do I fix this?**

If you got this error, it means your router does not have UPNP enabled. Enabling UPNP (Universal Plug and Play) allows other devices (namely other Quai nodes) to discover your node and establish proper networking.

While each router has a different protocol for enabling UPNP, [this guide](https://www.lifewire.com/enable-upnp-on-a-router-5206124) covers how to enable UPNP on routers from many common ISPs. You can also get help turning on UPNP on your router in the [Starting and Running a Node page](../start-a-node/start-a-node.md).

If you do not want to enable UPNP on your router, you can specifically open peering ports 30303 through 30315 for both TCP and UDP. You can learn how to open specific ports on your router [here](https://nordvpn.com/blog/open-ports-on-router/). If you decide not to enable UPNP, you will need to modify your `network.env` file to reflect `ENABLE_NAT=true` and specify your external IP address in `EXT_IP`.

To verify that your ports are open, you can use [this service](https://www.yougetsignal.com/tools/open-ports/).

Once you enable UPNP on your router or open the necessary ports, restart your node.

## Syncing & Peering

### Check Sync Status

**How do I know if my node has synced to the network?**

To check if your node is synced to the tip of the network, we need to figure out what the most recent blocks your node has appended are.

To show the most recent blocks your node appended in a specific chain, run the following line of code:

```go
// This command will display recent logs containing "Appended" from Cyprus-1.
// To edit which chain's logs will display, edit the chain index. 
cat nodelogs/zone-0-0.log | grep Appended
// Ex. for viewing appended blocks for zone-1-1
cat nodelogs/zone-1-1.log | grep Appended
```

To display an ongoing stream of logs showing which blocks are being appended, run the following line of code (to exit the stream, use ctrl+c):

```go
// This command will display a stream of logs containing "Appended" from Cyprus-1.
// To edit which chain's logs will display, edit the chain index.
tail -f nodelogs/zone-0-0.log | grep Appended
```

If you are running a global node and/or want to check the logs of all chains simultaneously to see which blocks are being appended, the chain index can be replaced with *:

```go
// This command will display recent logs containing "Appended" from all chains. 
cat nodelogs/*.log | grep Appended
```

```go
// This command will display a stream of logs containing "Appended" from all chains.
tail -f nodelogs/*.log | grep Appended
```

You can also check the progress of your node's sync using the **client JSON RPC API**. The [quai_syncing](../../../develop/apis/json-rpc-api.md) API method can be used easily in the [Quai Postman Workspace](https://documenter.getpostman.com/view/19820580/2s935iv7GU) or via the command line. If the API returns `false`, your node has synced to the current tip of the chain.

Once you’ve determined what block your node has most recently appended, check whether the block height on your node corresponds to the latest maximal block height for the same chain on the Kibana dashboard or Quaiscan. If they are the same, your node has synced! If your node’s block height is less than the block height of Kibana/Quaiscan, you are still syncing.

:::info
Your node may briefly stop appending blocks for certain periods of time — this is normal, and does not require a restart of the client. Reach out for support if your node has not appended any blocks in any slice for over an hour.
:::

* Quai Stats Dashboard: [https://stats.quai.network](https://stats.quai.network)
* Quaiscan Explorers:

| Zone Name | Zone Index | QuaiScan Link                          |
| --------  | ---------- | -------------------------------------- |
| Cyprus-1  | [0 0]      | https://cyprus1.colosseum.quaiscan.io/ |
| Cyprus-2  | [0 1]      | https://cyprus2.colosseum.quaiscan.io/ |
| Cyprus-3  | [0 2]      | https://cyprus3.colosseum.quaiscan.io/ |
| Paxos-1   | [1 0]      | https://paxos1.colosseum.quaiscan.io/  |
| Paxos-2   | [1 1]      | https://paxos2.colosseum.quaiscan.io/  |
| Paxos-3   | [1 2]      | https://paxos3.colosseum.quaiscan.io/  |
| Hydra-1   | [2 0]      | https://hydra1.colosseum.quaiscan.io/  |
| Hydra-2   | [2 1]      | https://hydra2.colosseum.quaiscan.io/  |
| Hydra-3   | [2 2]      | https://hydra3.colosseum.quaiscan.io/  |

### Global Sync Status

**How can I check the syncing status of all of my node's slices at once?**

To check the syncing status of all of your node's slices at the same time, you can use this community-made script: [https://github.com/satman81/guides/blob/main/quai/quaiblockheight.py](https://github.com/satman81/guides/blob/main/quai/quaiblockheight.py).

### Time to Sync

**How long should it take my node to sync?**

Syncing time depends on the quality of peers, the size of the network's state, the node's internet connection, and more. In general, at the time of writing (state size of ~22gb) a global node should take ~12-24 hours to sync to the tip of the network from genesis. A slice node will sync slightly faster than a global node. If syncing from [the most recently updated snapshot/archive](https://archive.quai.network/), a global node should take no more than an hour to sync to the tip of the network.

### Peer Requirements

**How many peers do I need before my node starts syncing?**

In order to start syncing, your node will need to have a minimum of three (3) peers in each slice of the network. Your node will not begin appending blocks to any slice before having 3+ peers in every slice.

### Flushing Peers

**How can I drop/flush all my peers?**

It is not recommended to drop your peers, as your node will stop syncing and validating blocks. However, if you experience an issue that requires you to flush your peers, you can use the following command on **Linux**:

```
rm -rf ~/.quai/**/**/nodes
```

Or the following command on **MacOS**:

```
rm -rf ~/Library/Quai/**/**/nodes
```

### Syncing Out of Order

**Why is my node syncing blocks out of order?**

Within Quai Network, the process of syncing is not always linear but rather based on the entropy reduction of blocks. Nodes will sync blocks in the order of entropy reduction, not block number -- thus, you may occasionally see non-linear patterns in syncing.

## Errors

### Genesis Mismatch

**I got the error "Fatal: Failed to register the Quai service: genesis block mismatch:" when trying to start my node. How do I fix this?**

If you got this error, it likely means that your `network.env` file needs to re-copied.

Start by running the following to determine which tag you are on:

```
git status
```

If you are on the correct tag, you need to re-copy your network.env file and re-configure the `SLICES`, `NETWORK`, and `COINBASE` parameters. This will ensure you are running on the correct nonce.

```
cp network.env.dist network.env
```

Once you've re-copied and re-configured the network.env file, you should be able to run your node.

If, when you run `git status`, you are NOT on the correct branch, be sure to update your node following the instructions in the FAQ/Starting and Running a Node page and then come back here to re-copy the `network.env`.

### Unclean Shutdown

**What does "detected unclean shutdown" mean? Do I need to be concerned?**

The "detected unclean shutdown" message means your node detected an abnormal shutdown. This could be either a direct process kill or your computer shutting off. The go-quai v0.19.2 update ensured that even in the event of an unclean shutdown, your node should properly shut down and save your chain database.

### Node Not Appending

**Why is my node not appending any more blocks?**

This is a broad question, but here are some things you can check. Generally, an issue with blocks no longer appending points to a networking issue:

* Ensure you either have UPNP enabled or ports 30303-30315 opened.
* If you fail to port forward correctly but still set an EXT_IP, your node will bypass the UPNP error but will eventually be dropped by all peers.
* Ensure if you are port forwarding that you have properly configured the ENABLE_NAT flag to equal true and the EXT_IP flag to equal your external IP.
* There is a difference between an internal and external IP; make sure you are inputting your external IP to the EXT_IP flag.

If none of these fixes address your issue, send a message in the [Quai Discord](https://discord.gg/quai/) to receive personalized support.

### CPU 100% Load

**Why is my CPU running at 100% load even after I have finished syncing to the tip of the network?**

The go-quai release v0.24.0 drastically reduced CPU usage across all machines. However, if you are on v0.24.0, there are a few different things that could cause your CPU to be running consistently at 100% load:

1. If you are running a CPU on the low end of the minimum specifications, high CPU usage may be unavoidable.
2. It is possible to reduce the maximum number of peers in each slice to reduce CPU usage. The default value of max peers is 50. Reducing max peers to 30 will lower CPU usage without causing networking issues. We recommend against reducing max peers to lower than 30, as having less than 30 peers can begin to cause networking issues. This functionality will be added to the network.env configuration file at a later date.