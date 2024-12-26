import axios from "axios";

const API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;
const GATEWAY = import.meta.env.VITE_PINATA_GATEWAY;


export async function uploadToPinata(file) {
  // if (!file) {
  //   throw new Error("Nenhum arquivo fornecido para upload.");
  // }

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios({
    method: "post",
    url: API_URL,
    data: formData,
    headers: {
      pinata_api_key: API_KEY,
      pinata_secret_api_key: API_SECRET,
      "Content-Type": "multipart/form-data",
    },
  });

  return `https://${GATEWAY}/ipfs/${response.data.IpfsHash}`;
}
