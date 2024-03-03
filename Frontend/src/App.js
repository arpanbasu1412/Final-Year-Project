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

import AsMentioned from './Components/NFTListing/Recomendations/AsMentioned.js';

import Navbar from './Components/NavBar/NavBar.js';

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
  const [NFTs, setNFTs] = useState([[]]);

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
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <div className='max-width'>
            <TopFoald />
            <BrandsIntegration />
            <TrendingNFTs />
          </div>
        </div>
      ),
    },
    {
      path: "listing",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <NFTListing NFTs={NFTs} setNFT={setNFT} contract={contract} maxOwned={maxOwned} />
        </div>
      )
    },
    {
      path: "single",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <SingleNFT NFT={NFT} contract={contract} accountBalance={accountBalance} accountAddress={accountAddress} />
        </div>
      )
    },
    {
      path: "data",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <DataUpload accountAddress={accountAddress} accountBalance={accountBalance} contract={contract} />
        </div>
      )
    },
    {
      path: "resell",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <Resell NFT={NFT} contract={contract} accountBalance={accountBalance} accountAddress={accountAddress}/>
        </div>
      )
    },
    {
      path: "trending_page",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <TrendingPage setNFT={setNFT} contract={contract} />
        </div>
      )
    },
    {
      path: "gamingNFT",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <h2 className="heading">Gaming NFTs</h2>
          <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned} />
        </div>
      )
    },
    {
      path: "horrorNFT",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <h2 className="heading">Horror NFTs</h2>
          <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned} />
        </div>
      )
    },
    {
      path: "monkeyNFT",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <h2 className="heading">Monkey NFTs</h2>
          <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned} />
        </div>
      )
    },
    {
      path: "animeNFT",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <h2 className="heading">Anime NFTs</h2>
          <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned} />
        </div>
      )
    },
    {
      path: "artNFT",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <h2 className="heading">Art NFTs</h2>
          <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned} />
        </div>
      )
    },
    {
      path: "movieNFT",
      element: (
        <div>
          <Navbar setMaxOwned={setMaxOwned} />
          <h2 className="heading">Movie NFTs</h2>
          <AsMentioned NFTs={NFTs} setNFT={setNFT} maxOwned={maxOwned} />
        </div>
      )
    },
  ]);

  useEffect(() => {

    const providers = async() => {
      if(provider){
        const signer = provider.getSigner();
        let contractAddress = "0x856e20637c82CE631372b979266fDC07eb9BB7fa";
        const contracts = new ethers.Contract(
          contractAddress, NFT_Marketplace.abi, signer
        )
        const recomendation = await contracts.getMaxNFTData(accountAddress);
        const nft = await contracts.fetchMarketItem();
        setNFTs(nft);
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