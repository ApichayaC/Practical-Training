//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vote {

    struct Candidate{
        string name ;
        uint voteCount;
    }

    struct Voter {
        bool voted ; // check
        uint vote ;
    }

    address public chairperson ; // deploy smart contract person

    mapping (address=> Voter) public voters ;
    Candidate[] public candidates ;

    uint public candidateCount ;

    string[] public candidateNames = ["Charlotte","Engfa","Marima","Prada","Heidi"] ;

    address public rewardToken = 0x0b31df134fd5e61ce077725eB71DD5d1809c478a ;
    
    uint public constant voterReward = 10 * 10**18 ;

    uint public timestamp = block.timestamp + 1 days;

    constructor(){
        chairperson = msg.sender ; // addr deploy
        candidateCount = candidateNames.length ;
        for (uint i=0 ; i< candidateCount ; i++){
            candidates.push(
                Candidate({name : candidateNames[i] , voteCount: 0})
            );
        }
    }

    function getTimestamp () public view returns(uint){
        return timestamp ;
    }

    function getReward() public pure returns(uint){
        return voterReward ;
    }

    function getCandidateCount() public view returns(uint){
        return candidateCount ;
    }

    function claimReward () external{
        require(block.timestamp > timestamp,"Time out");
        Voter memory sender = voters[msg.sender] ; 
        //addr index
        Candidate memory addrCandidate = candidates[sender.vote] ;

        uint reward = voterReward/addrCandidate.voteCount ;
        require(sender.vote==winning(),"Check Address Voter");
        IERC20(rewardToken).transfer(msg.sender, reward);
    }

    function getClaim () external view returns(uint256){
        return IERC20(rewardToken).balanceOf(address(this));
    }


    function vote (uint candidate) public {
        require(block.timestamp < timestamp,"Time out");
        Voter storage sender = voters[msg.sender] ; // addr voter
        require(!sender.voted,"Already voted");
        sender.voted = true ;
        sender.vote = candidate ; //index
        candidates[candidate].voteCount++ ;
        // IERC20(rewardToken).transferFrom(msg.sender,address(this), amount); 
    }

    function winning () public view returns (uint winning_){
        uint winningVoteCount = 0 ;
        for (uint i=0 ; i< candidates.length ; i++){
            if(candidates[i].voteCount > winningVoteCount){
                winningVoteCount = candidates[i].voteCount ;
                winning_ = i ;
            }
        }
        return winning_ ;
    }
    
    function winner() public view returns(string memory){
        return candidates[winning()].name ;
    }

    function winnerVoteCount() public view returns(uint){ 
        return candidates[winning()].voteCount ;
    }

}