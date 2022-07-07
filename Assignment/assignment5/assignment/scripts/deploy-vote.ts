import { artifacts, ethers } from "hardhat";
import fs from "fs" ;
import {Vote} from "../typechain";

async function main() {
    const Vote = await ethers.getContractFactory("Vote");
    const vote1 = await Vote.deploy() as Vote;

    await vote1.deployed();

    // const account = await ethers.getSigners();
    //0xD94DB417C0b658C41f6Ba0465Ab8630D8e2dfB95
    console.log("address contract vote :", vote1.address );
    
    // console.log(await vote1.winning());
    
    dataContract(vote1)
}


function dataContract(vote: Vote) {
    const path = __dirname + `/../frontend/src/contracts`;
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
    console.log(path);

    fs.writeFileSync(`${path}/address.json`,
        JSON.stringify({ address: vote.address }, undefined, 2)) //address contract

    fs.writeFileSync(`${path}/abi.json`,
        JSON.stringify(artifacts.readArtifactSync('Vote'), undefined, 2)) // abi in folder's artifact 
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
