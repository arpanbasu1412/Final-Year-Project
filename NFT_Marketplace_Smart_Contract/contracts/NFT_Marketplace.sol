// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract NFT_Marketplace is Initializable, ERC721URIStorageUpgradeable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice;

    address payable owner;

    mapping(uint256 => MarketItem) public idMarketItem;

    mapping(uint256 => address[]) private owners;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string link;
        string about;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        string indexed about,
        address owner,
        uint256 indexed price,
        bool sold,
        string link
    );

    modifier ownerOnly() {
        require(msg.sender == owner, "Only owner can change the listing price");
        _;
    }

    // constructor() {
    //     _disableInitializers();
    // }

    function initialize() initializer public {
        __ERC721_init("NFT Metaverse Token", "MYNFT");
        owner == payable(msg.sender);
        listingPrice = 0.0015 ether;
    }

    //To update the listing price for NFT

    function updateListingPrice(uint256 _listingPrice) public payable ownerOnly {
        listingPrice = _listingPrice;
    }

    // To get the listing price for NFT

    function getListingPrice() public view returns (uint256){
        return listingPrice;
    }

    //To get all the owners

    function getAllOwners(uint256 tokenId) public view returns (address[] memory){
        return owners[tokenId];
    }

    function getContractOwner() public view returns (address payable){
        return owner;
    }

    //To create unique ID for every NFT

    function createToken(string memory tokenURI, uint256 price, string memory aboutNFT) public payable returns(uint256){
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price, tokenURI, aboutNFT);

        return newTokenId;
    }

    //Create all the market items

    function createMarketItem(uint256 tokenId, uint256 price, string memory tokenURI, string memory aboutNFT) private {
        require(price > 0, 'Price must be at least 1');
        require(msg.value == listingPrice, 'Price must be equal to listing price');

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            tokenURI,
            aboutNFT
        );

        owners[tokenId].push(msg.sender);

        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(tokenId, msg.sender, aboutNFT, address(this), price, false, tokenURI);
    }

    //Function For Resale Token. To resale the previously bought NFT

    function reSellToken(uint256 tokenId, uint256 price) public payable{
        require(idMarketItem[tokenId].owner == msg.sender, "Only owner can sell this");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    //Function Create Market Sale. The main buying and saling process

    function createMarketSale(uint256 tokenId) public payable{
        uint256 price = idMarketItem[tokenId].price;

        require(msg.value >= price, "Please submit the asking price in order to complete the transaction");

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].seller = payable(msg.sender);

        _itemsSold.increment();

        owners[tokenId].push(msg.sender);

        _transfer(address(this), msg.sender, tokenId);

        payable(idMarketItem[tokenId].seller).transfer((msg.value - listingPrice));
    }

    //Get the unsold NFT Data

    function fetchMarketItem() public view returns(MarketItem[] memory) {
        
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for(uint256 i = 0; i < itemCount; i++){
            if(idMarketItem[i + 1].owner == address(this)){
                uint256 currenntId = i + 1;
                MarketItem storage currentItem = idMarketItem[currenntId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //Purchase Item

    function fetchMyNFT() public view returns(MarketItem[] memory) {
       uint256 totalCount = _tokenIds.current();
       uint256 itemCount = 0;
       uint256 currentIndex = 0;

        for(uint256 i = 0; i < totalCount; i++){
            if(idMarketItem[i + 1].owner == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint256 i = 0; i < totalCount; i++){
            if(idMarketItem[i + 1].owner == msg.sender){
                uint256 currentId =  i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //Single userItems

    function fetchItemsListed() public view returns(MarketItem[] memory){
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i = 0; i < totalCount; i++){
            if(idMarketItem[i + 1].seller == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint256 i = 0; i < totalCount; i++){
            if(idMarketItem[i + 1].seller == msg.sender){
                uint256 currentId = i + 1;

                MarketItem storage currentItem = idMarketItem[currentId];
                 items[currentIndex] = currentItem;
                 currentIndex += 1;
            }
        }
        return items;
    }
}
