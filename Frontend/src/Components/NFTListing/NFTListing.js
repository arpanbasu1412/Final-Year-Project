import React from 'react';
import "./NFTListing.css";
import NFTs from '../../data/listedNFTs';

const NFTListing = () => {
  // Hardcoded NFT data with photo URLs

  return (
    <div className="nft-listing">
      <h2 className='template'>NFT Listing</h2>
      <div className="nft-grid">
        {NFTs.map((nft) => (
          <div key={nft.id} className="nft-card">
            <img src={nft.photoUrl} alt={nft.name} />
            <p>{nft.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTListing;