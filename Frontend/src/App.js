import React from 'react';
import "./App.css";

import TopFoald from './Components/TopFold/TopFoald.js'

import Header from './Components/Header/Header.js'

import BrandsIntegration from './Components/BrandIntegration/BrandIntegration.js'

import TrendingNFTs from './Components/TrendingNFTS/TrendingNFTS.js'

import InfoSection from './Components/InfoSection/InfoSection.js'

import Footer from './Components/Footer/Footer.js'


const App = () => {

  // const QueryURL = "https://api.studio.thegraph.com/query/51943/nft-marketplace/0.1";
  // const query = ``

  return (
    <div className='max-width'>
      <Header />
      <TopFoald />
      <BrandsIntegration />
      <TrendingNFTs />
      <InfoSection />
      <Footer />
    </div>
  )
}

export default App