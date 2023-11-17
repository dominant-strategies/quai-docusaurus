---
title: Starting and Running a Stratum Proxy
description: A guide on configuring, starting, and running a Stratum Proxy.
sidebar_position: 2
keywords:
  - quai stratum
  - quai proxy
  - tutorial
---

## Introduction

Here, we'll be installing [go-quai-stratum](https://github.com/dominant-strategies/go-quai-stratum), the Go implementation of the stratum proxy on Quai Network. This tutorial is focused on Linux Distributions and MacOS systems.

:::warning
Running go-quai-stratum on Windows or WSL2 is not currently supported.
:::

Prefer a video tutorial? Check out a video walkthrough on setting up a stratum proxy here:

<iframe
	width='560'
	height='315'
	src='https://www.youtube.com/embed/wiPtdLRj6nQ'
	title='YouTube video player'
	frameborder='0'
	allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
	allowfullscreen
></iframe>

### Common Troubleshooting Resources

- [What machine to run the Stratum Proxy on](/participate/stratum-proxy/stratum-faq.md#keep-proxy-running)
- [How to keep Stratum running](/participate/stratum-proxy/stratum-faq.md#keep-proxy-running)
- [How to find the IP of the Stratum Proxy](/participate/stratum-proxy/stratum-faq.md#stratum-ip-address)
- [How to run multiple Stratum Proxies at once](/participate/stratum-proxy/stratum-faq.md#multiple-proxies-to-node)

## Environment Setup

For the simplest installation process, we recommend installing and running go-quai-stratum on the same computer that you're running go-quai. **Running go-quai-stratum on a separate computer is for advanced users as it requires additional networking configuration.**

### Install Dependencies

To run an instance of go-quai-stratum, you'll need to install a few dependencies. You can install dependencies with your favorite package manager ([apt](https://ubuntu.com/server/docs/package-management), [brew](https://brew.sh/), etc.).

:::info
If you've already installed go-quai, you already have all the necessary dependencies to run go-quai-stratum.
:::

#### Go v1.21.0+

Snap Install (_snapd is not installed by default on all Linux Distros_):

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

### Install go-quai-stratum

Now that you've installed the base dependencies, we can go ahead and clone the [go-quai-stratum repo](https://github.com/dominant-strategies/go-quai-stratum).

To clone the go-quai-stratum repo and navigate to it, run the following commands:

```bash
git clone https://github.com/dominant-strategies/go-quai-stratum
cd go-quai-stratum
```

This command installs the _main branch_ to your local machine. Unless you intend to develop, you must checkout the latest _release_.

You can find the latest release on the [go-quai-stratum releases page](https://github.com/dominant-strategies/go-quai-stratum/tags). Then, check out the latest release with:

```bash
git checkout put-latest-release-here
```

For example (this not the latest release, check the releases page for the latest release number):

```bash
git checkout v01.2.3-rc.4
```

## Configuration

To run the Quai stratum proxy, you'll need to do some minor configuration. Start by copying the example configuration file to a local configuration file:

```bash
cp config/config.example.json config/config.json
```

Within the `config.json` file, you'll be able to configure networking settings and other relevant variables:

## Running the Proxy

### Build

Before running the proxy, we need to build the source. You can build via Makefile by running the following command:

```bash
make quai-stratum
```

### Run

Now that we've built the source, we can start our proxy. We recommend using a process manager like tmux or screen to run the proxy.

To run the proxy, you'll need to select a shard to run against. More information on how and why to select shards can be found in the [GPU Miner FAQ](/participate/mining/gpu-miner/gpu-miner-faq.md#slice-choice).

Start the proxy by passing either the corresponding **web socket ports** or **chain names** for the region and zone you've selected to run. Run with chain names using this command:

```bash
./build/bin/quai-stratum --region=REGION-NAME --zone=ZONE-NAME
```

Or to run with ports use:

```sh
./build/bin/quai-stratum --region=REGION-WS-PORT --zone=ZONE-WS-PORT
```

:::warning
**Running the proxy will only work for chains your node is validating state for**. Global nodes validate state for all chains, whereas slice nodes only validate state for the chains you specify.
:::

Available options for `REGION-NAME`, `ZONE-NAME`, `REGION-PORT`, and `ZONE-PORT` can be found below. You must select a corresponding region and zone, i.e. paxos and paxos3 or hydra and hydra2.

If you're running a version of `go-quai-stratum` prior to [v0.9.0-rc.0](https://github.com/dominant-strategies/go-quai-stratum/releases/tag/v0.9.0-rc.0), you'll need to pass in the corresponding web socket ports as chain names are not supported prior to this version.

| Chain Name | Type   | Chain Index | Web Socket Port | Stratum Command                                         |
| ---------- | ------ | ----------- | --------------- | ------------------------------------------------------- |
| Cyprus     | Region |             | 8579            |                                                         |
| Paxos      | Region |             | 8581            |                                                         |
| Hydra      | Region |             | 8583            |                                                         |
| Cyprus-1   | Zone   | [0 0]       | 8611            | ./build/bin/quai-stratum --region=cyprus --zone=cyprus1 |
| Cyprus-2   | Zone   | [0 1]       | 8643            | ./build/bin/quai-stratum --region=cyprus --zone=cyprus2 |
| Cyprus-3   | Zone   | [0 2]       | 8675            | ./build/bin/quai-stratum --region=cyprus --zone=cyprus3 |
| Paxos-1    | Zone   | [1 0]       | 8613            | ./build/bin/quai-stratum --region=paxos --zone=paxos1   |
| Paxos-2    | Zone   | [1 1]       | 8645            | ./build/bin/quai-stratum --region=paxos --zone=paxos2   |
| Paxos-3    | Zone   | [1 2]       | 8677            | ./build/bin/quai-stratum --region=paxos --zone=paxos3   |
| Hydra-1    | Zone   | [2 0]       | 8615            | ./build/bin/quai-stratum --region=hydra --zone=hydra1   |
| Hydra-2    | Zone   | [2 1]       | 8647            | ./build/bin/quai-stratum --region=hydra --zone=hydra2   |
| Hydra-3    | Zone   | [2 2]       | 8679            | ./build/bin/quai-stratum --region=hydra --zone=hydra3   |

:::danger
**Do not open the above web socket ports except** in the specific case where your miner is on a different network than your node/stratum (and even then, be sure to only open the port to the necessary machine). You may be putting your local network security at risk.
:::

The proxy by default listens for miner connections on the `3333` port. You can change the port the proxy listens on by passing it in with the `--stratum` flag in the run command if you'd like.

```bash
./build/bin/quai-stratum --region=REGION-NAME --zone=ZONE-NAME --stratum=LISTENING-PORT
```

:::info
Changing the proxy listening port is useful for running multiple proxies on a single global node. If you're only mining on a single shard, there is no need to change the listening port.
:::

The proxy should begin streaming logs to the terminal that _look similar to below_.

```bash
WARN[0000] One ethash cache must always be in memory requested=0
2023/09/06 13:47:17 main.go:45: Loading config: 0x14000032970
2023/09/06 13:47:17 main.go:84: Running with 4 threads
2023/09/06 13:47:17 policy.go:80: Set policy stats reset every 1h0m0s
2023/09/06 13:47:17 policy.go:84: Set policy state refresh every 1m0s
2023/09/06 13:47:17 policy.go:100: Running with 8 policy workers
WARN[0000] One ethash cache must always be in memory requested=0
2023/09/06 13:47:17 proxy.go:104: Set block refresh every 120ms
2023/09/06 13:47:17 stratum.go:38: Stratum listening on 0.0.0.0:3333
2023/09/06 13:47:17 proxy.go:294: New block to mine on Zone at height [1 1 1]
2023/09/06 13:47:17 proxy.go:295: Sealhash: 0xc4a31a763af09272a5da7f237978f5e0ead1e409c1e19a034ff8e40e7d727561
2023/09/06 13:47:17 proxy.go:228: Starting proxy on 0.0.0.0:0
2023/09/06 13:47:17 stratum.go:280: Broadcasting new job to 0 stratum miners
```

**To stop the proxy, use CTRL+C in your terminal.**

After configuring and pointing your proxy at a shard, you're now ready to point a [GPU miner](/participate/mining/gpu-miner/gpu-miner.md) at it and start mining.
