const { expect } = require("chai");
const { ethers } = require("hardhat");
require('dotenv').config();

describe("Token contract", function () {
  let hardhatToken;
  let owner;
  let addr1; 
  let addr2;

  beforeEach(async function(){
    [owner, addr1, addr2] = await ethers.getSigners();

    hardhatToken = await ethers.deployContract("NFT_Marketplace");

    await hardhatToken.createToken(process.env.PINATA_FILE_ADDRESS, 10, {
        value: ethers.parseEther("0.0015")
      });
  })

  describe("Deployment", async function(){
    it("Testing the listing price",async function(){
      expect(await hardhatToken.getListingPrice()).to.equal(1500000000000000);
    });
    it("Creating the token", async function(){
      const marketItems = await hardhatToken.fetchMarketItem();
      console.log(marketItems);
      
      const singleUserItem = await hardhatToken.fetchItemsListed();
      console.log(singleUserItem);
    });
    
    it("Buying NFT", async function(){
      await hardhatToken.connect(addr1).createMarketSale(1, {
        value: ethers.parseEther("10.0021")//testing
      });

      await hardhatToken.connect(addr1).reSellToken(1, 100, {
        value: ethers.parseEther("0.0015")
      })

      await hardhatToken.connect(addr2).createMarketSale(1, {
        value: ethers.parseEther("100.0021")
      });

      const owners = await hardhatToken.getAllOwners(1);
      console.log(owners);
    });
  })
});