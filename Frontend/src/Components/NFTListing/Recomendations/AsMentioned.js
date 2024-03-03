import React from 'react';
import Button from "../../../common/Button/Button";
import { useNavigate } from 'react-router-dom';

function AsMentioned(props) {

    let {NFTs, setNFT, maxOwned} = props;

    let count = 1;

    const singleNFT = useNavigate();

    const backToHome = useNavigate();

    return (
        <div>
            <div className="nft-grid">
            {NFTs.length > 0 && NFTs.map((nft) => {
                if(!nft[4] && nft[6] == maxOwned){
                    return(
                        <div key={count} className="nft-card">
                            <img className="nft-single" src={nft[5]} alt={nft[2]} />
                            <p className='token-number'>NFT Number: {count++}</p>
                            <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
                                    setNFT(nft);
                                    singleNFT("/single");
                            }} />
                        </div>
                    )
                }
                console.log(nft);
            })
            }
            <div className='backBtn absolute-center'>
                <Button btnType='SECONDARY' btnText='HOME' btnOnClick={() => backToHome("/")} />
            </div>
            </div>
        </div>
    )
}

export default AsMentioned