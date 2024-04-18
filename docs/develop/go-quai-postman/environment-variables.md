---
title: Variables
description: How to configure and use environment variables in Postman for the Quai Network API.
sidebar_position: 2
keywords:
  - postman
  - api
  - json-rpc
  - environment variables
---

# Variables

## Introduction

Postman supports a number of different variable "scopes":

- **Global**
- **Collection**
- **Environment**
- **Data**
- **Local**

In this guide, we'll focus on **Environment Variables**. Environment variables are a way to store and reuse values across multiple requests in a collection, which can be particularly useful in our case for storing RPC endpoint URLs, addresses, and other values that are shared across multiple go-quai API requests.

## Environment Variables

The Example Quai Postman Environment includes a small number of pre-defined environment variables that you can use in your requests. These variables include:

- `chain`
- `myAddress`
- `txHash`
- `blockNumber`

:::info
This guide assumes you have already installed Postman and imported the [Example Quai Postman Environment](https://github.com/dominant-strategies/quai-postman-collection). If you have not done so, please refer to the [Setting Up Postman](/develop/go-quai-postman/postman-setup.md#import-environment-variables) guide.
:::

The pre-configured environment variables can be accessed via the `Environment` tab in the top left of the Postman application:

![PostmanEnvironmentVariables](/img/PostmanEnvironmentVariables.png)

To add your own environment variable, simply type your variable name in the `Add new variable` field at the bottom of the list and fill it in with the desired value.

## Chain Specific Variables

Quai Network has [many distinct chains](/develop/networks/#testnet), each with their own [sharded address space](/learn/network/overview#sharded-address-space), state, and unique data. To send a request to a specific chain, you must define the `chain` environment variable with the chain name you want to interact with and ensure that all of the arguments you pass to the request are valid for that chain.

For example, **to request balance data for my address on Cyprus 1**, I need to:

- set the `chain` environment variable to `cyprus1` to route to the Cyprus 1 RPC endpoint
- ensure that the `myAddress` parameter in the request is a valid Cyprus 1 address

If the data passed to the request is not valid on the specified chain, **the request will return an error**.

## Usage

Environment variables can be used in any request by wrapping the variable name in double curly braces (`{{}}`).

For example, **all Quai Postman Collection requests** use a `{{chain}}` variable to specify the chain to request data from in the RPC endpoint URL:

```
https://rpc.{{chain}}.colosseum.quaiscan.io
```

:::info
The `{{chain}}` variable is the only environment variable used by default in all requests. All other variables are optional and can be used as needed.
:::

The same principle applies to any other defined environment variable. For example, if you define the `{{txHash}}` variable with your own transaction hash, you can use it in a request like this:

```json
{
  "jsonrpc": "2.0",
  "method": "quai_getTransactionByHash",
  "params": [
    {{txHash}}
  ],
  "id": 1
}
```

When the request is sent, Postman will automatically replace `{{chain}}` with the value of the `chain` environment variable. You can hover over the `{{}}` to see the resolved value:

![PostmanVariableHover](/img/PostmanVariableHover.png)
