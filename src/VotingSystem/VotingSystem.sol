// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VotingSystem {
    address public owner;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => uint256) public votes;
    uint256 public candidatesCount;
	address public votingToken;
	

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    event VoteEvent (
        uint indexed _candidateId,
		uint indexed numVotes
    );

    event NewCandidate (
        uint indexed _candidateId,
        string _name
    );

    constructor(address _votingToken) {
        owner = msg.sender;
		votingToken = _votingToken;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit NewCandidate(candidatesCount, _name);
    }

    function vote(uint256 _candidateId, uint256 numVotes) public {
        require(numVotes > 0, "Vote must be a positive integer.");
        // Require that the voter has enough voting power
		uint256 votingPower = IERC20(votingToken).balanceOf(msg.sender);
        require(votes[msg.sender] + numVotes <= votingPower, "Insufficient voting power.");

        // Require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Not a valid candidate.");

        // Record the voter has voted
        votes[msg.sender] += numVotes;

        // Update candidate's vote count
        candidates[_candidateId].voteCount += numVotes;

        // Trigger voted event
        emit VoteEvent(_candidateId, numVotes);
    }
}
