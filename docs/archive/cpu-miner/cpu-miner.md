---
title: CPU Miner
description: How to install and run a Quai Network GPU miner.

sidebar_position: 1
---

# CPU Miner

## Environment Setup

Here, we'll be installing quai-cpu-miner, the Go implementation of a Quai Network CPU miner.

### Install Dependencies

To run an instance of quai-cpu-miner, you'll need to have installed and configured a Quai node. The [prerequisites](/participate/node/start-a-node.md#install-dependencies) to install and run the miner are the same as a node.

If you haven't set up your node, we recommend going through the [Run A Node page](/participate/node/start-a-node.md) before proceeding.

### Install quai-cpu-miner

Now that we've installed the base dependencies and configured our node, we can go ahead and clone the [quai-cpu-miner repo](https://github.com/dominant-strategies/quai-cpu-miner).

To install quai-cpu-miner and navigate to its directory, run the following commands:

```shell
git clone https://github.com/dominant-strategies/quai-cpu-miner.git
cd quai-cpu-miner
```

This will install the main branch to your local machine.

### Configuration

Simply copy the configuration template file `config.yaml.dist` into a local configuration file named `config.yaml`. This can be done by navigating to the config directory and running:

```shell
cp config.yaml.dist config.yaml
```

The default configuration will suffice for the duration of this tutorial. For more advanced users, the config file can be used to set up a connection to the [Quai stratum proxy](https://github.com/dominant-strategies/go-quai-stratum).

Before continuing, make sure to navigate back to the quai-cpu-miner root directory.

## Run the Miner

### Build

Similar to the node, we'll need to build the source to run the miner.
To build the source via Makefile, run:

```shell
make quai-cpu-miner
```

### Start

Prior to running the miner, you must connect to a fully synced node, either local or remote. Once you've connected to a synced node, you can spin up an instance of the miner.

Similar to a [slice node](/participate/node/node-overview.md#slice-node), a miner mines a "slice" down the network hierarchy that includes prime, one region, and one zone chain. To start the miner, you'll need to specify the region, and zone chains that you'd like to mine. Region and zone indices are 0-indexed and range from 0-2.

To start the miner, select a region and zone index and run:

```shell
# run in terminal
make run-mine region=0 zone=1

# run in background, save log output
make run-mine-background region=2 zone=1
```

When choosing which contexts to mine, there are a few important things to consider:

- Block difficulty in each context (lower difficulty = higher chance of finding a block)
- Peer connection latency (related to geographic distance from peers)

Optimizing for latency **drastically decreases** the chance of finding an uncle block for which a decreased block reward is awarded. Miners who select contexts with the **lowest block difficulties** in tandem with **minimizing peer latencies** will generally be the most successful. Our team has provided a [guide to inform optimal context selection](/learn/advanced-introduction/hierarchical-structure/latency.md#networking-latencies) based on your geographical location for miners.

### Verify

Depending on whether or not the miner is running in background, logs will be viewable in different locations.

If you're running in the terminal, logs will be piped directly to the terminal and will not be saved. If the miner is running in the background, the miner output will be piped to a mining location specific .log file with the path `logs/slice-R-Z.log`. To view the last 100 lines of log output in Cyprus-1, run:

```shell
tail -f 100 logs/slice-0-0.log
```

You can also easily view miner logs via your favorite IDE, we recommend using this method. Logs are the best way to verify that your miner is running correctly and view information on efficiency and blocks mined.

A miner that is actively mining should have log outputs similar to:

```shell
2023/01/11 12:51:23 Mining Block:   [16 22 78] location [0 0] difficulty [29209917 7353733 1913341]
2023/01/11 12:51:25 Zone block  :   [16 22 78] 0x0000086297dd6d1f635b01e3dc3d0c27d0ed9a571ae4e3e22ba89e876e71e398
2023/01/11 12:51:25 Mining Block:   [16 22 79] location [0 0] difficulty [29209917 7353733 1914275]
2023/01/11 12:51:30 Zone block  :   [16 22 79] 0x000007c8d5b6ce6e7958eef2e3d12524538602400d1291744358efc43f57f266
2023/01/11 12:51:30 Mining Block:   [16 22 80] location [0 0] difficulty [29209917 7353733 1915209]
2023/01/11 12:51:31 Zone block  :   [16 22 80] 0x000008094cf87697189620a51357b54827828fb9a693cc1e082b36736a406fcd
2023/01/11 12:51:31 Mining Block:   [16 22 81] location [0 0] difficulty [29209917 7353733 1915209]
2023/01/11 12:51:33 Zone block  :   [16 22 81] 0x000006fb38aa98adddc3a6b0e5b887a55ea21065f05a5801ddca6aca0deba290
2023/01/11 12:51:33 Mining Block:   [16 22 82] location [0 0] difficulty [29209917 7353733 1916144]
2023/01/11 12:51:34 Quai Miner  :   Hashes per second:  734038.5899168133
```

:::info
The miner logs provide the current block being mined, block type, the hash/second of your machine, and a number of other useful pieces of data.
:::

### Stop

You should stop the miner anytime you plan to pull an update, stop your node for any reason, or are shutting down your machine. A miner instance running the in background can be terminated by running:

```shell
make stop
```

If the miner is running inside your terminal, you can use CTRL+C to kill the process.

### Maintain

Making sure your miner is running correctly is crucial to being successful as a miner and the network as a whole. There are a few ways to verify that your miner is running smoothly.

#### Updating

Prior to updating your miner, make sure to kill any instances of quai-cpu-miner using the stop command above. After stopping your miner, pull any new code by running:

```shell
git pull
```

After pulling the latest code, you'll need to rebuild the source by running:

```shell
make quai-cpu-miner
```

After completing the steps above, you can restart the miner and continue mining.

:::warning
Starting the miner update process while the node or miner are running could cause issues. Make sure to stop all processes before updating.
:::

```shell

```
