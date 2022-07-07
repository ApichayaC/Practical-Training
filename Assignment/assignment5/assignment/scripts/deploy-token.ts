import { ethers } from "hardhat";
import { ACToken } from "../typechain";

async function main() {
    const ACToken = await ethers.getContractFactory("ACToken");
    const acToken = await ACToken.deploy('AC Token', 'ACT') as ACToken;

    await acToken.deployed();

    console.log("address:", acToken.address);

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});