import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import AsMentioned from "../NFTListing/Recomendations/AsMentioned";
const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const gamingNFT = useNavigate();
  
  const {setMaxOwned} = props;

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleOpen}>
        <div className="dropdown-text">
          <div>Category</div>
          <div
            className="material-icons"
            // style={{
            //   transform: `rotate(x${open ? 180 : 0}deg)`,
            //   transition: "all 0.25s",
            // }}
          >
          </div>
        </div>
      </button>
      {open ? (
        <ul className="menu">
            <li className="menu-item">
              <button
                onClick={() => {
                  setMaxOwned("gaming");
                  gamingNFT("/gamingNFT");
                  <AsMentioned/>
                  // menuItem();
                }}
              >
                Gaming
              </button>
            </li>
            <li className="menu-item">
              <button
                onClick={() => {
                  setMaxOwned("horror");
                  gamingNFT("/horrorNFT");
                  // menuItem();
                }}
              >
                Horror
              </button>
            </li>
            <li className="menu-item">
              <button
                onClick={() => {
                  setMaxOwned("monkey");
                  gamingNFT("/monkeyNFT");
                  // menuItem();
                }}
              >
                Monkey
              </button>
            </li>
            <li className="menu-item">
              <button
                onClick={() => {
                  setMaxOwned("anime");
                  gamingNFT("/animeNFT");
                  // menuItem();
                }}
              >
                Anime
              </button>
            </li>
            <li className="menu-item">
              <button
                onClick={() => {
                  setMaxOwned("art");
                  gamingNFT("/artNFT");
                  // menuItem();
                }}
              >
                Art
              </button>
            </li>
            <li className="menu-item">
              <button
                onClick={() => {
                  setMaxOwned("movie");
                  gamingNFT("/movieNFT");
                  // menuItem();
                }}
              >
                Movie
              </button>
            </li>
            
          
        </ul>
      ) : null}
    </div>
  );
};

export default Navbar;