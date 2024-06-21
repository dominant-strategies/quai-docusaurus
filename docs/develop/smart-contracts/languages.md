---
title: Languages
description: Smart contract development languages supported on Quai Network.
sidebar_position: 1
keywords:
  - solidity
  - solidityx
  - smart contract languages
---

## Overview

Quai Network runs a modified Ethereum Virtual Machine environment that provides internal _and_ cross-chain smart contract execution across zone chains in the network. Each chain's EVM is capable of executing smart contracts written in Solidity, SolidityX, and other languages that compile to EVM bytecode.

Generic [Solidity](#solidity) smart contracts can be deployed to any single chain in the network and will function as expected. However, to take full advantage of Quai's cross-chain functionality, developers must use [SolidityX](#solidityx) based smart contracts.

### Choosing Solidity vs SolidityX

There are a few main differences between Solidity and SolidityX that developers should consider when choosing which language to use for smart contract development on Quai Network.

#### Solidity

- **Recommended for developers new to Quai Network**
- Single chain deployments without cross-chain functionality
- Easier to use, deploy, and test + compatible with existing Solidity tooling
- Supports any previously existing Solidity compiler version
- Compatible with existing Solidity contract libraries like [OpenZeppelin](https://www.openzeppelin.com/contracts) and [Solady](https://github.com/Vectorized/solady).
- **Recommended for most use cases**

#### SolidityX

- **Recommended for more advanced developers looking to experiment with cross-chain functionality**
- Enables cross-chain contract deployments
- Requires the [SolidityX compiler](https://github.com/dominant-strategies/SolidityX/releases/tag/0.8.19-solidityx) and additional configuration (can be difficult to set up)
- Not compatible with pre-existing Solidity contract libraries.
- Will be forward compatible with [dynamic scaling events](/learn/advanced-introduction/poem/infinite-execution-shards/dynamic-sharding.mdx)

## Language Details

### Solidity

Solidity is a contract-oriented, high-level programming language for creating smart contracts. It was influenced by C++, Python, and JavaScript and is designed to target the Ethereum Virtual Machine (EVM) environments. Solidity is statically typed, supports inheritance, and libraries. It allows developers to create smart contracts for a wide range of use cases and applications. Key features of Solidity include:

- Complex user-defined types
- Inheritance and complex user-defined contracts
- Error checking, including requirements and assertions
- Support for libraries and user-defined functions
- Strong security features that ensure contract integrity.

#### Example Contract

The Greeter contract shown below is written with [Solidity v0.8.0](https://docs.soliditylang.org/en/v0.8.0/). Greeter serves two functions:

- Store a greeting on-chain.
- Return the greeting when the contract function is called.

It also contains a function for users to set a new greeting of their choice. While the Greeter contract may be simple, it showcases some of the unique functionality that smart contracts offer.

```solidity title="Greeter.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Greeter {
    string private greeting;

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
```

#### Resources

- [Solidity Homepage](https://soliditylang.org/)
- [Solidity Documentation](https://docs.soliditylang.org/en/latest/)
- [GitHub](https://github.com/ethereum/solidity)
- [Examples](https://docs.soliditylang.org/en/latest/solidity-by-example.html)

### SolidityX

SolidityX is a fork of Solidity that adds additional features and functionality to the language. SolidityX is a superset of Solidity, meaning that all Solidity code is valid SolidityX code. _It retains all of the features of Solidity_, while adding support for **Quai Network's cross-chain functionality** natively into the EVM.

The key additions to SolidityX include:

- Support for cross-chain transactions via the [`etx`](/develop/smart-contracts/opcode-additions.md#etx) opcode.
- Support for cross-chain address validation via the [`isaddrInternal`](/develop/smart-contracts/opcode-additions.md#isaddrinternal) opcode.

Additional opcode usage is currently supported via [inline assembly](https://docs.soliditylang.org/en/latest/assembly.html). More details on the usage of `ext` and `isaddrinternal` can be found on the [Opcode Additions page](/develop/smart-contracts/opcode-additions.md).

#### Example Implementation

Below is a simple implementation of the `isaddrinternal` opcode using inline assembly in a QRC20 contract. The function checks whether an address is on the same shard as the deployed contract and then decides whether to execute a local transfer or an external transfer.

```solidity
function transfer(address to, uint256 amount) public payable  returns (bool) {
        bool isInternal;
        assembly {
            isInternal := isaddrinternal(to)  // This opcode returns true if an address is internal
        }
        require(isInternal, "Address is external. Use cross-chain transfer function.");
        _transfer(msg.sender, to, amount);
        return true;
    }
```

#### Resources

- [GitHub](https://github.com/dominant-strategies/SolidityX)
- [QRC-20 Token](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC20X.sol)
- [QRC-721 Token](https://github.com/dominant-strategies/SolidityX-Contracts/blob/main/QRC721X.sol)
- [Opcode Additions](/develop/smart-contracts/opcode-additions.md)

## Alternative Languages

The EVM supports a wide variety of other languages such as [Yul](https://docs.soliditylang.org/en/latest/yul.html) and [Yul+](https://github.com/FuelLabs/yulp), and [Huff](https://docs.huff.sh/tutorial/overview/) through the use of compilers/transpilers. Yul and Huff are lower level languages that offer developers the ability to write assembly-like syntax or direct bytecode.

For any of the above languages to be used on Quai Network, support for Quai's additional EVM opcodes [`isaddrInternal`](/develop/smart-contracts/opcode-additions.md#isaddrinternal) and [`etx`](/develop/smart-contracts/opcode-additions.md#etx) must be added to their respective compilers. More details on using the Quai specific opcodes can be found on the [Opcode Additions page](/develop/smart-contracts/opcode-additions.md). Quai Network is exploring full opcode support for these alternative languages in the future.
