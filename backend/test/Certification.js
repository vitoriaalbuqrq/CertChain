const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certification", function () {
    let Certification;
    let certification;
    let owner;
    let organization1;
    let organization2;
    let candidate1;
    let certificateId = "Cert123";

    beforeEach(async function () {
        [owner, organization1, organization2, candidate1] = await ethers.getSigners();

        Certification = await ethers.getContractFactory("Certification");
        certification = await Certification.deploy();
        await certification.waitForDeployment();
    });

    describe("Organization Management", function () {
        it("Deve permitir ao proprietário adicionar uma organização", async function () {
            await certification.addOrganization(organization1.address);
            expect(await certification.organizations(organization1.address)).to.be.true;
    });

        it("Deve permitir ao proprietário remover uma organização", async function () {
            await certification.addOrganization(organization1.address);
            await certification.removeOrganization(organization1.address);
            expect(await certification.organizations(organization1.address)).to.be.false;
    });

        it("Deve bloquear uma organização não autorizada de gerar certificados", async function () {
            await expect(
                certification.connect(organization2).generateCertificate(
                    certificateId,
                    "Candidate 1",
                    "Blockchain Certificate",
                    "Organization 2",
                    1634567890,
                    "QmExampleHash"
                )
            ).to.be.revertedWith("Only authorized organizations can generate certificates");
        });
    });

    describe("Certificate Management", function () {
        beforeEach(async function () {
            await certification.addOrganization(organization1.address);
        });

        it("Deve gerar um certificado corretamente", async function () {
            const ipfsHash = "QmExampleHash";
            const emissionDate = 1634567890;

            await certification.connect(organization1).generateCertificate(
                certificateId,
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                emissionDate,
                ipfsHash
            );

            const cert = await certification.getCertificate(certificateId);
            expect(cert[0]).to.equal("Cert123");
            expect(cert[1]).to.equal("Candidate 1");
            expect(cert[2]).to.equal("Blockchain Certificate");
            expect(cert[3]).to.equal("Organization 1");
            expect(cert[4]).to.equal(emissionDate);
            expect(cert[5]).to.equal(ipfsHash);
        });

        it("Deve evitar a criação de um certificado com um ID duplicado", async function () {
            const ipfsHash = "QmExampleHash";
            const emissionDate = 1634567890;

            await certification.connect(organization1).generateCertificate(
                certificateId,
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                emissionDate,
                ipfsHash
        );

        await expect(
            certification.connect(organization1).generateCertificate(
                certificateId,
                "Candidate 2",
                "Blockchain Certificate",
                "Organization 1",
                emissionDate,
                ipfsHash
            )
        ).to.be.revertedWith("Certificate with this ID already exists");
    });
    
    it("Deve impedir que não-proprietários adicionem organizações", async function () {
        await expect(
            certification.connect(organization1).addOrganization(organization2.address)
        ).to.be.revertedWith("Only the owner can add organizations");
    });
    
    it("Deve impedir que não-proprietários removam organizações", async function () {
        await certification.addOrganization(organization1.address);
        await expect(
            certification.connect(organization1).removeOrganization(organization1.address)
        ).to.be.revertedWith("Only the owner can remove organizations");
    });
    
    it("Deve lançar erro ao buscar um certificado inexistente", async function () {
        await expect(certification.getCertificate("invalidId"))
            .to.be.revertedWith("Certificate with this ID does not exist");
    });
    
    it("Deve emitir evento ao gerar um certificado", async function () {
        await expect(
            certification.connect(organization1).generateCertificate(
                certificateId,
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                1634567890,
                "QmExampleHash"
            )
        ).to.emit(certification, "certificateGenerated").withArgs(certificateId);
    });

    it("Deve retornar falso para um ID de certificado inexistente", async function () {
        const isVerified = await certification.isVerified("invalidId");
        expect(isVerified).to.be.false;
    });
    
    it("Deve permitir a emissão de múltiplos certificados por diferentes organizações", async function () {
        const ipfsHash1 = "QmHash1";
        const ipfsHash2 = "QmHash2";
    
        await certification.addOrganization(organization2.address);
    
        await certification.connect(organization1).generateCertificate(
            "cert1",
            "Candidate 1",
            "Certificate 1",
            "Organization 1",
            1634567890,
            ipfsHash1
        );
    
        await certification.connect(organization2).generateCertificate(
            "cert2",
            "Candidate 2",
            "Certificate 2",
            "Organization 2",
            1634567890,
            ipfsHash2
        );
    
        const cert1 = await certification.getCertificate("cert1");
        const cert2 = await certification.getCertificate("cert2");
    
        expect(cert1[0]).to.equal("cert1");
        expect(cert1[1]).to.equal("Candidate 1");
        expect(cert2[0]).to.equal("cert2");
        expect(cert2[1]).to.equal("Candidate 2");
    });

    it("Deve lidar com adições e remoções repetidas sem erro", async function () {
        await certification.addOrganization(organization1.address);
        await certification.removeOrganization(organization1.address);
    
        await certification.addOrganization(organization1.address);
        expect(await certification.organizations(organization1.address)).to.be.true;
    
        await certification.removeOrganization(organization1.address);
        expect(await certification.organizations(organization1.address)).to.be.false;
    });
    
    it("Deve impedir a criação de certificado com campos vazios ou inválidos", async function () {
        await certification.addOrganization(organization1.address);

        await expect(
            certification.connect(organization1).generateCertificate(
                "", 
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                1634567890,
                "QmExampleHash"
            )
        ).to.be.revertedWith("Certificate ID cannot be empty");
    
        await expect(
            certification.connect(organization1).generateCertificate(
                "cert123",
                "",
                "Blockchain Certificate",
                "Organization 1",
                1634567890,
                "QmExampleHash"
            )
        ).to.be.revertedWith("Candidate name cannot be empty");
    
        await expect(
            certification.connect(organization1).generateCertificate(
                "cert123",
                "Candidate 1",
                "",
                "Organization 1",
                1634567890,
                "QmExampleHash"
            )
        ).to.be.revertedWith("Certification name cannot be empty");
    
        await expect(
            certification.connect(organization1).generateCertificate(
                "cert123",
                "Candidate 1",
                "Blockchain Certificate",
                "",
                1634567890,
                "QmExampleHash"
            )
        ).to.be.revertedWith("Organization name cannot be empty");
    
        await expect(
            certification.connect(organization1).generateCertificate(
                "cert123",
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                0,
                "QmExampleHash"
            )
        ).to.be.revertedWith("Emission date must be valid");
    
        await expect(
            certification.connect(organization1).generateCertificate(
                "cert123",
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                1634567890,
                ""
            )
        ).to.be.revertedWith("IPFS hash cannot be empty");
    });

    it("Deve impedir uma organização removida de gerar certificados", async function () {
        await certification.addOrganization(organization1.address);
        await certification.removeOrganization(organization1.address);
    
        await expect(
            certification.connect(organization1).generateCertificate(
                certificateId,
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                1634567890,
                "QmExampleHash"
            )
        ).to.be.revertedWith("Only authorized organizations can generate certificates");
    });
    

        // se o de baixo passa esse também passaria, redundante?
        it("Deve verificar se o certificado foi emitido", async function () {
            const ipfsHash = "QmExampleHash";
            const emissionDate = 1634567890;

            await certification.connect(organization1).generateCertificate(
                certificateId,
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                emissionDate,
                ipfsHash
            );

            const isVerified = await certification.isVerified(certificateId);
            expect(isVerified).to.be.true;
        });

        it("Deve retornar os dados corretos do certificado", async function () {
            const ipfsHash = "QmExampleHash";
            const emissionDate = 1634567890;

            await certification.connect(organization1).generateCertificate(
                certificateId,
                "Candidate 1",
                "Blockchain Certificate",
                "Organization 1",
                emissionDate,
                ipfsHash
            );

            const cert = await certification.getCertificate(certificateId);
            expect(cert[0]).to.equal("Cert123");
            expect(cert[1]).to.equal("Candidate 1");
            expect(cert[2]).to.equal("Blockchain Certificate");
            expect(cert[3]).to.equal("Organization 1");
            expect(cert[4]).to.equal(emissionDate);
            expect(cert[5]).to.equal(ipfsHash);
        });
    });
});