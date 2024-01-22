// async function main() {
//   const MyNFT = await ethers.getContractFactory("NFT_Marketplace");

//   // Start deployment, returning a promise that resolves to a contract object
//   const myNFT = await MyNFT.deploy();
//   console.log("Contract deployed to address:", myNFT);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyNFT = await ethers.getContractFactory("NFT_Marketplace");
  console.log("Deploying NFT Marketplace version 1 ...");
  const nft = await upgrades.deployProxy(MyNFT, {
    initializer: "initialize",
  });
  await nft.waitForDeployment();
  console.log("NFT Marketplace deployed address ", await nft.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });