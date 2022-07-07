import { ethers } from "hardhat";
import { Vote__factory } from "../typechain";

async function main() {
    const [signer] = await ethers.getSigners(); 
    const claim = Vote__factory.connect("0x650E9961aF353B92021B3D1219e707357dfD53d7",signer);
    // await claim.claimReward();
    console.log(await claim.getClaim());
    
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});