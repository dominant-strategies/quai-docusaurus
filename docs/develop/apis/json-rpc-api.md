---
title: JSON-RPC API
description: Detailed specification of the Quai Network JSON-RPC API.
hide_table_of_contents: false
sidebar_position: 1
---

# JSON-RPC API

## Convenience Libraries

While some developers may opt to interact directly with the JSON-RPC API detailed below, there are also a number of Javascript based convenience libraries designed to make data interaction much easier. Convenience libraries abstract much of the complexity of direct API calls out into simple one-line methods. These methods are also easily portable into decentralized applications and help make backend logic more concise and readable. The primary convenience library used to interact with Quai Network is [quais.js](https://github.com/dominant-strategies/quais-5.js).

A [postman](https://www.postman.com/) library containing templates for all of the RPC methods detailed below is also available at the [Quai API workspace](https://documenter.getpostman.com/view/19820580/2s935iv7GU).

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

- [quai_getBalance](#quai_getbalance)
- [quai_getProof](#quai_getproof)
- [quai_getCode](#quai_getcode)
- [quai_getStorageAt](#quai_getstorageat)
- [quai_call](#quai_call)
- [quai_estimateGas](#quai_estimategas)
- [quai_getTransactionCount](#quai_gettransactioncount)

## Curl Examples

The below section details using the JSON-RPC API to make curl requests to a Quai Network node. Each example includes a description of the endpoint, parameters, return type, and an illustration of its usage.

You might encounter an error message related to the content type, as the --data option sets it to application/x-www-form-urlencoded. To fix this, include -H "Content-Type: application/json" at the start of the call. Note that the examples do not include the full request headers, flags, and URL/IP & port combination, but only the data for simplicity.

A complete curl request including these additional data would look like:

```shell
curl -X POST \
http://127.0.0.1:8512 \
-H 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0", 
    "method": "quai_gasPrice", 
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

- `gasPrice: Quantity` - Current gas price

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

- `maxPriorityFeePerGas: Quantity` - Current maximum priority fee per unit of gas

```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": "0x3b9aca01" // 1000000001
}
```

### quai_feeHistory

Returns the fee history for a specific range of blocks.

#### Input Parameters

- `blockCount: Quantity` - Integer block count to be queried. Maximum value of 1024.
- `blockNumber: Quantity` - Latest integer block number to be queried.
- `rewardPercentiles: Array` - Array of integer reward percentiles. A monotonically increasing list of percentile values to sample from each block's effect priority fees per gas in ascending order, weighted by gas used.

### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_feeHistory",
	"params": ["0x2", "0x8", [2, 4, 6]]
}
```

#### Returns

- `oldestBlock: Quantity` - Integer block number of the most recent block queried.
- `reward: Array` - The requested percentiles of effective priority fees per gas of transactions in each block, sorted in ascending order and weighted by gas used.
- `baseFeePerGas: Array` - Base fee per gas in the given block
- `gasUsedRatio: Array` - gasUsed/gasLimit ratio in the given block

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"oldestBlock": "0x15d",
		"reward": [
			["0x3b9aca00", "0x3b9aca00", "0x3b9aca00"],
			["0x3b9aca00", "0x3b9aca00", "0x3b9aca00"]
		],
		"baseFeePerGas": ["0x12", "0x10", "0x1e"],
		"gasUsedRatio": [0.0441, 0.0023625]
	}
}
```

### quai_syncing

Returns an indicator of whether the client is actively syncing.

:::warning
`quai_syncing` will only return correct data for the Prime chain. If it returns false for Prime, the node is synced in Prime, but may not be synced in all other regions and zones. Always check the sync progress of all chains against the current tip.
:::

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_syncing",
	"params": [],
	"id": 1
}
```

#### Returns

- `syncing: Boolean` - `true` if the client is actively syncing, `false` otherwise.

```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": true
}
```

### quai_chainId

Returns the current chain ID.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_chainId",
	"params": [],
	"id": 1
}
```

#### Returns

- `chainId: Quantity` - The current chain ID.

```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": "0x1"
}
```

### quai_nodeLocation

Returns the current node location or context.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_nodeLocation",
	"params": [],
	"id": 1
}
```

#### Returns

- `location: Quantity` - Array of integers corresponding indicating node location. The first entry indicates the node's region, the second indicates the zone.

```json
{
	"id": 1,
	"jsonrpc": "2.0",
	"result": ["0x1", "0x0"] // [1, 0] or Paxos-1
}
```

### quai_blockNumber

Returns the latest block number.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_blockNumber",
	"params": [],
	"id": 1
}
```

#### Returns

- `blockNumber: Quantity` - Integer number of the most recent block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x2b7"
}
```

### quai_getBalance

Returns the balance of the specified address.

#### Input Parameters

- `address: Data` - 20 bytes, the address to be queried.
- `Quantity | Tag` - Integer block number of [default block parameter](#default-block-parameter).

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getBalance",
	"params": ["0x421bc7323295c6b7f2f75fc4c854d4fb600e69e8", "latest"],
	"id": 1
}
```

#### Returns

- `balance: Quantity` - Integer balance in wei.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x3f28cb71571c7" // 1111111111111111
}
```

### quai_getProof

Returns the Merkle-proof for a given account and optional storage keys.

#### Input Parameters

- `address: Data` - 20 bytes, the address for which the Merkle-Proof is being returned.
- `storageKeys: Array` - Array of 32-byte storage keys.
- `Quantity | Tag` - Integer block number of [default block parameter](#default-block-parameter).

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getProof",
	"params": [
		"0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",
		["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],
		"latest"
	],
	"id": 1
}
```

#### Returns

- `address: Data` - 20 bytes, the address for the proof.
- `accountProof: Array` - RLP-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3(address) as key.
- `balance: Quantity` - Balance in wei.
- `codeHash: Data` - 32 bytes, codeHash of the account.
- `nonce: Quantity` - Nonce of the account.
- `storageHash: Data` - 32 bytes, the SHA3 hash of the `storageRoot`.
- `storageProof: Array`
  - `key: Data` - 32 bytes, the requested storage key.
  - `value: Quantity` - Value(s) of the storage key(s).
  - `proof: Array` - Array of rlp-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the path of the SHA3 (key) as the path.

```json
// Response
{
	"jsonrpc": "2.0",
	"id": "1",
	"result": {
		"address": "0x7f0d15c7faae65896648c8273b6d7e43f58fa842",
		"accountProof": [
			"0xf8518080808080a0c330e7e9f2c4d26b65d6a75253887c5aaf97e0f8d4fca55b9c1b4d258acf69b78080808080808080a0eaa68ff161bff8212a577807d9d5031f7298825a42777c9837dad04d377595d68080",
			"0xf870a03380c7b7ae81a58eb98d9c78de4a1fd7fd9535fc953ed2be602daaa41767312ab84df84b808706943fdbce684ba056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
		],
		"balance": "0x0",
		"codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
		"nonce": "0x0",
		"storageHash": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
		"storageProof": [
			{
				"key": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
				"value": "0x0",
				"proof": []
			}
		]
	}
}
```

### quai_getHeaderHashByNumber

Returns the hash of the block header for a specific block number.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getHeaderHashByNumber",
	"params": ["0x15d"],
	"id": 1
}
```

#### Returns

- `blockHash: Data` - 32 bytes, the hash of the block header.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x0000024ccfb37a6e7ba09a3541c6c1e614e64809cc1b742acad2451e22764d6c"
}
```

### quai_getHeaderByHash

Returns the block header for a specific block hash.

#### Input Parameters

- `blockHash: Data` - 32 bytes, the hash of the block header.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getHeaderByHash",
	"params": ["0x0000024ccfb37a6e7ba09a3541c6c1e614e64809cc1b742acad2451e22764d6c"],
	"id": 1
}
```

#### Returns

`Object` - the block header. All arrays within the object are organized by descending context.

- `baseFeePerGas: Quantity` - The base fee per gas for the block.
- `difficulty: Quantity` - Integer of the difficulty for this block.
- `extRollupRoot: Data` - 32 bytes, hash of all external transactions emitted since the previous coincident block.
- `extTransactionsRoot: Data` - 32 bytes, root of the external transaction trie of each block since the previous coincident block.
- `extraData: Data` - The "extra data" field of this block, contains a byte string.
- `gasLimit: Quantity` - The maximum gas allowed in this block.
- `gasUsed: Quantity` - The total used gas by all transactions in this block.
- `hash: Data` - 32 bytes, the hash of the block header.
- `location: Quantity` - RLP encoded location of the block.
- `manifestHash: []<Data>` - 32 bytes, the hashes of the block manifest for each block.
- `miner: Data` - 20 bytes, the address to whom the mining rewards were paid to.
- `nonce: Data` - 8 bytes, hash of the generated proof-of-work, `null` when the block is pending.
- `number: []<Quantity>` - Integer block numbers with the format [Prime, Region, Zone].
- `parentDeltaS: []<Quantity>` - Change in parent block entropy with the format [Prime, Region, Zone].
- `parentEntropy: []<Quantity>` - Parent block entropy with the format [Prime, Region, Zone].
- `parentHash: Data` - 32 bytes, the hash of the parent block with the format [Prime, Region, Zone].
- `receiptsRoot: Data` - 32 bytes, receipt trie root hash of the block.
- `sha3Uncles: Data` - 32 bytes, SHA3 of the uncles data in the block.
- `stateRoot: Data` - 32 bytes, the root of the final state trie of the block.
- `timestamp: Quantity` - Integer of the unix timestamp for when the block was collated.
- `transactionsRoot: Data` - 32 bytes, the root of the transaction trie of the block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"baseFeePerGas": "0x1",
		"difficulty": "0x16d317",
		"extRollupRoot": "0xaa43773538ebb8494ee7d895d87c114304bc69306c888da2fb40d45d639b2d79",
		"extTransactionsRoot": "0xcde1249dcffdb0ecca318d39cf08a4384767c4956f1b0f323d4ed8dbf50a7b53",
		"extraData": "0xdf8776302e31312e3087676f2d7175616988676f312e32302e36856c696e7578",
		"gasLimit": "0x4c4b400",
		"gasUsed": "0x252ba0",
		"hash": "0x0000085526a97d1b4e1613e3aa7dd01f9cef01525d242a42f203355e8c7dfcb6",
		"location": "0x0000",
		"manifestHash": [
			"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
			"0x4b4e182d76c7a56ca896e8021bb9e1d339498cef5e0f36c0b78efd49406357b1",
			"0x6bdf6d340cce48815db7c19c4d1ea2dcddb235ab09b05a8914748c98af7432cf"
		],
		"miner": "0x05795ed14cdb744781b50d8061a00f42c2124f93",
		"nonce": "0x29c868751a5ec0fc",
		"number": ["0x11", "0x7f", "0x2b5"],
		"parentDeltaS": ["0x0", "0x7582f1cd923e1b7e34d", "0x5980ead1726f9d7639"],
		"parentEntropy": ["0x1c8a963601e57daef58dd", "0x1b12cce80621f70c0af16", "0x1b1864f6b3391e05e254f"],
		"parentHash": [
			"0x0000022550f6aeb9f4db37d54b159bc0812916f246a74909e1b9ce7616d5dd7f",
			"0x000007c122e2cf197cf507062ad9ce285de7273a853226116d38f47466f4c3ad",
			"0x000006a97da5e1cf29f92dbb83df5568132dc9e962106c1fc343d313fc250f46"
		],
		"receiptsRoot": "0x2db04a8f2dcb99b453f3941bdc522d0fcc6cc1e0dd76a8f21d55e97bd1c3804a",
		"sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
		"size": "0x20d",
		"stateRoot": "0x0082f4c0ff72f767dedc1da8033c756ed72c3a8baa0f9b4d7f7bfe9d587d82d4",
		"timestamp": "0x64c7fb18",
		"transactionsRoot": "0x50806865e11d4eb8deecba6cd8b926b7d9c9b85497d78476687ca5577d93d4a2"
	}
}
```

### quai_getHeaderByNumber

Returns the block header for a given block number.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getHeaderByNumber",
	"params": ["0x15d"],
	"id": 1
}
```

#### Returns

- See [quai_getHeaderByHash](#quai_getheaderbyhash)

### quai_getBlockByNumber

Returns the block for a given block number.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.
- `full: Boolean` - If `true`, returns the full transaction objects, if `false` returns the transaction hashes. Defaults to `false`.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getBlockByNumber",
	"params": ["0x15d", true],
	"id": 1
}
```

#### Returns

The response for [`getBlockByNumber`](#quai_blockbynumber) is largely the same as the response for [`getHeaderByHash`](#quai_getheaderbyhash), with the addition of the following fields:

- `extTransactions: []<Data>` - Array of 32 byte external transaction hashes.
- `subManifest: []<Data>` - Array of all 32 byte subordinate block hashes since the last coincident block.
- `transactions: []<Data>` - Array of 32 byter internal transaction hashes.
- `uncles: []<Data>` - Array of **//TODO FIGURE THIS OUT AND GET A BLOCK THAT HAS AN UNCLE**

:::note
`subManifest` will always be empty in zone blocks. Both `transactions` and `extTransactions` will be empty in region and prime blocks.
:::

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"baseFeePerGas": "0x1",
		"difficulty": "0x195a93",
		"extRollupRoot": "0x246f5df00f42ea6c6b3ce50709c1a5ed01effd053be9fd55c8e7a01a5fdd0e75",
		"extTransactions": ["0xf65280bd108ec7aabb32e68b48ad129a6abfff2cdb28d4187c2229dabc7dd9c6"],
		"extTransactionsRoot": "0xc9b954a741c868ee033c7a769470f71779326a46bd654c8248a9a684b03f60f7",
		"extraData": "0xdf8776302e31312e3087676f2d7175616988676f312e32302e36856c696e7578",
		"gasLimit": "0x4c4b400",
		"gasUsed": "0x2e248",
		"hash": "0x0000023ee6f37ecaa871f52068e6c020b899d6bafc6efa7a6ce11a062bd2db2e",
		"location": "0x0000",
		"manifestHash": [
			"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
			"0x89850f64186b9da266bc7675ffc919b348f05e0fde66039d8edcaaa33b527024",
			"0xfcedd8bed59b82a4d43507d15f1e36661644784369c7543d76216fe501222b5c"
		],
		"miner": "0x05795ed14cdb744781b50d8061a00f42c2124f93",
		"nonce": "0x77bbf39f5610b167",
		"number": ["0x9", "0x43", "0x15e"],
		"order": 2,
		"parentDeltaS": ["0x0", "0x5f74cf155fd3b35cae7", "0x45b983cac85b6d849a"],
		"parentEntropy": ["0xdbafb89c01f36e7178f9", "0xc570126e27f3a630caa3", "0xc5b5cbf1f2bc019e4f3d"],
		"parentHash": [
			"0x000004c76cbf7feb9a14344238c3a32010695100130cc699f44eec051999b2d0",
			"0x000002e68ba4766a7fd55f233c676e35b330f168b657a0895264535ac30d652e",
			"0x0000024ccfb37a6e7ba09a3541c6c1e614e64809cc1b742acad2451e22764d6c"
		],
		"receiptsRoot": "0x943ec93fea96d218dbba1f5efb16af09488339c75ee733412c74375972bd9694",
		"sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
		"size": "0x62e",
		"stateRoot": "0x4dcd52b88572709f4f07cfcd80c14b19a26e42d30fdacfb8da74b587a1248114",
		"subManifest": [],
		"timestamp": "0x64c7df3b",
		"totalEntropy": "0xc5cca1261d7817679ecd",
		"transactions": [
			"0x197c7e5ec7bee1a11fd3f45faf55fe2072b5948fe3d8d4bf8bb493458194be50",
			"0x786177297ab60b4da659dafb170f29cde1b7d7173fa6a637895faaba4b5dd379",
			"0x37c915d0321d2cbdbcdd7c337845a1313fa0c57b7935b8b8070745c9328c3468",
			"0xf9a562a193c6b931ee15fce582fa7783bf27d5c45c62d418a329cf106ee4c07f",
			"0x1148714f16086177fc5d08ab00f67b20cf7aadb1eaace0e04b55b2571779c46a",
			"0x7651be3900e0a5c4e35d3af2da38ce2faa0d4ea45f1a75c27ea1d641067f722e",
			"0xbddfe2598d376008adf60c92d1078ef7bffd3eba5170ee5df4509f16f4396d0b",
			"0x83362686984a0d66a656205482ed2fdaa5ea85c4082abd10914ea841731615ca"
		],
		"transactionsRoot": "0xbeb22d0d3169d16dfae20eba72d013a5f21566328298cd5e9a53177197b66f3d",
		"uncles": []
	}
}
```

### quai_getBlockByHash

Returns the block for a given block hash.

#### Input Parameters

- `blockHash: Data` - 32 bytes, the hash of the block header.
- `full: Boolean` - If `true`, returns the full transaction objects, if `false` returns the transaction hashes. Defaults to `false`.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getBlockByHash",
	"params": ["0x0000023ee6f37ecaa871f52068e6c020b899d6bafc6efa7a6ce11a062bd2db2e", true],
	"id": 1
}
```

#### Returns

- See [quai_getBlockByNumber](#quai_getblockbynumber)

### quai_getUncleByBlockNumberAndIndex

Returns the uncle block data for a specific block number and uncle index.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.
- `uncleIndex: Quantity` - Integer uncle index.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getUncleByBlockNumberAndIndex",
	"params": ["0x15d", "0x0"],
	"id": 1
}
```

#### Returns

- See [quai_getBlockByNumber](#quai_getblockbynumber). Uncles do not contain individual transactions.

### quai_getUncleByBlockHashAndIndex

Returns the uncle block data for a specific block hash and uncle index.

#### Input Parameters

- `blockHash: Data` - 32 bytes, the hash of the block header.
- `uncleIndex: Quantity` - Integer uncle index.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getUncleByBlockHashAndIndex",
	"params": ["0x0000023ee6f37ecaa871f52068e6c020b899d6bafc6efa7a6ce11a062bd2db2e", "0x0"],
	"id": 1
}
```

#### Returns

- See [quai_getBlockByHash](#quai_getblockbyhash). Uncles do not contain individual transactions.

### quai_getUncleCountByBlockNumber

Returns the number of uncles for specific block.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getUncleCountByBlockNumber",
	"params": ["0x15d"],
	"id": 1
}
```

#### Returns

- `uncleCount: Quantity` - Integer of the number of uncles in this block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x2"
}
```

### quai_getUncleCountByBlockHash

Returns the number of uncles for a specific block hash.

#### Input Parameters

- `blockHash: Data` - 32 bytes, the hash of the block header.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getUncleCountByBlockHash",
	"params": ["0x0000023ee6f37ecaa871f52068e6c020b899d6bafc6efa7a6ce11a062bd2db2e"],
	"id": 1
}
```

#### Returns

- `uncleCount: Quantity` - Integer number of uncles in this block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x2"
}
```

### quai_getCode

Returns the code stored at a given address.

#### Input Parameters

- `address: Data` - 20 bytes, the address at which the code is stored.
- `Quantity | Tag` - Integer block number of [default block parameter](#default-block-parameter).

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getCode",
	"params": ["0x421bc7323295c6b7f2f75fc4c854d4fb600e69e8", "latest"],
	"id": 1
}
```

#### Returns

- `code: Data` - The code at the given address.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x6080604052348015600f57600080fd5b50607e8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063037a417c14602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b6000600190509056fea165627a7a72305820e710d7394e9965c17ead6bb53757a23caee28d75a0a02b483638015a49dac6070029"
}
```

### quai_getStorageAt

Returns the value from a storage position at a given address.

#### Input Parameters

- `address: Data` - 20 bytes, the address of the storage.
- `position: Data` - Value corresponding to the storage position.
- `Quantity | Tag` - Integer block number of [default block parameter](#default-block-parameter).

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getStorageAt",
	"params": [
		"0x421bc7323295c6b7f2f75fc4c854d4fb600e69e8",
		"0x0000000000000000000000000000000000000000000000000000000000000003",
		"latest"
	],
	"id": 1
}
```

#### Returns

- `storageValue: Data` - The value at the given storage position.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x0000000000000000000000000000000000000000000000000000000000004d2"
}
```

### quai_call

Executes a new message call without creating a transaction on chain.

#### Input Parameters

- `Object` - The transaction call object:
  - `from: Data` - 20 bytes, address the transaction is being sent from. (optional)
  - `to: Data` - 20 bytes, address the transaction is being sent to.
  - `gas: Quantity` - Integer of the gas provided for the transaction execution. (optional)
  - `gasPrice: Quantity` - Integer of the gasPrice used for each paid gas. (optional)
  - `value: Quantity` - Integer of the value sent within the transaction. (optional)
  - `data: Data` - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. (optional)
- `Quantity | Tag` - Integer block number of [default block parameter](#default-block-parameter).

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_call",
	"params": [
		{
			"from": "0x02E4dD4F66E018fD2bddf57467D4bB359D72b705",
			"to": "0x0864B3aab87584b337a92aB1fCfCcf6dad2463Db",
			"gas": "0x5208",
			"value": "0x10F2C",
			"data": "0x"
		},
		"latest"
	],
	"id": 1
}
```

#### Returns

- `callData: Data` - Value of the executed contract method.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x"
}
```

### quai_sendRawTransaction

Creates new message call transaction or a contract creation for signed transactions.

#### Input Parameters

- `transactionData: Data` - Raw bytecode of the signed and serialized transaction.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_sendRawTransaction",
	"params": ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],
	"id": 1
}
```

#### Returns

- `transactionHash: Data` - 32 bytes, the transaction hash, or the zero hash if the transaction is not yet available.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### quai_estimateGas

Computes and returns an estimate of how much gas is required to execute the given transaction. While this method provides a relatively accurate assessment of gas, the correctness of the estimation may vary due to network congestion or node performance.

#### Input Parameters

- See [quai_call](#quai-call) input parameters.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_estimateGas",
	"params": [
		{
			"from": "0x00114a47a5d39ea2022dd4d864cb62cfd16879fc",
			"to": "0x0815543066c60A1dE7F224B940c9EA755fb7aED7",
			"value": "0x10F2C",
			"data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
		},
		"latest"
	],
	"id": 1
}
```

#### Returns

- `gas: Quantity` - Estimated amount of gas required for transaction execution.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x5498"
}
```

### quai_getBlockTransactionCountByNumber

Returns the transaction count in a block given a block number.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getBlockTransactionCountByNumber",
	"params": ["0x15d"],
	"id": 1
}
```

#### Returns

- `transactionCount: Quantity` - Integer number of transactions in this block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x8"
}
```

### quai_getBlockTransactionCountByHash

Returns the transaction count in a block given a block hash.

#### Input Parameters

- `blockHash: Data` - 32 bytes, the hash of the block header.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getBlockTransactionCountByHash",
	"params": ["0x000000ab1cdac1ed32f8fc362664652acbd84e4d82f8ad1cc7b5ac87390a1e9c"],
	"id": 1
}
```

#### Returns

- `transactionCount: Quantity` - Integer number of transactions in this block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x156"
}
```

### quai_getTransactionByBlockNumberAndIndex

Returns transaction data for a given transaction index and block number.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.
- `transactionIndex: Quantity` - Integer transaction index.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getTransactionByBlockNumberAndIndex",
	"params": ["0x2FB", "0x4"],
	"id": 1
}
```

#### Returns

- `blockHash: Data` - 32 bytes, hash of the block the transaction was included in.
- `blockNumber: Quantity` - Integer block number the transaction was included in.
- `from: Data` - 20 bytes, address of the sender.
- `gas: Quantity` - Total integer amount of gas used to execute the transaction in wei.
- `maxFeePerGas: Quantity` - The maximum fee per gas, computed as `baseFeePerGas` + `maxPriorityFeePerGas`.
- `maxPriorityFeePerGas: Quantity` - The maximum priority fee per gas.
- `hash: Data` - 32 bytes, hash of the transaction.
- `input: Data` - The data sent along with the transaction.
- `nonce: Quantity` - Integer of the number of transactions made by the sender prior to this one.
- `to: Data` - 20 bytes, address of the receiver. `null` when the transaction is a contract creation transaction.
- `transactionIndex: Quantity` - Integer of the transaction's index position in the block.
- `value: Quantity` - Integer of the value sent with this transaction in wei.
- `type: Quantity` - Integer of the transaction type.
- `accessList: Array` - Array of access lists. //TODO DEFINE ACCESS LIST SOMEWHERE
- `chainId: Quantity` - Integer of the chain ID this transaction was submitted to, null when its pending.
- `v: Quantity` - ECDSA recovery ID.
- `r: Quantity` - ECDSA signature r.
- `s: Quantity` - ECDSA signature s.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"blockHash": "0x000000ab1cdac1ed32f8fc362664652acbd84e4d82f8ad1cc7b5ac87390a1e9c",
		"blockNumber": "0x2fb",
		"from": "0x18bcfc12f2b9407bce57da68db98da38dee42aba",
		"gas": "0xa410",
		"maxFeePerGas": "0x77359404",
		"maxPriorityFeePerGas": "0x3b9aca00",
		"hash": "0x0d3f1705df59f289e3d8786bfab56d6459e0a43ed0d5aadca699eb91a9e312fd",
		"input": "0x",
		"nonce": "0x24",
		"to": "0x084ef3826dc20f452ebc0d7f228ebf76049669e9",
		"transactionIndex": "0x4",
		"value": "0x22",
		"type": "0x0",
		"accessList": [],
		"chainId": "0x2328",
		"v": "0x0",
		"r": "0x9c648964997efe2be83462387d9f93eeaaa859c5c533b8ff8cc94820dc5034ae",
		"s": "0x75167792deae44fe430328c59a814f4ccb571b5cbabebd1db1c0a3960acfbaf1"
	}
}
```

### quai_getTransactionByBlockHashAndIndex

Returns transaction data for a given transaction index and block hash.

#### Input Parameters

- `blockHash: Data` - 32 bytes, the hash of the block header.
- `transactionIndex: Quantity` - Integer transaction index.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getTransactionByBlockHashAndIndex",
	"params": ["0x000000ab1cdac1ed32f8fc362664652acbd84e4d82f8ad1cc7b5ac87390a1e9c", "0x4"],
	"id": 1
}
```

#### Returns

- See [quai_getTransactionByBlockNumberAndIndex](#quai_gettransactionbyblocknumberandindex)

### quai_getRawTransactionByBlockNumberAndIndex

Returns the raw transaction byte sequence for a given transaction index and block number.

#### Input Parameters

- `blockNumber: Quantity` - Integer block number.
- `transactionIndex: Quantity` - Integer transaction index.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getRawTransactionByBlockNumberAndIndex",
	"params": ["0x2FB", "0x3"],
	"id": 1
}
```

#### Returns

- `rawTransaction: Data` - The raw transaction byte sequence.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x00f86c82232824843b9aca00847735940482a41094111a8a2ffb1729497e0cfbfc5fa2e2b405e13ba74f80c080a01c2ae1b000172a500f1a7e6e9265264d9ba9e9edd835411bf4233f3f2b05c7d9a01f9e48da332873ea7514b5ffa17febd543a7a9d0ef20651a4b14a394c0333837"
}
```

### quai_getRawTransactionByBlockHashAndIndex

Returns the raw transaction byte sequence for a given transaction index and block hash.

#### Input Parameters

- `blockHash: Data` - 32 bytes, the hash of the block header.
- `transactionIndex: Quantity` - Integer transaction index.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getRawTransactionByBlockHashAndIndex",
	"params": ["0x000000ab1cdac1ed32f8fc362664652acbd84e4d82f8ad1cc7b5ac87390a1e9c", "0x3"],
	"id": 1
}
```

#### Returns

- See [quai_getRawTransactionByBlockNumberAndIndex](#quai_getrawtransactionbyblocknumberandindex)

### quai_getTransactionCount

Returns the total transaction count for a give address.

#### Input Parameters

- `address: Data` - 20 bytes, the address of the account.
- `Quantity | Tag` - Integer block number of [default block parameter](#default-block-parameter).

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getTransactionCount",
	"params": ["0x02E4dD4F66E018fD2bddf57467D4bB359D72b705", "latest"],
	"id": 1
}
```

#### Returns

- `transactionCount: Quantity` - Integer of the number of transactions made by the sender.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x357"
}
```

### quai_getTransactionByHash

Returns the transaction data for a given transaction hash.

#### Input Parameters

- `transactionHash: Data` - 32 bytes, the hash of the transaction.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getTransactionByHash",
	"params": ["0xc3b4ce64b533d33d6bbe48219ca980def6f336c263e3f3e1231aac526fc67ea3"],
	"id": 1
}
```

#### Returns

- See [quai_getTransactionByBlockNumberAndIndex](#quai_gettransactionbyblocknumberandindex)

### quai_getRawTransactionByHash

Returns the raw transaction byte sequence for a given transaction hash.

#### Input Parameters

- `transactionHash: Data` - 32 bytes, the hash of the transaction.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "quai_getRawTransactionByHash",
	"params": ["0xc3b4ce64b533d33d6bbe48219ca980def6f336c263e3f3e1231aac526fc67ea3"],
	"id": 1
}
```

#### Returns

- See [quai_getRawTransactionByBlockNumberAndIndex](#quai_getrawtransactionbyblocknumberandindex)

### txpool_content

Returns the current content of the trnasaction pool.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "txpool_content",
	"params": [],
	"id": 1
}
```

#### Returns

- `pending: Object` - Pending transactions.
  - `address: Data` - 20 bytes, the transaction origin address.
    - `nonce: Quantity` - Transaction nonce.
      - `transactionData: Object` - Individual transaction data, see [quai_getTransactionByHash](#quai_gettransactionbyhash) for details.
- `queued: Object` - Queued transactions.
  - `address: Data` - 20 bytes, the transaction origin address.
    - `nonce: Quantity` - Transaction nonce.
      - `transactionData: Object` - Individual transaction data, see [quai_getTransactionByHash](#quai_gettransactionbyhash) for details.

The pending and queued objects contain mappings of origin addresses to batches of transactions. The transaction batches contain mappings of transaction nonces to individual transaction data sets. Below is a simplified representation of the return of this method

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"pending": {
			"0x1dbbB54b402E725aD96fEc342AF5150a1560D4c7": {
				"855": {
					// txdata
				},
				"856": {
					// txdata
				}
			}
		},

		"queued": {
			"0x1dbe6AB96F7fe24634E382FD0e2F17Ddcb0C7A7f": {
				"12": {
					// txdata
				},
				"13": {
					// txdata
				}
			}
		}
	}
}
```

### txpool_contentFrom

Returns transactions in the txpool from the given address, grouped by nonce.

#### Input Parameters

- `address: Data` - 20 bytes, the address of the account.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "txpool_contentFrom",
	"params": ["0x1dbbB54b402E725aD96fEc342AF5150a1560D4c7"],
	"id": 1
}
```

#### Returns

- See [txpool_content](#txpool_content)

### txpool_inspect

Returns a summarized form of the transaction pool content.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "txpool_inspect",
	"params": [],
	"id": 1
}
```

#### Returns

- `pending: Object` - Pending transactions.
  - `address: Data` - 20 bytes, the transaction origin address.
    - `nonce: Quantity` - Transaction nonce.
      - `transactionData: Object` - Summarized transaction data.
- `queued: Object` - Queued transactions.
  - `address: Data` - 20 bytes, the transaction origin address.
    - `nonce: Quantity` - Transaction nonce.
      - `transactionData: Object` - Summarized transaction data.

The pending and queued objects contain mappings of origin addresses to batches of transactions. The transaction batches contain mappings of transaction nonces to summarized transaction data sets.

Summarized transaction data is returned as a string in the following format: "`toAddress`: `gasPrice * gasLimit + maxFeePerGas * gasLimit + value`. Below is a simplified representation of the return of this method

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"pending": {
			"0x1dbbB54b402E725aD96fEc342AF5150a1560D4c7": {
				"855": "0x0",
				"856": "0x0"
			}
		},

		"queued": {
			"0x1dbe6AB96F7fe24634E382FD0e2F17Ddcb0C7A7f": {
				"12": "0x0",
				"13": "0x0"
			}
		}
	}
}
```

### txpool_status

Returns statistics on the current transaction pool.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "txpool_status",
	"params": [],
	"id": 1
}
```

#### Returns

- `pending: Quantity` - Integer number of pending transactions in the pool.
- `queued: Quantity` - Integer number of queued transactions in the pool.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"pending": "0x15",
		"queued": "0x2"
	}
}
```

### net_listening

Returns a boolean indicator of whether client is listening for network connections.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "net_listening",
	"params": [],
	"id": 1
}
```

#### Returns

- `listening: Boolean` - `true` if listening, `false` if not.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": true
}
```

### net_peerCount

Returns the number of peers currently connected to the client.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "net_peerCount",
	"params": [],
	"id": 1
}
```

#### Returns

- `peerCount: Quantity` - Integer number of connected peers.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x2"
}
```

### net_version

Returns the devp2p network ID.

#### Input Parameters

No input `params` are required for this method.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "net_version",
	"params": [],
	"id": 1
}
```

#### Returns

- `version: Quantity` - Integer network ID.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "1"
}
```

### debug_getBlockRlp

Returns the RLP-encoded block at the given height.

#### Input Parameters

- `blockHeight: Quantity` - Integer block height.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "debug_getBlockRlp",
	"params": [236],
	"id": 1
}
```

#### Returns

- `blockRlp: Data` - RLP-encoded block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "f90248f90241f863a000000778118b7ba8d0a469aba75fe4555858073a9c4978ee4438666ac90f764da0000003b7cacf186cea2f461e35e6d07ab9cd2471fff8d3e1dcd05fbbfaab2467a0000006b033056dcc1536c0f7cc147f162d34193a3f4cfe30c04f61bfc1a31e8aa00000004b21fd39375e31bb65c154e664379029a0b2daaca8706a330025f4464ea01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d493479405795ed14cdb744781b50d8061a00f42c2124f93a0928ae2893122e7c2af305e72561d22d6860ce2927416f76ce5d180ec26757572a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421f863a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a00e00f344bb81ee328a3c8423a91766e0f54987c641fb7a5cd5775cb0c1ddecf9a09a016b8b5a148c5512f70d669cab9f52250dce5630b422183fa9aacbcdb5539ea056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421831b2d16e18a8961923f721bfb16f8fe8a7261eb9977af13f1eacc8a72fd96f242af7f00baddd6808a03fcf10c629d51345df7899bab58cb006b0ed011c4063081ec8404c4b40080018200008464d2c493a0df8776302e31312e3087676f2d7175616988676f312e32302e36856c696e7578885ad5129a55c962edc0c0c0c0"
}
```

### debug_printBlock

Retrieves a block and returns its pretty printed form.

#### Input Parameters

- `blockHeight: Quantity` - Integer block height.

:::note
The response of this method is formatted for use in a terminal. To view the response in the proper format, paste the response into a terminal and run the command `echo <response>`.
:::

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "debug_printBlock",
	"params": [236],
	"id": 1
}
```

#### Returns

- `Block: data` - Compact representation of a block.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "(*types.Block)(0xc021a8a9a0)({\n header: (*types.Header)(0xc022209200)({\n  parentHash: ([]common.Hash) (len=3 cap=3) {\n   (common.Hash) (len=32 cap=32) 0x00000778118b7ba8d0a469aba75fe4555858073a9c4978ee4438666ac90f764d,\n   (common.Hash) (len=32 cap=32) 0x000003b7cacf186cea2f461e35e6d07ab9cd2471fff8d3e1dcd05fbbfaab2467,\n   (common.Hash) (len=32 cap=32) 0x000006b033056dcc1536c0f7cc147f162d34193a3f4cfe30c04f61bfc1a31e8a\n  },\n  terminusHash: (common.Hash) (len=32 cap=32) 0x0000004b21fd39375e31bb65c154e664379029a0b2daaca8706a330025f4464e,\n  uncleHash: (common.Hash) (len=32 cap=32) 0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347,\n  coinbase: (common.Address) 0x05795eD14cDB744781B50d8061A00F42c2124f93,\n  root: (common.Hash) (len=32 cap=32) 0x928ae2893122e7c2af305e72561d22d6860ce2927416f76ce5d180ec26757572,\n  txHash: (common.Hash) (len=32 cap=32) 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421,\n  etxHash: (common.Hash) (len=32 cap=32) 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421,\n  etxRollupHash: (common.Hash) (len=32 cap=32) 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421,\n  manifestHash: ([]common.Hash) (len=3 cap=3) {\n   (common.Hash) (len=32 cap=32) 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421,\n   (common.Hash) (len=32 cap=32) 0x0e00f344bb81ee328a3c8423a91766e0f54987c641fb7a5cd5775cb0c1ddecf9,\n   (common.Hash) (len=32 cap=32) 0x9a016b8b5a148c5512f70d669cab9f52250dce5630b422183fa9aacbcdb5539e\n  },\n  receiptHash: (common.Hash) (len=32 cap=32) 0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421,\n  difficulty: (*big.Int)(0xc021a45920)(1781014),\n  parentEntropy: ([]*big.Int) (len=3 cap=3) {\n   (*big.Int)(0xc021a45680)(648764080595408793303294),\n   (*big.Int)(0xc021a456a0)(540156089954153568266956),\n   (*big.Int)(0xc021a456c0)(543027682127159641553629)\n  },\n  parentDeltaS: ([]*big.Int) (len=3 cap=3) {\n   (*big.Int)(0xc021a45700)(0),\n   (*big.Int)(0xc021a45720)(18833048321474415582711),\n   (*big.Int)(0xc021a45740)(2871592173006073286673)\n  },\n  number: ([]*big.Int) (len=3 cap=3) {\n   (*big.Int)(0xc021a458c0)(6),\n   (*big.Int)(0xc021a458e0)(48),\n   (*big.Int)(0xc021a45900)(236)\n  },\n  gasLimit: (uint64) 80000000,\n  gasUsed: (uint64) 0,\n  baseFee: (*big.Int)(0xc021a45940)(1),\n  location: (common.Location) (len=2 cap=2) {\n   00000000  00 00                                             |..|\n  },\n  time: (uint64) 1691534483,\n  extra: ([]uint8) (len=32 cap=32) {\n   00000000  df 87 76 30 2e 31 31 2e  30 87 67 6f 2d 71 75 61  |..v0.11.0.go-qua|\n   00000010  69 88 67 6f 31 2e 32 30  2e 36 85 6c 69 6e 75 78  |i.go1.20.6.linux|\n  },\n  nonce: (types.BlockNonce) (len=8 cap=8) {\n   00000000  5a d5 12 9a 55 c9 62 ed                           |Z...U.b.|\n  },\n  hash: (atomic.Value) {\n   v: (common.Hash) (len=32 cap=32) 0x0000066a8914d4dd81192c8fba4a11a3ee154dadd3306bf97918b3bdafaab4f2\n  },\n  sealHash: (atomic.Value) {\n   v: (common.Hash) (len=32 cap=32) 0x98187a673bd4a0c75c211d6a33441778336151d5e0b25eaa75a5e2e3db9f90f0\n  }\n }),\n uncles: ([]*types.Header) {\n },\n transactions: (types.Transactions) {\n },\n extTransactions: (types.Transactions) {\n },\n subManifest: (types.BlockManifest) {\n },\n size: (atomic.Value) {\n  v: (interface {}) <nil>\n },\n appendTime: (atomic.Value) {\n  v: (interface {}) <nil>\n },\n ReceivedAt: (time.Time) 0001-01-01 00:00:00 +0000 UTC,\n ReceivedFrom: (interface {}) <nil>\n})\n"
}
```

### debug_chaindbProperty

Returns leveldb properties of the key-value database.

#### Input Parameters

- `property: String` - The property to retrieve.

#### Example Request

```json
{
	"jsonrpc": "2.0",
	"method": "debug_chaindbProperty",
	"params": ["leveldb.stats"],
	"id": 1
}
```

#### Returns

- `property: data` - leveldb properties of the key-value database.

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "Compactions\n
	 Level |   Tables   |    Size(MB)   |    Time(sec)  |    Read(MB)   |   Write(MB)\n
	-------+------------+---------------+---------------+---------------+---------------\n
	   0   |          0 |       0.00000 |       4.50687 |       0.00000 |     473.96311\n
	   1   |          0 |       0.00000 |      16.06760 |    1359.03140 |    1320.56856\n
	   2   |        233 |     435.44838 |       6.96471 |     522.37173 |     522.31984\n
	-------+------------+---------------+---------------+---------------+---------------\n
	 Total |        233 |     435.44838 |      27.53918 |    1881.40312 |    2316.85150\n"
}
```
