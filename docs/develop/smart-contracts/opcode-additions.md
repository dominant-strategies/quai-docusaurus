---
title: Opcode Additions
description: Specification of the isaddrinternal and etx opcodes additions on Quai Network.
sidebar_position: 3
keywords:
  - solidityx
  - quai virtual machine
  - quai opcodes
  - isaddrinternal
  - etx
---

# Opcode Additions

## What Are EVM Opcodes?

Opcodes are the individual low-level instructions that make up a smart contract on the Ethereum Virtual Machine (EVM). Each opcode corresponds to a specific operation that the EVM can perform, such as adding or comparing values in memory, or interacting with the blockchain. Opcodes are executed one at a time in the order they appear in a contract's bytecode. The set of opcodes available on the EVM is fixed and limited, but they provide a powerful set of building blocks for creating complex smart contracts.

## Quai Specific Opcodes

Quai Network's implementation of the EVM introduces two new opcodes for developers to utilize. The new opcodes are as follows:

- `isaddrinternal` - Checks if provided address is within smart contract's context
- `etx` - Emits an external transaction from the smart contract

Each of these opcodes serve a very specific purpose within Quai Network's VM. isaddrinternal allows smart contracts to determine whether a contract interaction can occur entirely within a single context or whether an ETX needs to occur. Based on the boolean response from isaddrinternal, a smart contract can continue on as normal with a local interaction, or can emit an ETX using the etx opcode.

## Implementation

### Inline Assembly

Solidity does not currently have native compiler support for Quai's additional opcodes that provide cross-chain functionality, but it does have support for [inline assembly usage](https://docs.soliditylang.org/en/latest/assembly.html).

Inline assembly is typically implemented by developers for more fine-grained control over your contract. In the context of Quai, we can use it to directly call opcodes inside of contracts via Yul and Assembly. This allows us to maintain the same general structure as traditional Solidity based contract while implementing simple assembly to provide functionality for Quai specific utilities.

Inline assembly within Solidity is generally straightforward as you can access your contract's variables via normal methods and insert directly into assembly. The syntax for inserting assembly into your contract is as follows:

```solidity
function doSomethingWithAssembly() {
    assembly {...}
}
```

More information on case specific syntax, usage and conventions can be found on the Solidity [inline assembly page](https://docs.soliditylang.org/en/latest/assembly.html).

## Examples

### isaddrinternal

As mentioned above, the `isaddrinternal` opcode is used to verify that an address is within a specific chain's scope. It is most often used in contracts to determine whether the contract should initiate a traditional in-scope transaction or opt for an external transaction.

Below is a simple implementation of the opcode in a ERC20 smart contract:

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

The `transfer` function handles token transfers between two wallets. Inline assembly and the `isaddrinternal` opcode are used to verify that an address is internal.

If the check returns true, the function executes the transfer normally. If the check returns false, the transfer is not executed and the user is directed to utilize another function to complete a cross-chain transfer.

### etx

External transactions, also called a cross-chain transfers, can be initiated by smart contract via the `etx` opcode.

A basic example of `etx` implementation in the same ERC20 contract from the isaddrinternal can be seen below. The `crossChainTransfer` function should be called if the check inside of transfer returns false.

```solidity
/**
* This function sends tokens to an address on another chain by creating an external transaction (ETX).
* This function uses opETX which constructs an external transaction and adds it to the block.
* The ETX will make its way over to the destination and automatically execute when the given base fee is correct.
* `to` must be an address on a different chain. The chain of a given address is determined by the first byte of the address.
* gasLimit, minerTip and basefee are for executing the transaction on the destination chain. Choose these carefully.
* The base fee and miner tip are in Wei and may not be the same as they are on your current chain.
* If the base fee or miner tip are too low, the ETX will wait in the destination chain until they are high enough to be added in a block.
* You must send a value with the function call equal to the following amount: (baseFee + minerTip) * gasLimit
*/
function crossChainTransfer(address to, uint256 amount, uint256 gasLimit, uint256 minerTip, uint256 baseFee) public payable {
        bool isInternal;
        assembly {
            isInternal := isaddrinternal(to) // This opcode returns true if an address is internal
        }
        require(!isInternal, "Address is not external");

        _burn(msg.sender, amount);
        address toAddr = ApprovedAddresses[getAddressLocation(to)];
        uint totalGas = (baseFee + minerTip) * gasLimit;
        require(msg.value  >= totalGas, string(abi.encodePacked("Not enough gas sent, need at least ", uint2str(totalGas), " wei")));
        bytes memory encoded = abi.encodeWithSignature("incomingTransfer(address,uint256)", to, amount);
        bool success;                                       // this is not used. opETX only returns false if there was an error in creating the ETX, not executing it.
        assembly {
            success := etx(
                0,                                          // temp variable, can be anything (unused)
                toAddr,                                     // address to send to
                0,                                          // amount to send in wei
                gasLimit,                                     // gas limit (entire gas limit will be consumed and sent to destination)
                minerTip,                                     // miner tip in wei
                baseFee,                                      // base fee in wei
                add(encoded, 0x20),                                          // input offset in memory (the first 32 byte number is just the size of the array)
                mload(encoded),                                          // input size in memory (loading the first number gives the size)
                0,                                          // accesslist offset in memory
                0                                           // accesslist size in memory
            )
        }
        emit ExternalTransfer(msg.sender, to, amount);
}
```

`crossChainTransfer` utilizes an initial check to ensure that the destination is address is outside of the current context scope. The contract then executes in this fashion:

1. Burns the provided `amount` of tokens on the origin chain.
2. Sets the `toAddr` to the public key of a sister contract on the destination chain.
3. Calculates the `totalGas` provided by the user _and_ checks that the provided gas is sufficient to execute the transaction.
4. Encodes the transaction data being sent to the destination chain into `encoded`.
5. Constructs the external transaction using the `etx` opcode via inline assembly.
6. Emits the transaction from the contract to be mined on the origin chain and routed to the destination chain.

## Conclusion

The `isaddrinternal` and `etx` opcodes provide key cross-chain functionality to smart contracts deployed on Quai Network. They provide the basis for contracts in different contexts to communicate and interact with each other in a trustless fashion and allow developers to create multi-chain applications that span the entire network.
