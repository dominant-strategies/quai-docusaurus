---
title: GPU Miner
description: How to install and run a Quai Network GPU miner.
slug: /gpu-miner
hide_table_of_contents: false
sidebar_position: 2
---

# GPU Miner

:::info
You must have a running instance of a [stratum proxy](../miner-overview/stratum-proxy.md) before being able to set up a GPU miner.
:::

## Environment Setup 

Here, we'll be installing quai-gpu-miner, the main implementation of a **Quai Network GPU miner**. This tutorial focuses on installing and running **quai-gpu-miner** on [HiveOS](https://hiveon.com/os/), a Linux based operating system that makes GPU mining easy.

### HiveOS

To run the quai-gpu-miner, you'll first need to install and configure HiveOS. Instructions on how to install HiveOS on your rig and configure it can be found on the [HiveOS install documentation](https://hiveon.com/install/).

### Drivers and Updates

Now that we've installed HiveOS, we need to update drivers, install some GPU utility packages, and ensure Hive is up to date.

To upgrade HiveOS, run:

```bash
selfupgrade
```

To update and install necessary graphics card drivers, run:

```bash
nvidia-driver-update
```

Once drivers have been installed and updated, we'll need to install OpenCL:

```bash
amd-ocl-install 22.20
```

### Dependencies

Prior to installing any dependencies, you'll first want to make sure Ubuntu is up to date. We can do this by running:

```bash
sudo apt update && sudo apt upgrade -y
```

After Ubuntu has updated, we can begin installing the following dependencies:
* `cmake`
* `build-essential`
* `mesa-common-dev`

Install all dependencies using the following command:

```bash
sudo apt install cmake build-essential mesa-common-dev -y
```

Finally, after installing all necessary dependencies and drivers, reboot your machine to ensure all updates are applied correctly using:

```bash
sreboot
```

## Configure and Run

Now that the **environment and dependencies** are fully configured, we can install `quai-gpu-miner` and navigate to the `quai-gpu-miner` directory:

```bash
git clone https://github.com/dominant-strategies/quai-gpu-miner && cd quai-gpu-miner
```

To install and update external repository dependencies, run the following:

```bash
git submodule update --init --recursive
```

This will ensure that all the submodules referenced in the repository are **properly initialized** and **up to date**.

### Build

Start by making a directory named `build` and navigating to it:

```bash
mkdir build && cd build
```

Inside of the build directory, we'll need to install all of the build dependencies using `cmake`.

```bash
cmake .. -DETHASHCL=ON -DETHASHCUDA=OFF
```

Now that we've installed the build dependencies, build and compile the miner with the following command:

```bash
cmake --build .
```

### Run

To run the miner, you'll need a stratum proxy to connect to. Visit the [quai-stratum-proxy docs](../miner-overview/stratum-proxy.md) for information on how to install and configure the `go-quai-stratum` proxy. The proxy configuration will determine which shard your gpu-miner is running on and the address payouts are awarded to.

First, you'll need to obtain the IP Address and port your proxy is running on. The default port is `3333`.

Once you have the address and port and are in the build directory, run the following command to start the miner:

```bash
./ethcoreminer/ethcoreminer -G -P stratum://PROXYIPADRESS:STRATUMPORT
```

The `quai-gpu-miner` should now be running and outputting logs to the terminal.