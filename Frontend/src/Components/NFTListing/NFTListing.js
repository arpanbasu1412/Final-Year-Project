import "./NFTListing.css";
import Button from "../../common/Button/Button";
import { useNavigate } from 'react-router-dom';

const NFTListing = (props) => {
  // Hardcoded NFT data with photo URLs

  const {NFTs} = props;

  const singleNFT = useNavigate();

  const backToHome = useNavigate();

  return (
    <div className="nft-listing absolute-center">
      <h2 className="heading">NFT Listing</h2>
      <div className="nft-grid">
      {NFTs !== null && NFTs.length > 0 && NFTs.map((nft) => {
        return !nft.sold && (
          <div key={nft.id} className="nft-card">
            <img className="nft-single" src={nft.link} alt={nft.name} />
            <p className='token-number'>NFT Number: {nft.tokenId}</p>
            <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
              props.setNFT(nft);
              singleNFT("/single");
            }} />
          </div>
        )})
      }
      </div>
      <div className='backBtn'>
        <Button btnType='SECONDARY' btnText='HOME' btnOnClick={() => backToHome("/")} />
      </div>
    </div>
  );
};

export default NFTListing;