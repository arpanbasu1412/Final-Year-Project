const { ethers, upgrades } = require("hardhat");

async function main() {
    const NFT2 = await ethers.getContractFactory("NFT_Marketplace2");
    console.log("Marketplace version 2 is upgrading ... ");
    await upgrades.upgradeProxy("0x98F491E939417b7A9df4c9f1Dd4443c3C72dEB61", NFT2);
    console.log("Marketplace version 2 is now on.");
}

main();