import { ethers } from "ethers";
import ABI from "./contractABI.json";

const CONTRACT_ADDRESS = "0xC56A1C96E7687cbA9Ee6A7Ef78B5bF435487094c";

async function getProvider() {
  if (!window.ethereum) throw new Error("No MetaMask found!");

  const provider = new ethers.BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_requestAccounts", []);
  if (!accounts || !accounts.length)
    throw new Error("Wallet not found/allowed!");
  return provider;
}

async function getContractSigner() {
  const provider = await getProvider();
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return contract;
}

async function isOwner() {
  try {
    const contract = await getContractSigner();
    const ownerAddress = await contract.owner();
    const provider = await getProvider();
    const signerAddress = (await provider.getSigner()).getAddress();

    return ownerAddress.toLowerCase() === (await signerAddress).toLowerCase();
  } catch (err) {
    console.error("Erro ao obter owner", err);
    return false;
  }
}

async function addOrganization(address) {
  try {
    const contract = await getContractSigner();
    const tx = await contract.addOrganization(address);
    await tx.wait();
  } catch (err) {
    console.error("Erro ao adicionar a organização", err);
  }
}

async function isAuthorized() {
  try {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const orgAddress = await signer.getAddress();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const isAuthorized = await contract.organizations(orgAddress);
    return isAuthorized;
  } catch (err) {
    console.error("Erro ao verificar organização", err);
    return false;
  }
}

async function issueCertificate(certificateData) {
  try {
    const contract = await getContractSigner();

    const timestamp = new Date(certificateData.issueDate).getTime() / 1000;

    const tx = await contract.generateCertificate(
      certificateData.hash,
      certificateData.recipientName,
      certificateData.certificateTitle,
      certificateData.issuerName,
      timestamp,
      certificateData.fileUrl
    );

    const receipt = await tx.wait();
  } catch (err) {
    console.error("Erro ao gerar certificado:", err);
  }
}

async function isCertificateValid(certificateId) {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const isValid = await contract.isVerified(certificateId);
    return isValid;
  } catch (err) {
    console.error(`Erro ao verificar o certificado ${certificateId}:`, err);
    return false;
  }
}

async function getCertificate(certificateId) {
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const [
      certificate_id,
      candidate_name,
      certification_name,
      org_name,
      emission_date,
      ipfs_hash,
    ] = await contract.getCertificate(certificateId);

    return ipfs_hash;
  } catch (err) {
    console.error(`Erro ao obter certificado ${certificateId}:`, err);
    return false;
  }
}

export {
  addOrganization,
  issueCertificate,
  isCertificateValid,
  isAuthorized,
  isOwner,
  getCertificate,
};
