require("@nomicfoundation/hardhat-toolbox")
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat:{
      chainId: 31337
    },
    // sepolia:{
    //   url: process.env.URL_RPC,
    //   chain: process.env.CHAIN_ID,
    //   accounts:{
    //     mnemonic: process.env.SECRET
    //   },
    // }
  }
};