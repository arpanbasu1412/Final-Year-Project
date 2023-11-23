import React from 'react';
import "./header.css";
import ConnectWallet from '../ConnectWallet/ConnectWallet'

const Header = () => {
  return (
    <div className='h absolute-center'>
      <div className='header cur-po'>
        <span className='heading-gradient'>Marketplace</span>
      </div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  )
}

export default Header