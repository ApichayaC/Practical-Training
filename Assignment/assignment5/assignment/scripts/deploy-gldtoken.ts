import { ethers ,artifacts } from "hardhat";
import fs from 'fs';
import { GldToken } from "../typechain";
async function main() {

    const GldToken = await ethers.getContractFactory("GldToken");
    const gldToken  = await GldToken.deploy() as GldToken ;

    await gldToken.deployed();
    console.log("address : ", gldToken.address)
    dataContract(gldToken)
}

function dataContract(gldToken : GldToken) {
    const path = __dirname + '../frontend/src/contracts';
    if (!fs.existsSync(path))
        fs.mkdirSync(path);

    fs.writeFileSync(`${path}/address.json`,
        JSON.stringify({ address: gldToken.address }, undefined, 2)) //address contract

    fs.writeFileSync(`${path}/abi.json`,
        JSON.stringify(artifacts.readArtifactSync('GLDToken'), undefined, 2)) // abi in folder's artifact 
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

