const hre = require("hardhat");

async function main() {
  const LinkedIn = await hre.ethers.getContractFactory("Linkedin");
  const linkedin = await LinkedIn.deploy();

  await linkedin.deployed();

  console.log("Linkedin deployed to:", linkedin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });