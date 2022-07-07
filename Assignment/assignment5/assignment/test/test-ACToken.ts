import { ethers } from "hardhat"
import { ACToken } from "../typechain";

describe("ACToken", function(){
    it("Deploy's Token" , async function(){
        const ACToken = await ethers.getContractFactory("ACToken") ;
        const acToken = await ACToken.deploy('AC Token','ACT') as ACToken;

        await acToken.deployed() ;
        
        console.log("Deploy Addr :",acToken.address);
        
    })
})