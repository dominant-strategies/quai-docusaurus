---
title: Languages
description: Smart contract development languages supported on Quai Network.
slug: /languages
sidebar_position: 2
---

# Languages

## Solidity

Solidity is a contract-oriented, high-level programming language for creating smart contracts. It was influenced by C++, Python, and JavaScript and is designed to target the Ethereum Virtual Machine (EVM) environments. Solidity is statically typed, supports inheritance, and libraries. It allows developers to create smart contracts for a wide range of use cases and applications. Key features of Solidity include:

- Complex user-defined types
- Inheritance and complex user-defined contracts
- Error checking, including requirements and assertions
- Support for libraries and user-defined functions
- Strong security features that ensure contract integrity.

### Example Smart Contract

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

### Resources

- [Solidity Homepage](https://soliditylang.org/)
- [Solidity Documentation](https://docs.soliditylang.org/en/latest/)
- [GitHub](https://github.com/ethereum/solidity)
- [Examples](https://docs.soliditylang.org/en/latest/solidity-by-example.html)

## Alternative Languages

The EVM supports a wide variety of other languages such as [Yul](https://docs.soliditylang.org/en/latest/yul.html) and [Yul+](https://github.com/FuelLabs/yulp), and [Huff](https://docs.huff.sh/tutorial/overview/) through the use of compilers/transpilers. Yul and Huff are lower level languages that offer developers the ability to write assembly-like syntax or direct bytecode.

For any of the above languages to be used on Quai Network, support for Quai's additional EVM opcodes [`isaddrInternal`](./opcode-additions.md#isaddrinternal) and [`etx`](./opcode-additions.md#etx) must be added to their respective compilers. More details on using the Quai specific opcodes can be found on the [Opcode Additions page](./opcode-additions.md). Quai Network is exploring full opcode support for these alternative languages in the future.
