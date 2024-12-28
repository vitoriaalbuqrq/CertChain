const { ethers } = require("hardhat");

async function main() {

    const Certification = await ethers.getContractFactory("Certification");
    const certification = await Certification.deploy();
    
    await certification.waitForDeployment();
    console.log(`Contract deployed to: ${certification.target}`);

    const [owner] = await ethers.getSigners();

    const orgAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    console.log("Dono do contrato:", owner.address);
    
    const contractOwner = await certification.owner();
    if (owner.address === contractOwner) {
        const tx = await certification.addOrganization(orgAddress);
        await tx.wait();
        console.log(`Organização ${orgAddress} adicionada ao contrato.`);
    } else {
        console.log("Apenas o dono do contrato pode adicionar organizações.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
