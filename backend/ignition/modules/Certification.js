const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const CertificationModule = buildModule("CertificationModule", (m) => {
  const certification = m.contract("Certification", []); 

  return { certification }; 
});

module.exports = CertificationModule;
