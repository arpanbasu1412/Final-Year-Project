import React from 'react';
import "./SingleNFTPage.css";

const SingleNFTPage = (props) => {

  const {NFT} = props;

  return (
    <div>{NFT}</div>
  )
}

export default SingleNFTPage