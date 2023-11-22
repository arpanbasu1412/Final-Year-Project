import React from 'react'
import "./trendingNFTS.css"
import Slider from 'react-slick'
import TRENDING_NFTS from "../../data/trendingNFTs";
import TrendingCards from "./TrendingCards/TrendingCards";
import Button from '../../common/Button/Button';

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  autoPlay: true,
  speed: 500,
  arrow: false,
};

const TrendingNFTS = () => {
  return (
    <div className='trending-nfts'>
      <div className='tn-title absolute-center'>
        <span className='heading-gradient'>Trending NFTs</span>
      </div>
      <div className='tn-bg-blob'></div>
      <Slider {...settings}> 
        {TRENDING_NFTS.map((_nfts) => {
          return(
            <TrendingCards nft={_nfts} />
          )
        }
        )}
      </Slider>
      <div className='tn-btn absolute-center'>
        <Button btnText='SEE MORE' type='Secondary' customClass='seemore-btn'></Button>
      </div>
    </div>
  )
}

export default TrendingNFTS