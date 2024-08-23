import React, { useState, useEffect } from "react";
import addIcon from "../assets/addIcon.svg";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import copyContent from "../assets/copyContent.svg";
import arrowBack from "../assets/arrowBack.svg";
import deleteIcon from "../assets/deleteIcon.svg";

const SolanaWallets = ({ mnemonic, onBack }) => {
  const [solanaWallets, setSolanaWallets] = useState([]);

  const generateWallet = (index) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    return {
      wallet: index + 1,
      publicKey: keypair.publicKey.toBase58(),
      privatekey: Buffer.from(keypair.secretKey).toString("hex"),
    };
  };

  useEffect(() => {
    const storeWallets = localStorage.getItem("solanaWallets");
    if (storeWallets) {
      setSolanaWallets(JSON.parse(storeWallets));
    } else {
      const newWallet = generateWallet(0);
      setSolanaWallets([newWallet]);
    }
  }, [mnemonic]);

  useEffect(() => {
    if (solanaWallets.length > 0) {
      localStorage.setItem("solanaWallets", JSON.stringify(solanaWallets));
    }
  }, [solanaWallets]);

  const addWallet = () => {
    setSolanaWallets((prevWallet) => {
      const newWallet = generateWallet(prevWallet.length);
      return [...prevWallet, newWallet];
    });
  };

  const handleCopyContent = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleDeleteWallet = (walletId) => {
    setSolanaWallets((wallets) =>
      wallets.filter((wallet) => wallet.wallet !== walletId)
    );
  };

  return (
    <div className=" flex flex-col justify-center items-center text-center space-y-8  ">
      <div className=" flex flex-row items-center justify-center mt-16  ">
        <img
          src={arrowBack}
          alt="arrow-back"
          className=" pr-5  cursor-pointer "
          onClick={onBack}
        />
        <h1 className=" text-2xl md:text-3xl ">Solana Wallets</h1>
      </div>

      <div className=" flex justify-center items-center h-auto    ">
        <ul className=" flex flex-col justify-center items-center space-y-3  ">
          {solanaWallets.map((wallet, index) => (
            <li
              className=" bg-[#363A3F] w-[18rem] h-[4rem] rounded-md p-2 overflow-auto md:w-[35vw] lg:w-[30vw] cursor-pointer  "
              key={index}
            >
              <div className=" flex flex-row  justify-between items-center ">
                <span className=" flex flex-col justify-start  text-left ">
                  <h2>Wallet {index + 1}</h2>
                  <p className=" text-ellipsis overflow-hidden whitespace-nowrap text-slate-400">
                    {wallet.publicKey.slice(0, 4)}...
                    {wallet.publicKey.slice(-4)}
                  </p>
                </span>
                <span className=" flex flex-row space-x-4 ">
                  <img
                    src={copyContent}
                    alt="more-icon"
                    onClick={() => handleCopyContent(wallet.publicKey)}
                  />
                  <img
                    src={deleteIcon}
                    alt="delete-icon"
                    onClick={() => handleDeleteWallet(wallet.wallet)}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button
          className=" flex flex-row   p-1 justify-center items-center text-center space-x-2  outline-white border-solid border-2 rounded-md   border-white "
          onClick={addWallet}
        >
          <img src={addIcon} alt="add-icon" /> <span>add solana wallets</span>
        </button>
      </div>
    </div>
  );
};

export default SolanaWallets;
