require("@nomicfoundation/hardhat-toolbox")
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat:{
      chainId:31337,
    }
  }
};