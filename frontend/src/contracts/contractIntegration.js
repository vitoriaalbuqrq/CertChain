import { ethers } from 'ethers';
import ABI from './contractABI.json';

const CONTRACT_ADDRESS = '0x59a17A7898a47DC83CB4E482EABf7659FBf7eaD7';

//TODO: Remover logs
async function getProvider() {
  if (!window.ethereum) throw new Error('No MetaMask found!');

  const provider = new ethers.BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_requestAccounts", []);
  if (!accounts || !accounts.length) throw new Error('Wallet not found/allowed!');
  return provider;
}

async function getContractSigner() {
  const provider = await getProvider();
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return contract;
}

async function addOrganization(address) {
  try {
    const contract = await getContractSigner();
    const tx = await contract.addOrganization(address);
    await tx.wait();
    console.log('Organização adicionada com sucesso');
  } catch (err) {
    console.error('Erro ao adicionar a organização', err);
  }
}

async function isAuthorized() {
  try {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const orgAddress = await signer.getAddress();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    console.log("endereço da organização", orgAddress);

    const isAuthorized = await contract.organizations(orgAddress);
    return isAuthorized;

  }catch (err){
    console.error('Erro ao verificar organização', err);
    return false;
  }
}

async function issueCertificate(certificateData){
  try {
    const contract = await getContractSigner();

    const timestamp = new Date(certificateData.issueDate).getTime() / 1000;

    const tx = await contract.generateCertificate(
      certificateData.hash,
      certificateData.recipientName,
      certificateData.certificateTitle,
      certificateData.issuerName,
      timestamp,
      certificateData.certificateId
    );

    const receipt = await tx.wait();
    console.log('Certificado gerado com sucesso:', receipt);
    
  } catch (err) {
    console.error('Erro ao gerar certificado:', err);
  }
}


async function isCertificateValid(certificateId){
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const isValid = await contract.isVerified(certificateId);
    console.log('isValid:', isValid);
    return isValid;
  } catch (err) {
    console.error(`Erro ao verificar o certificado ${certificateId}:`, err);
    return false;
  }
}

async function getCertificate(certificateId){
  try {
    const provider = await getProvider();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const certificate = await contract.getCertificate(certificateId);
    return certificate;
  } catch (err) {
    console.error(`Erro ao obter certificado ${certificateId}:`, err);
    return false;
  }
}



export { addOrganization, issueCertificate, isCertificateValid, isAuthorized, getCertificate };