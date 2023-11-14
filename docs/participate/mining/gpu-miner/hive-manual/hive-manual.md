---
title: HiveOS Manual Installation
description: Manually install and run a Quai Network GPU miner on HiveOS.
hide_table_of_contents: false
sidebar_position: 2
keywords:
  - hiveos
  - manual
  - mining
---

There are two tutorials available for manually setting up a GPU Miner on HiveOS -- one utilizing OpenCL, and one utilizing CUDA. The automatic HiveOS installation will install with OpenCL.

Users with Nvidia GPUs are recommended to utilize CUDA, especially if you have encountered the SIGSEGV issue while using OpenCL.

| Page                            | Description                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- |
| [OpenCL](hive-manual-opencl.md) | Open-source. Known to face SIGSEGV error.                                   |
| [CUDA](hive-manual-cuda.md)     | Proprietary. Known to resolve SIGSEGV error. Recommended for Nvidia miners. |
