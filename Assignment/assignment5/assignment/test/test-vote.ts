import { expect } from "chai";
import { ethers } from "hardhat"
import { Vote } from "../typechain";

describe("Voting Test", function () {
    it("Vote success", async function () {
        const Vote = await ethers.getContractFactory("Vote");
        const vote1 = await Vote.deploy() as Vote;

        await vote1.deployed();

        // console.log(await vote1.chairperson());
        // await vote1.vote(1); // default contract deploy account[0]

        //vote
        //array index
        const account = await ethers.getSigners();
        await vote1.connect(account[1]).vote(0);
        await vote1.connect(account[2]).vote(0);
        await vote1.connect(account[3]).vote(1);
        await vote1.connect(account[4]).vote(2);
        await vote1.connect(account[5]).vote(4);

        //show the winner name      
        console.log('The winner is',await vote1.winner());
        console.log('Count :',await vote1.winnerVoteCount());
        console.log('Timestamp :',await vote1.getTimestamp());
        console.log('Reward voter :',await vote1.getReward());
        console.log('Total count :', await vote1.getCandidateCount());
        
        expect(await vote1.winner()).to.equal("Charlotte");
    });
});