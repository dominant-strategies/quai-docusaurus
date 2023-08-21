---
title: Run A Node
description: Overview of the implemenation of a Quai Network node.
slug: /run-a-node
hide_table_of_contents: false
sidebar_position: 1
---

# Run A Node

## Environment Setup

Here, we'll be installing and running go-quai, the Go implementation of a Quai Network Node.

### Install Dependencies

To run an instage of go-quai, you'll need to install a few dependencies. The following dependencies are required to run a node:

- Golang v1.21.0 or higher
  - [Linux Installation](https://snapcraft.io/install/go/ubuntu#install)
  - [MacOS Installation](https://formulae.brew.sh/formula/go)
  - [Windows Installation](https://medium.com/@benzbraunstein/how-to-install-and-setup-golang-development-under-wsl-2-4b8ca7720374)
- C Compiler
  - [Linux Installation](https://itsfoss.com/build-essential-ubuntu/)
  - [MacOS Installation](https://formulae.brew.sh/formula/make)
  - Windows Installation (same as Linux with WSL2)

### Install go-quai

Now that you've installed the base dependencies, we can go ahead and clone the
[go-quai repo](https://github.com/dominant-strategies/go-quai).

To clone the go-quai repo and navigate to it, run the following commands:

```bash
git clone https://github.com/dominant-strategies/go-quai
cd go-quai
```

This will install the main branch to your local machine.

## Client Configuration

After you've successfully installed go-quai, you'll need to configure your node. The `network.env.dist` file
is a boilerplate node configuration file. Copy the boilerplate file into a new file named `network.env` so
that we can create our own custom config.

```bash
cp network.env.dist network.env
```

The network.env file houses a number of important parameters that we'll need to configure to run our node. The
variables listed below will need to be set correctly for every experience level.

- `COINBASE`: the address in each chain (location) that mining rewards are paid to. Note there is one coinbase
  address per shard.
- `NETWORK`: the network (testnet, devnet, etc.) your node is running on.

:::info
This file also contains a number of more advanced parameters that will not be covered in this article.
:::

Open the config file in your favorite text editor or IDE, such as VSCode. If you are mining, replace the dummy
coinbase addresses with your own for the chains that you intend to mine. If you do not do this, your mining
rewards will not be sent to your _addresses_.

Set the `NETWORK` variable to the network you plan on running. Available network options can be found in the
[network specifications page](../../../develop/developintro.md).

## Running the Client

### Build

To start the node, we first need to build the source. You can build via Makefile by running the following command:

```bash
make go-quai
```

### Start

//TODO: DECIDE ON NODE NAMES (GLOBAL? BASE? SLICE? WATCHER?)
Now that we've built the source, we need to decide which type of node to run. As detailed in the [Node Overview page](./node-overview.md), users currently can opt for either a global or base node depending on individual use case and hardware.

#### Run a Global Node

Global nodes validate every chain within Quai Network. To spin up and start a global node, simply run:

```bash
make run-all
```

#### Run a Base Node

Base nodes run what is called a "slice" of Quai Network. A slice is a subset of the network that validates prime, one region, and one zone chain. In the codebase, a slice is identified by its region and zone index. Region and zone indices are 0-indexed and range from 0-2.

To spin up a slice node, select a region and zone index and run:

```bash
make run-slice REGION=0 ZONE=0
```

Node operators should self-select the slice least latent to them, in order to minimize their uncle rate and maximize network bandwidth. Providing an initial suggestion for geographic organization will expidite the minimization of latency.

![Quai Network Geographic Organization](../../../../static/img/LatencyMap.png)

### Verify

Starting a node will run all instances of go-quai in the background and create a directory named nodelogs. Outputs from the node will be piped to a context specific .log file inside of nodelogs. To view the last 100 lines of log output for a specific location, use:

```bash
tail -f 100 nodelogs/prime.log
# OR
tail -f 100 nodelogs/region-2.log
# OR
tail -f 100 nodelogs/zone-0-0.log
```

:::info
If you're running a base node, logs will only populate in the contexts the node is running.
:::

Checking the node logs output is the best way to verify that your full node is running correctly. You can also easily view node logs in your favorite IDE, we recommend using this method.

The outputs of a node that is running correctly should look like:

```bash
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

:::note
Depending on what your node is currently doing, your logs may not look exactly the same as above.
:::

### Stop

Stopping your node should be done any time you make changes to your config file or prior to shutting your machine down. A node instance can be terminated by running:

```bash
make stop
```

This will kill all instances of go-quai on your machine. This can sometimes take a few seconds to complete.

:::info
If you're running a miner, running `make stop` will not work. You must kill the miner process prior to stopping the node.
:::

### Maintain

Making sure your node is running correctly is crucial to both the functionality of any dependent infrastructure and the network as a whole.

#### Updating

To update a node, first **make sure to kill all instances of go-quai** using the above stop command.

After stopping the node, you should pull any updated code using:

```bash
git pull origin main
```

and rebuild the source using:

```bash
make go-quai
```

After pulling any new code and rebuilding the source, you can safely restart the node and continue running.

:::warning
Initiating the node update process while the node or manager are currently running could cause issues. Make sure to stop all processes before updating.
:::
