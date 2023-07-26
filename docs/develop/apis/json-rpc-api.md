---
title: JSON-RPC API
description: Detailed specification of the Quai Network JSON-RPC API.
slug: /json-rpc-api
hide_table_of_contents: true
sidebar_position: 1
---

# JSON-RPC API

## Convenience Libraries

While some developers may opt to interact directly with the JSON-RPC API detailed below, there are also a number of Javascript based convenience libraries designed to make data interaction much easier. Convenience libraries abstract much of the complexity of direct API calls out into simple one-line methods. These methods are also easily portable into decentralized applications and help make backend logic more concise and readable. The primary convenience library used to interact with Quai Network is [quais.js](https://qu.ai).

A [postman](https://qu.ai) library containing templates for all of the RPC methods detailed below is also available at the [Quai API workspace](https://qu.ai).

## Conventions

### Hexidecimal Encoding

When making calls to a node, data can be passed or returned in two types via JSON. These types are quantities and unformatted byte arrays. Both utilize hex encoding for compact representation but have slightly different formatting requirements.

#### Quantities

When encoding quantities like numbers and integers, use the following format:

- Encode as a hexadecimal
- Prefix all data with "0x"
- Example: 21000 in decimal is "0x5208"

#### Unformatted Data

To encode unformatted data such as addresses, byte arrays, hashes, etc. - use the folllowing format:

- Encode as a hexadecimal
- Prefix with "0x"
- Two hex digits per byte of data, with an even number of digits only
- Example: hello is encoded as "0x48656C6C6F"

### Default Block Parameter

The default block parameter is an extra parameter that can be passed when querying the state of Quai Network. This parameter allows you to specify a specific block or state of Quai that you would like to receive data from. When not passed in a call, this parameter defaults to the height of the most recent block.

Available options for this parameter are:

- `earliest` - genesis block
- `latest` - most recently mined block
- `pending` - pending state changes
- integer block number

The default block parameter can be passed to the following methods:

- quai_getBalance
- quai_getProof
- quai_getCode
- quai_getStorageAt
- quai_call
- quai_estimateGas
- quai_getTransactionCount

## Curl Examples

The below section details using the JSON-RPC API to make curl requests to a Quai Network node. Each example includes a description of the endpoint, parameters, return type, and an illustration of its usage.

You might encounter an error message related to the content type, as the --data option sets it to application/x-www-form-urlencoded. To fix this, include -H "Content-Type: application/json" at the start of the call. Note that the examples do not include the full request headers, flags, and URL/IP & port combination, but only the data for simplicity.

A complete curl request including these additional data would look like:

```bash
curl -X POST \
http://127.0.0.1:8512 \
-H 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "method": "quai_syncing",
    "params": [],
    "id": 1
}'
```

Depending on the chain you're requesting data from, the port (in the example 8512) the request is being routed to will change.

## JSON-RPC API Methods

### quai_gasPrice

Returns the gas price.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_gasPrice",
	"params": [],
	"id": 1
}
```

#### Returns

`gasPrice: Quantity` - Current gas price

```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": "0x3b9aca01" // 1000000001
}
```

### quai_maxPriorityFeePerGas

Returns the maximum priority fee per unit of gas.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
  "jsonrpc": "2.0",
  "method": "quai_maxPriorityFeePerGas",
  "params": [],
  "id": 1
}
```

#### Returns

`priorityFeePerGas: Quantity` - Current maximum priority fee per unit of gas