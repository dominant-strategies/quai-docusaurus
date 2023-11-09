---
title: HiveOS Automatic Installation
description: Automatically install and run a Quai Network GPU miner on HiveOS.
hide_table_of_contents: false
sidebar_position: 1
---

:::warning
You must have an instance of the [Quai Stratum Proxy](../../stratum-proxy/run-stratum.md) running before you can run a GPU miner.
:::

## Introduction

Here, we'll be installing quai-gpu-miner, the main implementation of a **Quai Network GPU miner**.

This tutorial focuses on installing and running **quai-gpu-miner on** [**HiveOS**](https://hiveon.com/os/), a Linux based operating system that makes GPU mining easy. HiveOS also provides a web based dashboard for **streamlined management and maintenance of your Quai Network GPU miner**.

:::danger
If you are mining for Testnet Rewards, be sure to **KEEP THE PRIVATE KEYS OF THE ACCOUNTS YOU MINE INTO**. Signing transactions from the accounts you mine into (using their private keys) will be the only acceptable way to prove how many blocks you mined in the Iron Age Testnet when it is time to claim Mainnet rewards.
:::

### Requirements

In order to run the quai-gpu-miner on HiveOS and mine valid blocks, you'll need the following:

- [A synced go-quai node](../../node/start-a-node.md)
- [A stratum proxy connected to your go-quai node](../../stratum-proxy/run-stratum.md)
- A machine running HiveOS with:
  - At least one AMD or Nvidia GPU
  - An AMD or Intel CPU
  - 4GB+ of RAM

### Common Troubleshooting Resources

- [How to find the IP of a Stratum Proxy](../../stratum-proxy/stratum-faq.md#stratum-ip-address)
- ["No usable mining devices found" error](./gpu-miner-faq.md#no-opencl-platforms-found--no-usable-mining-devices)
- ["SIGSEGV encountered" error](./gpu-miner-faq.md#sigsegv)
- [Low hashrate on AMD cards](./gpu-miner-faq.md#amd-low-hashrate)
- [Error on make and/or build step](./gpu-miner-faq.md#error-on-make-andor-build)

Additional troubleshooting resources are available in the [GPU Miner FAQ](./gpu-miner-faq.md).

## Environment Setup

### HiveOS

To run the quai-gpu-miner, you'll first need to install and configure HiveOS. Instructions on how to install HiveOS on your rig and configure it can be found on the [HiveOS install documentation](https://hiveon.com/install/).

### Installing via Script

:::info
Using the script is the recommended way to install and build the miner due to its simplicity. However, if you are running unique settings or need specific drivers, you may prefer the customization of [the non-script installation](./hive-manual.md).
:::

There is a script to build the miner supported on HiveOS. To use the script, you can run the following commands in your HiveOS terminal:

```shell
sudo selfupgrade
```

```shell
curl -fsSL https://raw.githubusercontent.com/dominant-strategies/quai-gpu-miner/main/miner_deploy_script.sh | shell
```

Running this command will install and build all the necessary prerequisites for the miner. After this script has finished running, you can move into the build directory with the following command:

```shell
cd /home/user/quai-gpu-miner/build
```

Once you're in this directory, you're ready to configure and run the miner.

## Configure and Run

### Run

To run the miner, you'll need a quai-stratum-proxy to connect to. Visit the [quai-stratum-proxy](../../stratum-proxy/run-stratum.md) docs for information on how to install and configure it. The proxy configuration will determine which shard your gpu-miner is running on and the address payouts are awarded to.

First, you'll need to [obtain the IP Address](../../stratum-proxy/stratum-faq.md#stratum-ip-address) and port your proxy is running on. The default port is `3333`.

Once you have the address and port and are in the `build` directory, run the following command to start the miner:

:::info
Replace `PROXYIPADDRESS` with the IP address of your proxy. Replace `STRATUMPORT` with the websocket port of your proxy, which is [default set to `3333`](../../stratum-proxy/stratum-faq.md#stratum-port)
:::

```shell
./ethcoreminer/ethcoreminer -G -P stratum://PROXYIPADRESS:STRATUMPORT
```

The quai-gpu-miner should now be running and outputting logs to the terminal. Now that your miner is running, [learn how to optimize your miner in the FAQ](./gpu-miner-faq.md#optimization)!

:::danger
Do not start the miner before [confirming your node has fully synced](../../node/node-faq.md#check-sync-status). Mining while your node is not synced will result in the mining of **invalid blocks** and **wasted hash**.
:::

### Stop

To stop the miner, simply use **CTRL+C** to kill the terminal process. Once logs are no longer being outputted to the terminal, the miner has stopped.
