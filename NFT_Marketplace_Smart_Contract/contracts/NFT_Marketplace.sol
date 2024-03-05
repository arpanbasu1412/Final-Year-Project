// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract NFT_Marketplace is Initializable, ERC721URIStorageUpgradeable {
    // using Counters for Counters.Counter;

    // Counters.Counter public _tokenIds;
    // Counters.Counter public _itemsSold;

    // bool public isInitialized = false;

    uint public _tokenIds;
    uint public _itemsSold;

    uint256 private listingPrice;

    // uint sample;

    address payable owner;

    mapping(uint256 => MarketItem) public idMarketItem;

    mapping(uint256 => address[]) public owners;

    mapping(address => mapping(string => uint)) public recomendation;

    mapping (address => string) private mostNFTS;
    
    // address payable public highestBiddder;
    
    // string[6] private genre;
    
    mapping (uint => mapping (address => uint)) public bids;

    mapping (uint => mapping (uint => address)) public bidsAddresses;

    mapping (uint => bool) public auctionHappend;

    // uint public highestPayableBid;

    uint public bidInc;

    // struct MostViewed{
    //     string about;
    //     uint count;
    // }

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string link;
        string about;
        // bool auctionState;
        uint endTime;
        address payable highestBiddder;
        uint highestPayableBid;
        uint bidCount;
    }

    // event idMarketItemCreated(
    //     uint256 indexed tokenId,
    //     address seller,
    //     string indexed about,
    //     address owner,
    //     uint256 indexed price,
    //     bool sold,
    //     string link
    // );

    // modifier ownerOnly() {
    //     require(msg.sender == owner, "Only owner can change the listing price");
    //     _;
    // }

    // constructor() {
    //     _disableInitializers();
    // }

    function initialize(uint listPrice) initializer public {
        __ERC721_init("NFT Metaverse Token", "MYNFT");
        owner = payable(msg.sender);
        listingPrice = listPrice;
        // genre = ["gaming", "horror", "monkey", "anime", "art", "movie"];
        bidInc = 1000000000000000000;
    }

    //To update the listing price for NFT

    // function updateListingPrice(uint256 _listingPrice) public payable ownerOnly {
    //     listingPrice = _listingPrice;
    // }

    // To get the listing price for NFT

    // function getListingPrice() public view returns (uint256){
    //     return listingPrice;
    // }

    //To get all the owners

    function getAllOwners(uint256 tokenId) public view returns (address[] memory){
        return owners[tokenId];
    }

    //To show what genre the customer ownes most

    function getMaxNFTData(address visitor) public view returns (string memory) {
        return mostNFTS[visitor];
    }

    //To show the actual owner of the contract

    // function getContractOwner() public view returns (address payable){
    //     return owner;
    // }

    // function getGenre() public view returns(string[6] memory){
    //     return genre;
    // }

    //To create unique ID for every NFT

    function createToken(string memory tokenURI, uint256 price, string memory aboutNFT) external payable returns(uint256){
        _tokenIds++;

        uint256 newTokenId = _tokenIds;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price, tokenURI, aboutNFT);

        return newTokenId;
    }

    //Create all the market items

    function createMarketItem(uint256 tokenId, uint256 price, string memory tokenURI, string memory aboutNFT) private {
        require(price > 0 && msg.value == listingPrice && checkIfAboutIsCorrect(string(aboutNFT)));

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            tokenURI,
            aboutNFT,
            // false,
            block.timestamp,
            payable(address(0)),
            0,
            0
        );

        owners[tokenId].push(msg.sender);

        _transfer(msg.sender, address(this), tokenId);

        // emit idMarketItemCreated(tokenId, msg.sender, aboutNFT, address(this), price, false, tokenURI);
    }

    //Function For Resale Token. To resale the previously bought NFT

    function reSellToken(uint256 tokenId, uint256 price) public payable{
        require(idMarketItem[tokenId].owner == msg.sender && msg.value == listingPrice);
        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));
        // idMarketItem[tokenId].auctionState = false;

        _itemsSold--;

        recomendation[msg.sender][idMarketItem[tokenId].about] -= 1;

        calculateHighestNFT(msg.sender);

        _transfer(msg.sender, address(this), tokenId);
    }

    //Function Create Market Sale. The main buying and saling process

    function createMarketSale(uint256 tokenId) public payable{
        uint256 price = idMarketItem[tokenId].price;

        require(msg.value == (price + listingPrice));

        // idMarketItem[tokenId].seller.transfer(msg.value);

        // idMarketItem[tokenId].owner = payable(msg.sender);
        // idMarketItem[tokenId].sold = true;
        // idMarketItem[tokenId].seller = payable(msg.sender);

        // _itemsSold.increment();

        // owners[tokenId].push(msg.sender);

        // recomendation[msg.sender][idMarketItem[tokenId].about] += 1;

        // calculateHighestNFT(msg.sender);

        // _transfer(address(this), msg.sender, tokenId);

        buyNFT(tokenId, payable(msg.sender), price);
    }

    function buyNFT(uint tokenId, address payable newOwner, uint value) public {

        idMarketItem[tokenId].seller.transfer(value);

        idMarketItem[tokenId].owner = newOwner;
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].seller = newOwner;

        _itemsSold++;

        owners[tokenId].push(newOwner);

        recomendation[newOwner][idMarketItem[tokenId].about] += 1;

        calculateHighestNFT(newOwner);

        _transfer(address(this), newOwner, tokenId);
    }

    //Get the unsold NFT Data

    function fetchMarketItem() public view returns(MarketItem[] memory) {
        
        uint256 itemCount = _tokenIds;
        uint256 unsoldItemCount = _tokenIds - _itemsSold;
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
       uint256 totalCount = _tokenIds;
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

    // function fetchItemsListed() public view returns(MarketItem[] memory){
    //     uint256 totalCount = _tokenIds.current();
    //     uint256 itemCount = 0;
    //     uint256 currentIndex = 0;

    //     for(uint256 i = 0; i < totalCount; i++){
    //         if(idMarketItem[i + 1].seller == msg.sender){
    //             itemCount += 1;
    //         }
    //     }

    //     MarketItem[] memory items = new MarketItem[](itemCount);

    //     for(uint256 i = 0; i < totalCount; i++){
    //         if(idMarketItem[i + 1].seller == msg.sender){
    //             uint256 currentId = i + 1;

    //             MarketItem storage currentItem = idMarketItem[currentId];
    //              items[currentIndex] = currentItem;
    //              currentIndex += 1;
    //         }
    //     }
    //     return items;
    // }

    //This function calculates the type of NFT that a customer ownes most

    function calculateHighestNFT(address visitor) internal{
        string[6] memory tempGenre = ["gaming", "horror", "monkey", "anime", "art", "movie"];
        uint max = 0;
        string memory maxGenre;
        for(uint i = 0; i < tempGenre.length; i++){
            uint temp = recomendation[visitor][tempGenre[i]];
            if(temp > max){
                max = temp;
                maxGenre = tempGenre[i];
            }
        }
        mostNFTS[visitor] = maxGenre;
    }

    //This function checks if the customer gives the name of the genre correct

    function checkIfAboutIsCorrect(string memory aboutNFT) private pure returns(bool){
        string[6] memory tempGenre = ["gaming", "horror", "monkey", "anime", "art", "movie"];
        for(uint i = 0; i < tempGenre.length; i++){
            if(keccak256(abi.encodePacked(aboutNFT)) == keccak256(abi.encodePacked(tempGenre[i]))){
                return true;
            }
        }
        return false;
    }

    //This function is used to end auction for a particular NFT

    function EndAuc(uint tokenId) public{

        // address payable newOwner = idMarketItem[tokenId].highestBiddder;
        // uint price = idMarketItem[tokenId].highestPayableBid;

        require(block.timestamp > idMarketItem[tokenId].endTime && msg.sender == idMarketItem[tokenId].seller);

        // idMarketItem[tokenId].auctionState = false;

        finalizeBid(tokenId);

        // idMarketItem[tokenId].seller.transfer(idMarketItem[tokenId].highestPayableBid);

        // idMarketItem[tokenId].owner = payable(idMarketItem[tokenId].highestBiddder);

        // idMarketItem[tokenId].sold = true;

        // idMarketItem[tokenId].seller = payable(idMarketItem[tokenId].highestBiddder);

        // _itemsSold.increment();

        // owners[tokenId].push(idMarketItem[tokenId].highestBiddder);

        // recomendation[idMarketItem[tokenId].highestBiddder][idMarketItem[tokenId].about] += 1;

        // calculateHighestNFT(idMarketItem[tokenId].highestBiddder);

        // _transfer(address(this), idMarketItem[tokenId].highestBiddder, tokenId);
        buyNFT(tokenId, idMarketItem[tokenId].highestBiddder, idMarketItem[tokenId].highestPayableBid);
    }

    //To calculate the minimum of 2 numbers

    function min(uint a, uint b) pure private returns (uint){
        if(a<=b){
            return a;
        }
        return b;

    }

    //This function is used to start auction for a particular NFT

    function startAuction(uint tokenId) public {
        require(idMarketItem[tokenId].seller == msg.sender && !idMarketItem[tokenId].sold);
        // idMarketItem[tokenId].auctionState = true;
        idMarketItem[tokenId].endTime = block.timestamp + 120;
        auctionHappend[tokenId] = true;
    }

    //This function is used to place a bid for a particular NFT

    function placeBid(uint tokenId) public payable {
        uint currentbid = bids[tokenId][msg.sender] + msg.value;
        require(currentbid > idMarketItem[tokenId].highestPayableBid && block.timestamp <= idMarketItem[tokenId].endTime && msg.sender != idMarketItem[tokenId].seller && msg.value >= 1000000000000000000);

        if(bids[tokenId][msg.sender] == 0){

            idMarketItem[tokenId].bidCount++;

            bidsAddresses[tokenId][idMarketItem[tokenId].bidCount] = msg.sender;

        }

        bids[tokenId][msg.sender] = currentbid;

        if(currentbid < bids[tokenId][idMarketItem[tokenId].highestBiddder]){
            idMarketItem[tokenId].highestPayableBid = min(currentbid + bidInc, bids[tokenId][idMarketItem[tokenId].highestBiddder]);
        }else{
            idMarketItem[tokenId].highestPayableBid = min(currentbid,bids[tokenId][idMarketItem[tokenId].highestBiddder]+bidInc);
            idMarketItem[tokenId].highestBiddder = payable(msg.sender);
        }
    }

    //This function calculates the bidding amount for every user and sends the money accordingly

    function finalizeBid(uint tokenId) public {
        // require(!idMarketItem[tokenId].auctionState);
        require(block.timestamp > idMarketItem[tokenId].endTime);
        address payable person;
        uint value;
        for(uint i = 1; i <= idMarketItem[tokenId].bidCount; i++){
            if(bidsAddresses[tokenId][i] == idMarketItem[tokenId].highestBiddder){
                person = idMarketItem[tokenId].highestBiddder;
                value = (bids[tokenId][idMarketItem[tokenId].highestBiddder] - idMarketItem[tokenId].highestPayableBid) - 1500000000000000;
            }
            else{
                person = payable(bidsAddresses[tokenId][i]);
                value = bids[tokenId][bidsAddresses[tokenId][i]];
            }
            bids[tokenId][bidsAddresses[tokenId][i]]=0;
            person.transfer(value);
        }
    }

}