// SPDX-License-Identifier: AGPL-1.0
pragma solidity ^0.8.0;

// Import ownable below
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VotingToken is ERC20, Ownable {

	constructor() ERC20("Sk3wl Token", "SKL") {}

	function name() public pure override returns (string memory) {
		return "Sk3wl Token";
	}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}
}
