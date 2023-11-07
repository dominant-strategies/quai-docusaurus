---
title: Stratum Proxy FAQ
description: Answers to commonly asked questions about the Stratum Proxy.
slug: /stratum-faq
hide_table_of_contents: false
sidebar_position: 3
---

# Stratum Proxy FAQ

## Setup & Config

### Stratum IP Address

**How do I find the IP address of my stratum proxy?**

To find the IP of your stratum proxy, you can run the following command:

```bash
curl ifconfig.me
```

If your node, stratum proxy, and GPU miner are running on the same machine, you should use the IP address `0.0.0.0`.

### Stratum Port

**What port does my stratum proxy run on?**

Unless you changed the port in the config file, your stratum proxy will run on port 3333 by default.

### Keep Proxy Running

**How can I make sure my stratum proxy keeps running even if my screen turns off?**

Programs like [tmux](https://github.com/tmux/tmux/wiki) or [screen](https://www.gnu.org/software/screen/manual/screen.html) can be used to keep processes running in the background, even if your screen turns off. If you run your stratum proxy process in one of these programs, it will continue to run when your screen turns off.

**Does my stratum proxy have to be running on the same machine as my node?**

Yes. In order for your GPU miner to be able to use the stratum proxy to connect to your node, the stratum proxy and node must be running simultaneously on the same machine.

```bash
# REGION-WS-PORT and ZONE-WS-PORT should be replaced with the correct ports.
./build/bin/quai-stratum --region=REGION-WS-PORT --zone=ZONE-WS-PORT
```

To properly run this command, you'll need to replace `REGION-WS-PORT` and `ZONE-WS-PORT` with the correct ports for the slice you wish the proxy to run.

To find the correct WS ports, you can either check the [Node Overview page of the docs](../../node/node-overview/node-overview.md), or alternatively use the following table to immediately find the correct command:

| Chain Name | Chain Index | Stratum Command                                         |
| ---------- | ----------- | ------------------------------------------------------- |
| Cyprus-1   | [0 0]       | ./build/bin/quai-stratum --region=cyprus --zone=cyprus1 |
| Cyprus-2   | [0 1]       | ./build/bin/quai-stratum --region=cyprus --zone=cyprus2 |
| Cyprus-3   | [0 2]       | ./build/bin/quai-stratum --region=cyprus --zone=cyprus3 |
| Paxos-1    | [1 0]       | ./build/bin/quai-stratum --region=paxos  --zone=paxos1  |
| Paxos-2    | [1 1]       | ./build/bin/quai-stratum --region=paxos  --zone=paxos2  |
| Paxos-3    | [1 2]       | ./build/bin/quai-stratum --region=paxos  --zone=paxos3  |
| Hydra-1    | [2 0]       | ./build/bin/quai-stratum --region=hydra  --zone=hydra1  |
| Hydra-2    | [2 1]       | ./build/bin/quai-stratum --region=hydra  --zone=hydra2  |
| Hydra-3    | [2 2]       | ./build/bin/quai-stratum --region=hydra  --zone=hydra3  |

## Advanced Setup

### Multiple GPUs to Proxy

**Is there a limit to how many GPUs I can connect to a single proxy?**

Not that we've found during our testing! If you end up finding a limit, let us know in the [Quai dev discord](https://discord.gg/s8y8asPwNC).

### Multiple Proxies to Node

**Can I connect multiple proxies to a single node?**

Yes. If you choose to run multiple proxies simultaneously, you need to pass the flag `--stratum=PORT` in the run command to determine which port each proxy will run on. Each stratum proxy must be set up to run on a unique and open port.
