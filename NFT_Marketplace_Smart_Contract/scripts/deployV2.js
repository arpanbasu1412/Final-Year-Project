const { ethers, upgrades } = require("hardhat");

async function main() {
    const NFT2 = await ethers.getContractFactory("NFT_Marketplace2");
    console.log("Marketplace version 2 is upgrading ... ");
    await upgrades.upgradeProxy("0x856e20637c82CE631372b979266fDC07eb9BB7fa", NFT2);
    console.log("Marketplace version 2 is now on.");
}

main();