// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Guestbook {
    struct Message {
        address author;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;

    event NewMessage(address indexed author, string content, uint256 timestamp);
    address public immutable owner;
    event TipReceived(address indexed from, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function signGuestbook(string memory content) public payable {
        require(bytes(content).length > 0, "Message cannot be empty");
        require(bytes(content).length <= 280, "Message too long");

        messages.push(Message({
            author: msg.sender,
            content: content,
            timestamp: block.timestamp
        }));

        emit NewMessage(msg.sender, content, block.timestamp);

        if (msg.value > 0) {
            emit TipReceived(msg.sender, msg.value);
        }
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }

    function withdrawTips() public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No tips to withdraw");
        // Use transfer for maximum safety; only EOAs should be owners
        payable(owner).transfer(balance);
    }
}
