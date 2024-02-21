const { ethers, upgrades } = require("hardhat");

async function main() {
    const NFT2 = await ethers.getContractFactory("NFT_Marketplace2");
    console.log("Marketplace version 2 is upgrading ... ");
    await upgrades.upgradeProxy("0xDD0824353d5582eaB1D572a326b583c4565EEe13", NFT2);
    console.log("Marketplace version 2 is now on.");
}

main();