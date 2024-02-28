import React, { useEffect, useState } from 'react';
import "./App.css";

import TopFoald from './Components/TopFold/TopFoald.js'

import Header from './Components/Header/Header.js'

import BrandsIntegration from './Components/BrandIntegration/BrandIntegration.js'

import TrendingNFTs from './Components/TrendingNFTS/TrendingNFTS.js'

import InfoSection from './Components/InfoSection/InfoSection.js'

import Footer from './Components/Footer/Footer.js'

import NFTListing from './Components/NFTListing/NFTListing.js'

import Resell from './Components/NFTListing/Resell.js'

import SingleNFT from './Components/SingleNFT/SingleNFTPage.js'

import DataUpload from './Components/DataUpload/DataUpload.js'

import TrendingPage from './Components/TrendingPage/TrendingPage.js';

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
  // const [NFTs, setNFTs] = useState([]);
  const [NFT, setNFT] = useState(null);
  const [maxOwned, setMaxOwned] = useState("");

  // const queryURL = "https://api.studio.thegraph.com/query/51943/upgradeable/version/latest";
  // const query = `{
  //   idMarketItemCreateds {
  //     link
  //     owner
  //     price
  //     seller
  //     sold
  //     tokenId
  //   }
  // }`

  // const client = createClient({
  //   url: queryURL
  // })

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
      element: <NFTListing setNFT={setNFT} contract={contract} maxOwned={maxOwned} />
    },
    {
      path: "single",
      element: <SingleNFT NFT={NFT} contract={contract} accountBalance={accountBalance} accountAddress={accountAddress} />
    },
    {
      path: "data",
      element: <DataUpload accountAddress={accountAddress} accountBalance={accountBalance} contract={contract} />
    },
    {
      path: "resell",
      element: <Resell NFT={NFT} contract={contract} accountBalance={accountBalance} accountAddress={accountAddress}/>
    },
    {
      path: "trending_page",
      element: <TrendingPage setNFT={setNFT} contract={contract} />
    },
  ]);

  useEffect(() => {

    const providers = async() => {
      if(provider){
        const signer = provider.getSigner();
        let contractAddress = "0x856e20637c82CE631372b979266fDC07eb9BB7fa";
        const contracts = new ethers.Contract(
          contractAddress, NFT_Marketplace.abi, signer
        );
        const recomendation = await contracts.getMaxNFTData(accountAddress);
        setContract(contracts);
        setMaxOwned(recomendation);
      }else{
        console.error("Connect Metamask");
      }
    }

    // const getData = async () => {
    //   const {data} = await client.query(query).toPromise();
    //   setNFTs(data.idMarketItemCreateds);
    // }

    providers();

    // getData();

    // console.log("NFT Id: ", NFT);
    
    // console.log("haveMetamask:", haveMetamask,", accountAddress:", accountAddress, ", accountBalance:", accountBalance, ", isConnected:", isConnected, "Provider:", provider, "Contract:", contract);
  }, [haveMetamask, accountAddress, accountBalance, isConnected, provider]);

  // const handleClick = async () => {
  //   const recomendation = await contract.getMaxNFTData(accountAddress);
  //   setMaxOwned(recomendation);
  //   console.log(maxOwned);
  // }

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