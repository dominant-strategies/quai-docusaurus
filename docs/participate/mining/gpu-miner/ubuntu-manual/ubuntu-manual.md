---
title: Ubuntu Installation
description: How to install and run a Quai Network GPU miner on Ubuntu.
sidebar_position: 3
keywords:
  - ubuntu
  - mining
  - manual
---

There are two tutorials available for manually setting up a GPU Miner on Ubuntu -- one utilizing OpenCL, and one utilizing CUDA. Users with Nvidia GPUs are recommended to utilize CUDA, especially if you have encountered the SIGSEGV issue while using OpenCL.

| Page                                                                          | Description                                                                 |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [OpenCL](/participate/mining/gpu-miner/ubuntu-manual/ubuntu-manual-opencl.md) | Build with open source drivers. Known to face SIGSEGV error on some Nvidia cards.                                   |
| [CUDA](/participate/mining/gpu-miner/ubuntu-manual/ubuntu-manual-cuda.md)     | Build with proprietary Nvidia drivers. Known to resolve SIGSEGV error. Only compatible with and recommended for Nvidia cards. |
