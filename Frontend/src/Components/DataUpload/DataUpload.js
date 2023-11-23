import React from 'react'
import './DataUpload.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const DataUpload = () => {
  const [file, setFile] = useState(null);
  // const[fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(file){
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `7f4e6f581df4a2bcf0df`,
            pinata_secret_api_key: `e471120b0151df1e70b8dab044a82608f4c03a321f53c58ca12c2e4d3e67b748`,
            "Content-Type": "multipart/form-data",
          },
        });
        // const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        // contract.addFile(account,ImgHash);
        alert("Successfully Image Uploaded");
        // setFileName("No image selected");
        setFile(null);
      } catch (error) {
        alert("Unable to upload image to Pinata");
      }
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    // setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className='absolute-center'>
        <section className="container">
        <header>NFT Creation</header>
        <form action="#" className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Account Address :</label>
          </div>
          <div className="input-box">
            <label>Account Balance :</label>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Upload File</label>
              <input type="file" onChange={retrieveFile} />
            </div>
          </div>
          <div className="gender-box">
          </div>
          <div className="input-box address">
            <label>Enter the price :</label>
            <input type="text" placeholder="Enter street address" required />
          </div>
          <button>Submit</button>
        </form>
      </section>
    </div>
  )
}

export default DataUpload