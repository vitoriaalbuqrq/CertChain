const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const orgAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    const Certification = await ethers.getContractFactory("Certification");
    const certification = await Certification.attach(contractAddress);

    try {
        const isOrg = await certification.organizations(orgAddress);
        console.log(`Is organization authorized: ${isOrg}`);
    } catch (error) {
        console.error("Error calling organizations():", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
