// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const NAME = "JOE";
const CERTIFICATION = "BLOCKCHAIN";
const ORGANIZATION = "HOGWARTS";
const DATE = 12122012;
const HASH = "wieydatrs";

module.exports = buildModule("CertificationModule", (m) => {
    const candidate_name = m.getParameter("candidate_name", NAME);
    const certification_name = m.getParameter("certification_name", CERTIFICATION);
    const org_name = m.getParameter("org_name", ORGANIZATION);
    const emission_date = m.getParameter("emission_date", DATE);
    const ipfs_hash = m.getParameter("ipfs_hash", HASH);

    const certification = m.contract("Certification", [ipfs_hash], {
        value: candidate_name,
        value: certification_name,
        value: org_name,
        value: emission_date,


  });

  return { certification };
});
