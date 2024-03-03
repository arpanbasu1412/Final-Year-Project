import React, { useEffect, useState } from 'react';
import "./SingleNFTPage.css";
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import AsMentioned from '../NFTListing/Recomendations/AsMentioned';

const SingleNFTPage = (props) => {

  const {NFTs, setNFT, maxOwned, NFT, contract, accountBalance} = props;

  const [owners, setOwners] = useState([]);

  const backToHome = useNavigate();
  const listingPage = useNavigate();

  useEffect(() => {
    const seeAllOwners = async () => {
      try{
        if(contract){
          setOwners(await contract.getAllOwners(NFT.tokenId));
        }
      }catch{
        backToHome("/");
      }
    }
    seeAllOwners();
  },[])



  const buyingNFT = async () => {
    try{
      const cost = Number(NFT.price) + 0.0015;
      const valueToSend = ethers.utils.parseEther(`${cost}`)
      console.log(cost);
      if(accountBalance > cost){
        const result = await contract.createMarketSale(NFT.tokenId, {
          value: valueToSend,
          gasLimit: 3000000,
        });
        console.log(result);
      }
    }catch{
      backToHome("/");
    }
  }

  const resellNFT = async (e) => {
    try{
      // console.log(typeof(e.target[0].value));
      e.preventDefault();
      const cost = 0.0015;
      const valueToSend = ethers.utils.parseEther(`${cost}`)
      console.log(cost);
      if(accountBalance > valueToSend){
        const result = await contract.reSellToken(NFT.tokenId, e.target[0].value, {
          value: valueToSend,
          gasLimit: 3000000,
        });
        console.log(result);
      }
    }catch{
      backToHome("/");
    }
  }

  const nftNotSelected = () => {
    listingPage("/listing");
  }


  return (
    <div>
      <div className="container">
        <div className="right-box">
          <div className="main-image-box">
            <img src={NFT !== null ? `${NFT.link}` : nftNotSelected()} id="mainImage" className="main-image" />
          </div>
        </div>
        <div className="details-box">
          <h3>Token Id : {NFT !== null ? `${NFT.tokenId}` : console.log("First Select an NFT")}</h3>
          <br />
          <h3>Price : {NFT !== null ? `${NFT.price}` : console.log("First Select an NFT")} eth</h3>
          <br />
          <h3>Current Owner : </h3>
          <br />
          <h3>{NFT !== null ? `${NFT.seller}` : console.log("First Select an NFT")}</h3>
          <br />
          <h3>Previous Owners : {owners.length > 0 ? owners.map((owner) => {
            return(
              <div>
                <br/>
                <h3>{owner}</h3>
                <br />
              </div>
            )
          }) : `No owners`}</h3>
          {!NFT[4] ? <button onClick={buyingNFT}>Buy</button> : 
          <form action="#" onSubmit={resellNFT}>
            <br />
            <div>
              <h3>Enter the price :</h3>
              <br />
              <input className="price" type="text" placeholder="e.i. 1" required />
            </div>
              <button>Resell</button>
            </form>}
        </div>
      </div>
      <div>
        <h2 className="heading">All the NFTs similer to that</h2>
        <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned}/>
      </div>
      <div className="absolute-center">
        <Button btnType='SECONDARY' btnText='Listing Page' btnOnClick={() => listingPage("/listing")} />
      </div>
    </div>
  )
}

export default SingleNFTPage