const { ethers, upgrades } = require("hardhat");

async function main() {
    const NFT2 = await ethers.getContractFactory("NFT_Marketplacev2");
    console.log("Marketplace version 2 is upgrading ... ");
    await upgrades.upgradeProxy("0xf2f0E62B2F19A30782A1e6a1D666360a551a3B77", NFT2);
    console.log("Marketplace version 2 is now on.");
}

main();