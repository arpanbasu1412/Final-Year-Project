import React from 'react';
import "./NFTListing.css"

const NFTListing = () => {
  // Hardcoded NFT data with photo URLs
  const nfts = [
    {
      id: 1,
      name: 'NFT 1',
      photoUrl: 'https://i.seadn.io/s/raw/files/01719e1b7165406edc028c146e566da8.gif?auto=format&dpr=1&w=128',
    },
    {
      id: 2,
      name: 'NFT 2',
      photoUrl: 'https://i.seadn.io/s/raw/files/159c490881e7e9a04fb5e1f3c6c96707.gif?auto=format&dpr=1&w=128',
    },
    {
      id: 3,
      name: 'NFT 3',
      photoUrl: 'https://i.seadn.io/gae/N-0Ykz_InP31IMCnBV4gXAjPfXbkoOmENXGZjKRdK6mo2dO-hRcAHHPyQ-oBLcQMgWwzmh06GHeJ5U0yib3IDE9ekrvVc_-qlOWK?auto=format&dpr=1&w=128',
    },
    {
      id: 4,
      name: 'NFT 4',
      photoUrl: 'https://i.seadn.io/gcs/files/0aa3075ce0e2a623cdf4beb708263967.png?auto=format&dpr=1&h=500',
    },
    {
      id: 5,
      name: 'NFT 5',
      photoUrl: 'https://i.seadn.io/gcs/files/76dc85fadfd91bcbb1db9d06d96258c4.png?auto=format&dpr=1&h=500',
    },
    {
      id: 6,
      name: 'NFT 6',
      photoUrl: 'https://i.seadn.io/gcs/files/9508acda43367f3c6ac78fd8d55bbea5.png?auto=format&dpr=1&h=500',
    },
    {
      id: 7,
      name: 'NFT 7',
      photoUrl: 'https://i.seadn.io/gae/EOSGJDFJN-Vcg6mdaE8ZhbjTOnT5hUrHfIAZn-YIRRNeuX8xFWpEpz2h42OlgUf4ZBPO2IkWi5-Zm2zYIU40Z6ZPj7YpOJYcttNL?auto=format&dpr=1&h=500',
    },
    {
      id: 8,
      name: 'NFT 8',
      photoUrl: 'https://i.seadn.io/s/raw/files/2eae275e74b075bba44023828ad95e27.png?auto=format&dpr=1&h=500',
    },
    {
      id: 9,
      name: 'NFT 9',
      photoUrl: 'https://i.seadn.io/gcs/files/63230c07ebb670508594d01d3c17fd68.png?auto=format&dpr=1&h=500',
    },
  ];

  return (
    <div className="nft-listing">
      <h2>NFT Listing</h2>
      <div className="nft-grid">
        {nfts.map((nft) => (
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