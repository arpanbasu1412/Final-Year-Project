import React, { useEffect } from 'react';
import "./SingleNFTPage.css";
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

const SingleNFTPage = (props) => {

  const {NFT, contract, accountBalance} = props;

  const backToHome = useNavigate();
  const listingPage = useNavigate();

  let owners;
  useEffect(() => {
    const seeAllOwners = async () => {
      owners = await contract.getAllOwners(NFT.tokenId);
    }
    seeAllOwners();
  })



  const buyingNFT = () => {
    if(accountBalance > NFT.price){
      console.log("Transaction send");
      contract.createMarketSale(NFT.tokenId);
    }else{
      alert("Not Enough Money")
    }
  }


  return (
    <div>
      <div className="container">
        <div className="right-box">
          <div className="main-image-box">
            <img src={`${NFT.link}`} id="mainImage" className="main-image" />
          </div>
        </div>
        <div className="details-box">
          <h3>Price : {NFT.price} eth</h3>
          <br />
          <h3>Owner : {NFT.seller}</h3>
          <br />
          <h3>Previous Owners : {owners > 0 ? owners.map((owner) => {
            return(
              <div>
                <h3>{owner}</h3>
                <br />
              </div>
            )
          }) : `No owners`}</h3>
          <button onClick={buyingNFT}>Buy</button>
        </div>
      </div>
      <div className="absolute-center">
        <Button btnType='SECONDARY' btnText='HOME' btnOnClick={() => backToHome("/")} />
        <Button btnType='SECONDARY' btnText='Listing Page' btnOnClick={() => listingPage("/listing")} />
      </div>
    </div>
  )
}

export default SingleNFTPage