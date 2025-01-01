import { ethers } from 'ethers';
import ABI from './contractABI.json';

const CONTRACT_ADDRESS = '0xB12f5328bdA49f4F4CBc9285050AdD04E9cb635d';

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

async function issueCertificate(certificateData){
  try {
    const contract = await getContractSigner();

    const timestamp = new Date(certificateData.issueDate).getTime() / 1000;

    const tx = await contract.generateCertificate(
      certificateData.certificateId,
      certificateData.recipientName,
      certificateData.certificateTitle,
      certificateData.issuerName,
      timestamp,
      certificateData.hash
    );

    const receipt = await tx.wait();
    console.log('Certificado gerado com sucesso:', receipt);
    
  } catch (err) {
    console.error('Erro ao gerar certificado:', err);
  }
}

export { addOrganization, issueCertificate };