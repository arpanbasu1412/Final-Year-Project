import React from 'react';
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
    element: <DataUpload />
  },
]);


const App = () => {

  // const QueryURL = "https://api.studio.thegraph.com/query/51943/nft-marketplace/0.1";
  // const query = ``

  return (
    <div>
      <Header />
      <RouterProvider router={router} />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default App