//import { HardhatUserConfig } from "hardhat/config";
require("@nomicfoundation/hardhat-toolbox");

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhattest:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      accounts:{
        mnemonic: process.env.SECRET
      }
    }
  }
};