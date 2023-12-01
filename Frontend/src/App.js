import React, { useEffect, useState } from 'react';
import "./App.css";

import TopFoald from './Components/TopFold/TopFoald.js'

import Header from './Components/Header/Header.js'

import BrandsIntegration from './Components/BrandIntegration/BrandIntegration.js'

import TrendingNFTs from './Components/TrendingNFTS/TrendingNFTS.js'

import InfoSection from './Components/InfoSection/InfoSection.js'

import Footer from './Components/Footer/Footer.js'

import NFTListing from './Components/NFTListing/NFTListing.js'

import SingleNFT from './Components/SingleNFT/SingleNFTPage.js'

import DataUpload from './Components/DataUpload/DataUpload.js'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import NFT_Marketplace from '../src/artifacts/contracts/NFT_Marketplace.sol/NFT_Marketplace.json';

import { ethers } from 'ethers';

import {createClient} from "urql";

const App = () => {

  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [NFTs, setNFTs] = useState([]);
  const [NFT, setNFT] = useState(null);

  const queryURL = "https://api.studio.thegraph.com/query/51943/cse/0.1";
  const query = `{
    idMarketItemCreateds {
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className='max-width'>
          <TopFoald />
          <BrandsIntegration />
          <TrendingNFTs />
        </div>
      ),
    },
    {
      path: "listing",
      element: <NFTListing NFTs={NFTs} setNFT={setNFT} contract={contract} />
    },
    {
      path: "single",
      element: <SingleNFT NFT={NFT} contract={contract} accountBalance={accountBalance} accountAddress={accountAddress} />
    },
    {
      path: "data",
      element: <DataUpload accountAddress={accountAddress} accountBalance={accountBalance} contract={contract} />
    },
  ]);

  useEffect(() => {

    const providers = async() => {
      if(provider){
        const signer = provider.getSigner();
        let contractAddress = "0xc39f703065A63E45a2Df854BA650bc85ec886911";
        const contracts = new ethers.Contract(
          contractAddress, NFT_Marketplace.abi, signer
        )
        setContract(contracts);
      }else{
        console.error("Connect Metamask");
      }
    }

    const getData = async () => {
      const {data} = await client.query(query).toPromise();
      setNFTs(data.idMarketItemCreateds);
    }

    providers();

    getData();

    // console.log("NFT Id: ", NFT);
    
    // console.log("haveMetamask:", haveMetamask,", accountAddress:", accountAddress, ", accountBalance:", accountBalance, ", isConnected:", isConnected, "Provider:", provider, "Contract:", contract);
  }, [haveMetamask, accountAddress, accountBalance, isConnected, provider, NFT]);

  return (
    <div>
      <Header sethaveMetamask={sethaveMetamask} setAccountAddress={setAccountAddress} setAccountBalance={setAccountBalance} setIsConnected={setIsConnected} setProvider={setProvider} accountAddress={accountAddress} />
      <RouterProvider router={router} />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default App