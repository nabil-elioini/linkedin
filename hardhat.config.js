require("@nomicfoundation/hardhat-toolbox");

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
const INFURA_API_KEY = "c1537ec9a6984ff99996dda22768637e";

const GOERLI_PRIVATE_KEY = ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths : {
    artifacts : './src/artifacts'
  },
  networks : {
    hardhat : {
      chainId: 1337,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/ec169a4c87d74503b7f7ea25b439a95e`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
