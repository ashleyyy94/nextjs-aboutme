// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint public immutable unlockTime;
    address payable public immutable owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        // Using block.timestamp for time locks is common and safe for most use cases
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        // Using block.timestamp for time locks is common and safe for most use cases
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        // Use transfer for maximum safety; only EOAs should be owners
        owner.transfer(address(this).balance);
    }
}
