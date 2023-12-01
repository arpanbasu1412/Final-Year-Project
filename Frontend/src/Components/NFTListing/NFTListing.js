import "./NFTListing.css";
import Button from "../../common/Button/Button";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const NFTListing = (props) => {
  // Hardcoded NFT data with photo URLs

  const {contract} = props;

  const singleNFT = useNavigate();

  const backToHome = useNavigate();

  const [NFTs, setNFTs] = useState([[]]);


  useEffect(() => {
    const getData = async () => {
      if(contract){
        const nft = await contract.fetchMarketItem();
        setNFTs(nft);
      }else{
        backToHome("/");
      }
    }
    getData();
  }, [])

  let count = 1;

  
  return (
    <div className="nft-listing absolute-center">
      <h2 className="heading">NFT Listing</h2>
      <div className="nft-grid">
      {NFTs.length > 0 && NFTs.map((nft) => {
        if(!nft[4]){
          return(
            <div key={count} className="nft-card">
              <img className="nft-single" src={nft[5]} alt={nft[2]} />
              <p className='token-number'>NFT Number: {count++}</p>
              <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
                props.setNFT(nft);
                singleNFT("/single");
              }} />
            </div>
          )
        }
      })
      }
      </div>
      <div className='backBtn'>
        <Button btnType='SECONDARY' btnText='HOME' btnOnClick={() => backToHome("/")} />
      </div>
    </div>
    // <h1>Hello</h1>
  );
};

export default NFTListing;
