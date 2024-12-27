const { ethers } = require("hardhat");

async function main() {
    
    const Certification = await ethers.getContractFactory("Certification");
    const certification = await Certification.deploy();

    await certification.waitForDeployment();
    console.log(`Contract deployed to ${certification.target}`);
}

main().catch(error => {
    console.log(error);
    process.exit(1);
})