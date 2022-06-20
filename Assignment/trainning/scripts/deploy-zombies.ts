import { ethers } from "hardhat"

async function main (){
    const ZombirFeeding = await ethers.getContractFactory("ZombieFeeding");
    const zombieFeeding = await ZombirFeeding.deploy();

    await zombieFeeding.deployed();

    const receipt = await zombieFeeding.createRandomZombie("xxx").then((tx:any)=>{tx.wait()});

    const newZombieEvent = receipt.events.find(()=>{
        
    })
}