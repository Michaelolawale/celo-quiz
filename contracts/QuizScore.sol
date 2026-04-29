// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract QuizScore {
    mapping(address => uint256) public bestScore;
    event ScoreSubmitted(address indexed player, uint256 score);

    function submitScore(uint256 score) external {
        if (score > bestScore[msg.sender]) {
            bestScore[msg.sender] = score;
        }
        emit ScoreSubmitted(msg.sender, score);
    }
}
