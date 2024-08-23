import React, { useEffect, useState } from "react";
import arrowBack from "../assets/arrowBack.svg";
import moreOptionIcon from "../assets/moreOptionsIcon.svg";
import addIcon from "../assets/addIcon.svg";
import { mnemonicToSeedSync } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import copyContent from "../assets/copyContent.svg";
import deleteIcon from "../assets/deleteIcon.svg";
const EtheriumWallets = ({ mnemonic, onBack }) => {
  const [etheriumWallets, setEtheriumWallets] = useState([]);

  const generateWallet = (index) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const derivePath = `m/44/60/${index}/0`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivePath);
    const privateKey = child.privateKey;
    console.log(privateKey);

    return new Wallet(privateKey);
  };

  useEffect(() => {
    const storeWallet = localStorage.getItem("etheriumWallets");
    if (storeWallet) {
      setEtheriumWallets(JSON.parse(storeWallet));
    } else {
      const wallet = generateWallet(0);
      const walletObj = {
        walletID: 1,
        address: wallet.address,
        privateKey: wallet.privateKey,
      };
      setEtheriumWallets([walletObj]);
    }
  }, [mnemonic]);

  useEffect(() => {
    console.log(etheriumWallets);
    if (etheriumWallets.length > 0) {
      localStorage.setItem("etheriumWallets", JSON.stringify(etheriumWallets));
    }
  }, [etheriumWallets]);

  const addWallet = () => {
    setEtheriumWallets((prevWallet) => {
      const wallet = generateWallet(prevWallet.length);
      const walletObj = {
        walletId: prevWallet.length + 1,
        address: wallet.address,
        privateKey: wallet.privateKey,
      };
      return [...prevWallet, walletObj];
    });

    console.log(etheriumWallets);
  };

  const handleCopyContent = (address) => {
    navigator.clipboard.writeText(address);
  };

  const handleDeleteWallet = (address) => {
    setEtheriumWallets((wallets) =>
      wallets.filter((wallet) => wallet.address !== address)
    );
  };

  return (
    <div className=" flex flex-col justify-center items-center text-center space-y-8  ">
      <div className=" flex flex-row items-center justify-center mt-16  ">
        <img
          src={arrowBack}
          alt="arrow-back"
          className=" pr-5 "
          onClick={onBack}
        />
        <h1 className=" text-2xl md:text-3xl ">Etherium Wallets</h1>
      </div>

      <div className=" flex justify-center items-center h-auto    ">
        <ul className=" flex flex-col justify-center items-center space-y-3  ">
          {etheriumWallets.map((wallet, index) => (
            <li
              className=" bg-[#363A3F] w-[18rem] h-[4rem] rounded-md p-2 overflow-auto md:w-[35vw] lg:w-[30vw] cursor-pointer  "
              key={index}
            >
              <div className=" flex flex-row  justify-between items-center ">
                <span className=" flex flex-col justify-start  text-left ">
                  <h2>Wallet {index + 1}</h2>
                  <p className=" text-ellipsis overflow-hidden whitespace-nowrap text-slate-400">
                    {wallet.address.slice(0, 4)}...
                    {wallet.address.slice(-4)}
                  </p>
                </span>
                <span className=" flex flex-row space-x-4 ">
                  <img
                    src={copyContent}
                    alt="copy-icon"
                    onClick={() => handleCopyContent(wallet.address)}
                  />
                  <img
                    src={deleteIcon}
                    alt="delete-icon"
                    onClick={() => handleDeleteWallet(wallet.address)}
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
          <img src={addIcon} alt="add-icon" /> <span>add Etherium wallets</span>
        </button>
      </div>
    </div>
  );
};

export default EtheriumWallets;
