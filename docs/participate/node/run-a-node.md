---
title: Run A Node
description: How to start and run a Quai Network node.
sidebar_position: 2
keywords:
  - node
  - run node
  - tutorial
  - quai node
---

## Introduction

Here, we'll be installing go-quai, the Go implementation of Quai Network. This tutorial is focused on Linux distributions and MacOS systems.

:::warning
Running go-quai on Windows or WSL2 is not currently supported.
:::

Prefer a video tutorial? Check it out here:

<iframe
	width='560'
	height='315'
	src='https://www.youtube.com/embed/eKk8b5-7TMk'
	title='YouTube video player'
	frameborder='0'
	allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
	allowfullscreen
></iframe>

### Requirements

:::info
Quai consists of many "slices," or execution shards, that work together to form an overarching network. A **global node** runs all of these slices, while a **slice node** runs only a single slice. Our team at Dominant Strategies recommends a **slice node** for the vast majority of users. If you're split on which kind of node to run, [read this](/participate/node/node-faq.md#global-v-slice-node).
:::

To run a **global node** during the Iron Age Testnet, you'll need a MacOS or Ubuntu machine with the following specifications:

- Fast CPU with 8+ cores
- 32GB+ RAM
- Fast SSD with at least 3TB free space
- 10+ MBit/sec download Internet service

To run a **slice node** during the Iron Age Testnet, you'll need a MacOS or Ubuntu machine with the following specifications:

- CPU with 4+ cores
- 16GB RAM
- 1TB free storage space to sync
- 10+ MBit/sec download Internet service

:::warning
The above hardware specifications are for when Quai Network is operating at no/low load. To see the required hardware specifications when Quai Network is operating at high/maximum load, visit the [Node Overview page](/participate/node/node-overview.md#node-types) or the [Node FAQ](/participate/node/node-faq.md#node-hardware-specs).
:::

### Common Troubleshooting Resources

- [Resolving UPnP Errors](/participate/node/node-faq.md#upnp-issues)
- [Troubleshooting node not appending blocks](/participate/node/node-faq.md#node-not-appending)
- [Determining node sync status](/participate/node/node-faq.md#check-sync-status)

Additional troubleshooting resources are available in the [Node FAQ](./node-faq.md).

## Install Dependencies

To run an instance of go-quai, you'll need to install a few dependencies. You can install dependencies with your favorite package manager ([apt](https://ubuntu.com/server/docs/package-management), [brew](https://brew.sh/), etc.). The following dependencies are required to run a node:

#### Go v1.21.0+

Ubuntu Snap Install (_snap is not default installed on all Linux distros_):

```bash
# install snapd if you don't have it already
sudo apt install snapd

# install go
sudo snap install go --classic
```

MacOS Install:

```bash
brew install go
```

If you're not on Ubuntu or MacOS, instructions on how to install go directly can be found on the [golang installation page](https://go.dev/doc/install).

#### Git & Make

Linux install:

```bash
sudo apt install git make
```

MacOS install:

```bash
brew install git make
```

### Install go-quai

Now that you've installed the base dependencies, we can go ahead and [clone the go-quai repo](https://github.com/dominant-strategies/go-quai).

To clone the go-quai repo and navigate to it, run the following commands:

```bash
git clone https://github.com/dominant-strategies/go-quai
cd go-quai
```

This command installs the _main branch_ to your local machine. Unless you intend to develop, you must checkout the latest _release_.

You can find the latest release on the [go-quai releases page](https://github.com/dominant-strategies/go-quai/tags). Then, check out the latest release with:

```bash
git checkout put-latest-release-here
```

For example (this not the latest release, check the releases page for the latest release number)

```bash
git checkout v1.2.3-rc.4
```

## Node Configuration

After you've successfully installed go-quai, you'll need to configure your node. The `network.env.dist` is a boilerplate node configuration file. Copy the boilerplate file into `network.env` so that we can create our own custom config.

```bash
cp network.env.dist network.env
```

The `network.env` file houses a number of important parameters that we will configure to run our node correctly. The variables listed below will need to be set correctly for every experience level.

- `COINBASE`: the address in each chain (location) that mining rewards are paid to. Note that there is one coinbase address per shard.
- `NETWORK`: the network (testnet, devnet, etc.) your node is running on.
- `SLICES`: the slices of the network that the node will run. Note that the default configuration is for a global node, and that this parameter must be modified to run a slice node.
- `ENABLE_ARCHIVE`: whether or not the node will run in archive mode. Note that archive mode is required during the iron age testnet.

:::info
This file also contains a number of more advanced parameters that _will not be covered_ in this article.
:::

Open the config file in your favorite text editor or IDE.

- [vim](https://www.vim.org/)
- [nano](https://www.nano-editor.org/)
- [Visual Studio Code](https://visualstudio.microsoft.com/)

```bash
# edit network.env with nano
nano network.env

# open go-quai in vscode to edit network.env
code .

# edit network.env with vim
vim network.env
```

If you are mining, **replace the default coinbase addresses** below with your own for the chains that you intend to mine. You can generate addresses for each shard easily with [Pelagus Wallet or Koala Wallet](/participate/use-quai/wallets.md).

You must generate a unique address for each `COINBASE` that is maps to a shard, i.e. generate a Cyprus-1 address with Pelagus and set it as the `ZONE_0_0_COINBASE` below. Follow the same process for each chain you want to mine.

```makefile
# Replace addresses below with your addresses for each shard
ZONE_0_0_COINBASE=0x04a3e45aa16163F2663015b6695894D918866d19 # cyprus1
ZONE_0_1_COINBASE=0x21c7650E65b164B2ab645eAF1141b569B2c82Bd7 # cyprus2
ZONE_0_2_COINBASE=0x3e742F0AE63d62304153526A51EE8BF0531d1887 # cyprus3
ZONE_1_0_COINBASE=0x72c871f639ed156De0b97C1b533e2617730b7ec2 # paxos1
ZONE_1_1_COINBASE=0x755c3603c5688CF3105F1a1AfC11fa0e1981b03B # paxos2
ZONE_1_2_COINBASE=0x9fF7B1A33BB22b70F5fb78A420CEd9075C437c87 # paxos3
ZONE_2_0_COINBASE=0xb8094B2bc411942fd078D994Cc4e9418D6A5B071 # hydra1
ZONE_2_1_COINBASE=0xC83cb918dd9267a344B51f57e28e8cf977057E05 # hydra2
ZONE_2_2_COINBASE=0xF39E7d05B5A1a2F934cC43221383f29e4794c822 # hydra3
```

:::danger
If you do not replace the addresses in the `network.env` with Quai addresses you generate and hold the private keys for, you will not receive any mining rewards.
:::

Make sure to set the `ENABLE_ARCHIVE` variable to `true` in your `network.env` file. This will ensure that your node is running in archive mode, which is required for the Iron Age Testnet. It is default set to `false`.

```bash
ENABLE_ARCHIVE=true
```

Set the `NETWORK` variable to the network you plan on running. Available network options can be found in the [network specifications page](/develop/networks.md#important-links-and-specs).

Set the `SLICES` parameter to whichever slices of the network you would like to run. To learn more about [running setups other than a global node, check out the FAQ](/participate/node/node-faq.md#configuring-slices).

### Router Configuration

In order to connect directly to peers in the network, you'll need to make sure the [peering ports](/participate/node/node-overview.md#networking-and-conventions) on your router are forwarded or externally accessible.

The easiest way to ensure the peering ports are forwarded on your router is to **enable the universal plug and play (UPNP) option on your router**. General information on how to enable UPNP for _multiple different types of routers_ can be found in [this article](https://www.lifewire.com/enable-upnp-on-a-router-5206124). If your router _is not covered in this article_, you may have to search for UPNP instructions for your specific model.

:::warning
If your router does not have UPNP or port-forwarding enabled, your node will return an error when starting and immediately stop running.
:::

If your local router doesn't support UPNP and **you're port forwarding** or you're **setting up on a server (VPS/VDS)**, you'll need to configure a few variables in the Networking Variables section in your `network.env`.

```bash
# Networking Variables
ENABLE_NAT=true
EXT_IP=SERVER IP or WAN IP
```

Set `ENABLE_NAT` to true, and replace the placeholder for `EXT_IP` above with your public server or WAN IP address. This will allow for other nodes in the network to properly connect to your node.

Make sure to uncomment the `EXT_IP` line (i.e. remove the `#` from the beginning of the line).

If you're having issues with this step, make sure to check out the [FAQ router troubleshooting guide](/participate/node/node-faq.md#networking).

## Starting a Node

### Build

To start the node, we first need to build the source. You can build via Makefile by running the following command:

```bash
make go-quai
```

### Start

Now that we've built the source, we need to decide which type of node to run. As detailed in the [Node Overview](/participate/node/node-overview.md#node-types) page, users **can opt for either a** [**global node or slice node**](/participate/node/node-faq.md#global-v-slice-node) **depending on individual use case and hardware.**

#### Run a Global Node

Global nodes validate all of the chains within Quai Network. To spin up a global node run:

```bash
make run
```

#### Run a Slice Node

Slice nodes run what is called a "slice" of Quai Network. A slice is a subset of the network that validates prime, one region, and one zone chain. In the codebase, a slice is identified by its [region and zone index](/participate/node/node-overview.md#networking-and-conventions). Region and zone indices are 0-indexed and range from 0-2.

To spin up a slice node, **you'll need to edit the `network.env` file to specify the slices you want to run**. [Slice specification](/participate/node/node-faq.md#configuring-slices) can be done by editing the `SLICES` variable, which is default set to run all slices in the network.

For example, if you wanted to run two slices, you would change `SLICES` to the following (replace the corresponding `INDEX` variables for your desired slices):

```bash
SLICES="[FIRST_REGION_INDEX FIRST_ZONE_INDEX],[SECOND_REGION_INDEX SECOND_ZONE_INDEX]"
```

After configuring the slices you'd like to run in your `network.env`, start your node using the same command by running:

```bash
make run
```

:::info
Running a slice node will start processes for all chains, but **only validate state** in the chains you specify.
:::

This will start up your slice node with the slices specified in your `network.env`.

Node operators should self-select the slice least latent to them, in order to minimize their uncle rate and maximize network bandwidth. Providing an initial suggestion for geographic organization will expedite the minimization of latency.

![Latency Map](/img/LatencyMap.jpg)

### Logs

Starting a node will run all instances of go-quai in the background and create a directory named nodelogs. Outputs from the node will be piped to a context specific `.log` file inside of nodelogs. To view the log output for a specific location, use:

```bash
tail -f nodelogs/prime.log
# OR
tail -f nodelogs/region-2.log
# OR
tail -f nodelogs/zone-0-0.log
```

Checking the node logs output is the _best way_ to [_verify that your full node is running correctly_](/participate/node/node-faq.md#checking-nodelogs). You can also easily view node logs in your favorite IDE or text editor.

The outputs of a node that has **started correctly** should look similar to below.

```log
INFO [01-30|19:55:15.397] Starting Quai 0.1.0-pre.0 on local testnet
INFO [01-30|19:55:15.414] Maximum peer count                       ETH=50 total=50
WARN [01-30|19:55:15.460] Disable transaction unindexing for archive node
INFO [01-30|19:55:15.460] Enabling recording of key preimages since archive mode is used
INFO [01-30|19:55:15.460] Set global gas cap                       cap=50,000,000
INFO [01-30|19:55:15.460] Allocated trie memory caches             clean=307.00MiB dirty=0.00B
INFO [01-30|19:55:15.461] Allocated cache and file handles         database=/Users/user/Library/Quai/local/zone-0-0/quai/chaindata cache=512.00MiB handles=5120
INFO [01-30|19:55:17.727] Opened ancient database                  database=/Users/user/Library/Quai/local/zone-0-0/quai/chaindata/ancient readonly=false
INFO [01-30|19:55:17.728] Writing custom genesis block
```

**To stop log outputs to the terminal, you can use CTRL+C.**

:::warning
Depending on what your node is currently doing, your logs may not look **exactly** the same as above.
:::

### Syncing

If your node has started correctly, it will begin syncing chain state from peers. There are a few ways to [check the progress of the sync](/participate/node/node-faq.md#check-sync-status).

From the **command line**, we can run the following command(s) to print the list of blocks that have been appended. **Replace** `location-to-print-here.log` **with the file name of the logs you'd like to print**.

```bash
# Print all appended blocks
cat nodelogs/location-to-print-here.log | grep Appended

# Continuously print new appended blocks
tail -f nodelogs/location-to-print-here.log | grep Appended

# Continuously print appended blocks across all chains
tail -f nodelogs/* | grep Appended
```

The output should look similar to below:

```bash
INFO   [09-18|10:18:17.273] Appended new block                       number=[102 1934 40392] hash=0x0000067368b679ce7994dbd6e3dfe93a5e5fe16642a6083604fd405556836cbe difficulty=405369 uncles=0 txs=0 etxs=0 gas=0 gasLimit=5000000 root=0x7df4c77d1463a5e4c7d5f5446476e34df01cf14b6226b7d83ccab072bc302edc order=2 location=[0 0] elapsed=2.019ms
INFO   [09-18|10:18:17.736] Appended new block                       number=[102 1934 40393] hash=0x0000285b7ffa020c8f9f5f8832381593170d1d7618ad2fae8202350a0d81acac difficulty=405875 uncles=0 txs=0 etxs=0 gas=0 gasLimit=5000000 root=0x81954cf5d93a979890641acffe7496965ff4602ad2b24d24ab5356ba52072c39 order=2 location=[0 0] elapsed=1.933ms
INFO   [09-18|10:18:17.803] Appended new block                       number=[102 1934 40394] hash=0x00000d6f0d100a8d254088090876a6ab911720af7e7bc6454f5d1a01417f786f difficulty=406382 uncles=0 txs=0 etxs=0 gas=0 gasLimit=5000000 root=0x8eb0b430e2df8f91a180b6f29fea46430c9014ccde42fa538df62bf3251dff03 order=2 location=[0 0] elapsed=2.005ms
INFO   [09-18|10:18:18.511] Appended new block                       number=[102 1934 40395] hash=0x00001211f391c0a162701ad0dcbdef47f4efe96b3fb5f77e1f0b75b6ff439312 difficulty=406889 uncles=0 txs=0 etxs=0 gas=0 gasLimit=5000000 root=0xc810b3d05f9a9b7f4fee3da271d3544cba26b6368f84ee5e5e885cbe4fd11cab order=2 location=[0 0] elapsed=2.147ms
```

**To check the progress of your node's sync, compare the number of the latest block output from the above command to the current height of the chain you're running on the** [**Quai node stats page**](https://stats.quai.network/).

You can also check the progress of your node's sync using the **client JSON RPC API**. The [quai_syncing](/develop/apis/json-rpc-api.md#quai_syncing) API method can be used easily in the [Quai Postman Workspace](https://documenter.getpostman.com/view/19820580/2s935iv7GU) or via the command line.

To check the sync status of all of your nodes at once, you can use the script provided in the[ FAQ](/participate/node/node-faq.md#global-sync-status).

:::warning
If your node temporarily stops appending during sync, do not stop it. Allow it to continue running, and only reach out for support if the node has not appended a block for over 1 hour.
:::

### Stop

Stopping your node should be done any time you make changes to your config file or prior to shutting your machine down. A node instance can be terminated by running:

```bash
make stop
```

This will kill all instances of `go-quai` on your machine. This can sometimes take a few seconds to complete.

:::info
If you're running a miner, running `make stop` will not work. You must kill the miner process prior to stopping the node.
:::

## Maintaining a Node

Making sure your node is _running correctly_ is crucial to both the functionality of any dependent infrastructure and the network as a whole.

### Updating

:::danger
Initiating the node update process while the node or manager are currently running could cause issues. Make sure to stop all processes before updating.
:::

To update a node, first **make sure to kill all instances of go-quai** using the above stop command.

After stopping the node, you should pull any updated code using:

```bash
git fetch --all
```

Checkout the [latest release of go-quai](https://github.com/dominant-strategies/go-quai/tags):

```bash
git checkout put-latest-release-here
```

Finally, rebuild the source using:

```bash
make go-quai
```

After pulling any new code and rebuilding the source, you can safely restart the node and continue running.

### Archiving And Syncing From a Snapshot

To archive/backup your node's database you'll first need to **stop your node** by running `make stop`.

Common reasons for backing up your node's database include:

- Importing/exporting node database
- Changing machines
- Wiping the drive the database is stored on

Common reasons for syncing from a snapshot/database include:

:::warning
Please be aware that when you are syncing from a snapshot, you are trusting the contents of the snapshot. For your node to fully verify the network, you have to sync from genesis.
:::

- Reducing syncing times
- Restarting a node on a new machine/drive

**Linux Machines**

You can backup your node's database by running:

```bash
# Stop node
make stop

# Remove peer database
rm -rf ~/.quai/*/quai/nodes

# Remove nodekey
rm -rf ~/.quai/*/quai/nodekey

# Remove database lock
rm -rf ~/.quai/*/quai/LOCK

# Archive and compress database
tar -I 'zstd -T0' -cvf quai_colosseum_backup.tar.zst .quai
```

To restore your database from a snapshot on **Linux**, use:

```bash
# Stop node
make stop

# Remove current db
# This command will permanently delete all state that you have synced thus far
rm -rf ~/.quai

# Expand compressed db into node
tar -I 'zstd -T0' -xvf quai_colosseum_backup.tar.zst

# Copy db into db directory
cp -r quai-colosseum-backup ~/.quai
```

**MacOS Machines**

Following a similar process as above with a different file structure:

```bash
# Stop node
make stop

# install zstd
brew install zstd

# Remove peer database
rm -rf ~/Library/Quai/*/quai/nodes

# Remove nodekey
rm -rf ~/Library/Quai/*/quai/nodekey

# Remove database lock
rm -rf ~/Library/Quai/*/quai/LOCK

# Archive and compress database
tar -I 'zstd -T0' -cvf quai_colosseum_backup.tar.zst ~/Library/Quai
```

To restore your database from a snapshot on on **MacOS**, use:

```bash
# Stop node
make stop

# Remove current db
# This command will permanently delete all state that you have synced thus far
rm -rf ~/Library/Quai

# install zstd
brew install zstd

# Expand compressed db
tar -I 'zstd -T0' -xvf quai_colosseum_backup.tar.zst

# Copy db into db directory
cp -r quai-colosseum-backup ~/Library/Quai
```

### Resetting/Clearing

:::danger
Resetting your node and clearing your database will remove any state you have synced. This is a non-reversible action and any commands noted below should be utilized with caution.
:::

Developers and node runners may find that situations arise where they need to completely clear your node of synced state or do a full reset in the case of an issue or bug. [A full reset of a node](/participate/node/node-faq.md#resetting-a-node) involves stopping the node, clearing the current nodelogs, and removing all synced state.

**Reminder, resetting your node is non-reversible and should only be done if you understand the implications of removing all synced state.**

For **Linux Machines**, we'll remove the `nodelogs` directory and the base `.quai` directory which contains all synced state. To do this, run the following command:

```bash
rm -rf nodelogs ~/.quai
```

For **MacOS machines**, we'll use a different command to remove the same directories:

```bash
rm -rf nodelogs ~/Library/Quai
```

After running one of the two above commands, the node has been fully reset and is ready to be restarted.
