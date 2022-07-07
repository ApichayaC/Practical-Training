import { ethers } from "hardhat";
import { ACToken, IERC20, IERC20__factory } from "../typechain";

async function main() {
    const [signer] = await ethers.getSigners(); 
    const ACToken = IERC20__factory.connect("0xe815b1f49ee8a9662d6d6771c8628354977aE1A4",signer)

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});