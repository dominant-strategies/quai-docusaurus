---
title: Stratum Proxy FAQ
description: Answers to commonly asked questions about the Stratum Proxy.
sidebar_position: 3
sidebar_label: FAQ
keywords:
  - stratum proxy
  - quai stratum
  - faq
---

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
./build/bin/go-quai-stratum --region=REGION-WS-PORT --zone=ZONE-WS-PORT
```

To properly run this command, you'll need to replace `REGION-WS-PORT` and `ZONE-WS-PORT` with the correct ports for the slice you wish the proxy to run.

To find the correct WS ports, you can either check the [Run a Stratum Proxy](/participate/stratum-proxy/run-stratum.md#run) page, or alternatively use the following table to immediately find the correct command:

| Chain Name | Type   | Chain Index | Web Socket Port | Stratum Command                                            |
| ---------- | ------ | ----------- | --------------- | ---------------------------------------------------------- |
| Cyprus     | Region |             | 8579            |                                                            |
| Paxos      | Region |             | 8581            |                                                            |
| Hydra      | Region |             | 8583            |                                                            |
| Cyprus-1   | Zone   | [0 0]       | 8611            | ./build/bin/go-quai-stratum --region=cyprus --zone=cyprus1 |
| Cyprus-2   | Zone   | [0 1]       | 8643            | ./build/bin/go-quai-stratum --region=cyprus --zone=cyprus2 |
| Cyprus-3   | Zone   | [0 2]       | 8675            | ./build/bin/go-quai-stratum --region=cyprus --zone=cyprus3 |
| Paxos-1    | Zone   | [1 0]       | 8613            | ./build/bin/go-quai-stratum --region=paxos --zone=paxos1   |
| Paxos-2    | Zone   | [1 1]       | 8645            | ./build/bin/go-quai-stratum --region=paxos --zone=paxos2   |
| Paxos-3    | Zone   | [1 2]       | 8677            | ./build/bin/go-quai-stratum --region=paxos --zone=paxos3   |
| Hydra-1    | Zone   | [2 0]       | 8615            | ./build/bin/go-quai-stratum --region=hydra --zone=hydra1   |
| Hydra-2    | Zone   | [2 1]       | 8647            | ./build/bin/go-quai-stratum --region=hydra --zone=hydra2   |
| Hydra-3    | Zone   | [2 2]       | 8679            | ./build/bin/go-quai-stratum --region=hydra --zone=hydra3   |

## Advanced Setup

### Multiple GPUs to Proxy

**Is there a limit to how many GPUs I can connect to a single proxy?**

Not that we've found during our testing! If you end up finding a limit, let us know in the [Quai dev discord](https://discord.gg/s8y8asPwNC).

### Multiple Proxies to Node

**Can I connect multiple proxies to a single node?**

Yes. If you choose to run multiple proxies simultaneously, you need to pass the flag `--stratum=PORT` in the run command to determine which port each proxy will run on. Each stratum proxy must be set up to run on a unique and open port.
