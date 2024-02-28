const { ethers, upgrades } = require("hardhat");

async function main() {
    const NFT4 = await ethers.getContractFactory("NFT_Marketplace4");
    console.log("Marketplace version 4 is upgrading ... ");
    await upgrades.upgradeProxy("0xDD0824353d5582eaB1D572a326b583c4565EEe13", NFT4);
    console.log("Marketplace version 4 is now on.");
}

main();