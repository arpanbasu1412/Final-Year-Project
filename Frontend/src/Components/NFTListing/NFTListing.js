import React, { useEffect, useState } from 'react';
import "./NFTListing.css";
import {createClient} from "urql";

const NFTListing = () => {
  // Hardcoded NFT data with photo URLs

  // <div key={nft.id} className="nft-card">
  //           <img src={nft.link} alt={nft.name} />
  //           <p>{nft.tokenId}</p>
  //         </div>

  const [NFTs, setNFTs] = useState([]);

  const queryURL = "https://api.studio.thegraph.com/query/51943/final/0.2";
  const query = `{
    idMarketItemCreateds {
      id
      link
      owner
      price
      seller
      sold
      tokenId
    }
  }`

  const client = createClient({
    url: queryURL
  })

  useEffect(() => {
    const getData = async () => {
      const {data} = await client.query(query).toPromise();
      setNFTs(data.idMarketItemCreateds);
    }
    getData();
  }, [])

  return (
    <div className="nft-listing">
      <h2 className="heading">NFT Listing</h2>
      <div className="nft-grid">
        {NFTs !== null && NFTs.length > 0 && NFTs.map((nft) => {
          console.log(nft.link);
          <img src={nft.link} alt={nft.name} />
        })}
      </div>
    </div>
  );
};

export default NFTListing;