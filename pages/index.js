import { useState, useEffect } from "react";
import { ethers } from "ethers";
import crypto_making_tree_abi from "../artifacts/contracts/Frontend.sol/Frontend.json";

export default function Homepage() {
  const [meMessage, setMeMessage] = useState("Account Holder Name: Gagan Chaudhary");
  const [defaultAccount, setDefaultAccount] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ethWallet, setEthWallet] = useState(undefined);
  const [Frontend, setFrontend] = useState(undefined);
  const [verificationResult, setVerificationResult] = useState(""); // Added for verification results

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const smcABI = crypto_making_tree_abi.abi;

  const getBalance = async () => {
    if (Frontend) {
      try {
        const balance = await Frontend.getBalance();
        setBalance(balance.toNumber());
      } catch (error) {
        console.error("Error getting balance:", error);
      }
    }
  };

  const topUp = async () => {
    if (Frontend) {
      try {
        let tx = await Frontend.topUp(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error topping up:", error);
      }
    }
  };

  const cashOut = async () => {
    if (Frontend) {
      try {
        let tx = await Frontend.cashOut(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error cashing out:", error);
      }
    }
  };

  const verifyAddress = async () => {
    if (Frontend) {
      try {
        const result = await Frontend.verifyAddress(defaultAccount[0]); // Replace with your verification logic
        setVerificationResult(result); // Set the verification result
      } catch (error) {
        console.error("Error verifying address:", error);
        setVerificationResult("Error verifying address");
      }
    }
  };

  const accessTransaction = async () => {
    if (Frontend) {
      try {
        const txResult = await Frontend.accessResource();
        console.log("Access Transaction Result:", txResult);
      } catch (error) {
        console.error("Error during access transaction:", error);
      }
    }
  };

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      accountHandler(accounts);
    }
  };

  const accountHandler = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected =", accounts);
      setDefaultAccount(accounts);
    } else {
      console.log("Account Not Located");
    }
  };

  const connectWalletHandler = async () => {
    if (!ethWallet) {
      alert("MetaMask Wallet is required to Connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    accountHandler(accounts);
    getMyContract();
  };

  const getMyContract = async () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, smcABI, signer);

    setFrontend(contract);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Enhance your experience by installing the MetaMask browser extension</p>;
    }
    if (!defaultAccount) {
      return (
        <button
          onClick={connectWalletHandler}
          className="button"
        >
          <h3>Link to Your Wallet</h3>
        </button>
      );
    }

    getBalance();

    return (
      <div>
        <h3 style={{ color: "#FF4C29" }}>User Account : {defaultAccount}</h3>
        <p style={{ color: "#000" }}>User Balance : {balance}</p>
        <p>{verificationResult}</p> {/* Display verification result */}
        <button
          onClick={verifyAddress}
          className="button"
        >
          <h3>Verify Address</h3>
        </button>
        <button
          onClick={topUp}
          className="button"
        >
          <h3>Top Up Balance</h3>
        </button>
        <button
          onClick={cashOut}
          className="button"
        >
          <h3>Cash Out</h3>
        </button>
        <button
          onClick={accessTransaction}
          className="button"
        >
          <h3>Access Transaction</h3>
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="Gagan-Chaudhary">
      <h1>Welcome to Metacrafters ATM</h1>
      <h2>{meMessage}</h2>

      {initUser()}

      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          background-color: #F0F0F0; /* Light background */
        }

        .Gagan-Chaudhary {
          background-color: #FFF; /* White background */
          width: 100%;
          height: 100vh;
          text-align: center;
          color: #000; /* Black text */
          text-shadow: none; /* No text shadow for light theme */
        }
        
        .button {
          margin: 10px;
          cursor: pointer;
          color: #000;
          background: #FFF; /* White background */
          padding: 10px 20px; /* Increased padding for a better look */
          border-radius: 8px;
          transition: all 0.3s ease; /* Smooth transition */
          border: 1px solid transparent; /* Default transparent border */
          font-size: 1rem; /* Default font size */
        }

        .button:hover {
          background: #FF4C29; /* Change background color on hover */
          color: #FFF; /* Change text color on hover */
          transform: scale(1.05); /* Slightly increase size on hover */
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
          border-color: #FF4C29; /* Change border color on hover */
        }

        h1, h2, h3, p {
          font-family: 'Arial', sans-serif;
        }
      `}</style>
    </main>
  );
}
