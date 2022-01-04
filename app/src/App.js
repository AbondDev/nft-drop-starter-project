import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddresss] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      const {solana} = window;
      if (solana) {
        if(solana.isPhantom) {
          // Todo: support more wallets
          console.log('phantom wallet found');
          const response = await solana.connect({onlyIfTrusted: true });
          // Todo remove this: 
          console.log('Connected with public key',response.publicKey.toString());
          setWalletAddresss(response.publicKey.toString());
        } else {
          alert('this project is currently compatible with phanotm');
        }
      } else {
        alert('Solana object not found, please use phantom wallet');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const loadWalletConnection = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load',loadWalletConnection);
    return () => window.removeEventListener('load',loadWalletConnection);
  },[])
  
  const connectWallet = async () => {
    const {solana} = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with public key',response.publicKey.toString());
      setWalletAddresss(response.publicKey.toString());
    }
  };
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>Connect to Wallet</button>
  )
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
