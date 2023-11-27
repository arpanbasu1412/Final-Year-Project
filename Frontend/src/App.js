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

const App = () => {

  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

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
      element: <NFTListing />
    },
    {
      path: "single",
      element: <SingleNFT />
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
        let contractAddress = "0x1bef89eA54C5B0d4C176062b13528CeE55420F5C";
        const contracts = new ethers.Contract(
          contractAddress, NFT_Marketplace.abi, signer
        )
        setContract(contracts);
      }else{
        console.error("Connect Metamask");
      }
    }

    providers();
    
    console.log("haveMetamask:", haveMetamask,", accountAddress:", accountAddress, ", accountBalance:", accountBalance, ", isConnected:", isConnected, "Provider:", provider, "Contract:", contract);
  }, [haveMetamask, accountAddress, accountBalance, isConnected, provider]);

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