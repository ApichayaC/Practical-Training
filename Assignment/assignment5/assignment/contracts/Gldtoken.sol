// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol" ;

contract GldToken is ERC20 {
    uint private initialSupply ;
    constructor(uint256 _initialSupply) ERC20("Gold", "GLD") {
        _mint(msg.sender, _initialSupply);
        initialSupply =_initialSupply ;
    }

    function gldToken() public view returns(uint){
        return initialSupply ;
    }
}