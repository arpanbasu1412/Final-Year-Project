// import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';



const Navbar = (props) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  const gamingNFT = useNavigate();

  const { setMaxOwned } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Category
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            setMaxOwned("gaming");
            gamingNFT("/gamingNFT");
            // <AsMentioned />

          }}
        >
          Gaming
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMaxOwned("horror");
            gamingNFT("/horrorNFT");

          }}
        >
          Horror
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            setMaxOwned("monkey");
            gamingNFT("/monkeyNFT");

          }}
        >
          Monkey
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMaxOwned("anime");
            gamingNFT("/animeNFT");

          }}
        >
          Anime
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMaxOwned("art");
            gamingNFT("/artNFT");

          }}
        >
          Art
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setMaxOwned("movie");
            gamingNFT("/movieNFT");

          }}
        >
          Movie
        </Dropdown.Item>


      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Navbar;