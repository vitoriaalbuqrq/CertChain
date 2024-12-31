const { ethers } = require("hardhat");

async function main() {
    const [deployer, organization] = await ethers.getSigners();
    const orgAddress = organization.address;
    // console.log("Dono do contrato (Hardhat):", deployer.address);
    // console.log("Conta da Organização (MetaMask):", orgAddress);
    // const balance = await ethers.provider.getBalance(deployer.address);
    // console.log("Raw balance (in Wei):", balance);
    // const balanceOrg = await ethers.provider.getBalance(organization.address);
    // console.log("Raw balance for Organization(in Wei):", balanceOrg);

    let Certification = await ethers.getContractFactory("Certification");
    const certification = await Certification.deploy();
    console.log("Contrato implantado no endereço:", certification.target);

    console.log("Adicionando organização...");
    const tx = await certification.addOrganization(orgAddress);
    await tx.wait();
    console.log("Organização adicionada com sucesso.");

    const isAuthorized = await certification.organizations(orgAddress);
    console.log("Organização está autorizada?", isAuthorized);

    const certificateId = tx.to;
    const candidateName = "John Doe";
    const certificationName = "Blockchain Developer";
    const orgName = "MetaOrganization";
    const emissionDate = Date.now();
    const ipfsHash = "Qm...";

    console.log("Gerando certificado pela organização...");

    const generateTx = await certification.connect(organization).generateCertificate(
        certificateId, candidateName, certificationName, orgName, emissionDate, ipfsHash
    );
    await generateTx.wait();
    
    console.log("Certificado gerado com sucesso.");

    const certificate = await certification.getCertificate(certificateId);
    console.log("Certificado:", certificate);

    const balanceOut = await ethers.provider.getBalance(deployer.address);
    console.log("Raw balance (in Wei):", balanceOut);
    const balanceOrgOut = await ethers.provider.getBalance(organization.address);
    console.log("Raw balance for Organization(in Wei):", balanceOrgOut);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
