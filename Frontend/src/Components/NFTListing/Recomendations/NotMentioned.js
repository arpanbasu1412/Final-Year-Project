import React from 'react';
import Button from "../../../common/Button/Button";

function NotMentioned(props) {
    let {NFTs, count, singleNFT, maxOwned} = props;

    return (
        <div>
            <div className="nft-grid">
            {NFTs.length > 0 && NFTs.map((nft) => {
                if(!nft[4] && nft[6] != maxOwned){
                    return(
                        <div key={count} className="nft-card">
                            <img className="nft-single" src={nft[5]} alt={nft[2]} />
                            <p className='token-number'>NFT Number: {count++}</p>
                            <Button className="buying-price" btnType='PRIMARY' btnText='BUY' btnOnClick={() => {
                                    props.setNFT(nft);
                                    singleNFT("/single");
                            }} />
                        </div>
                    )
                }
                console.log(nft);
            })
            }
            </div>
        </div>
    )
}

export default NotMentioned
