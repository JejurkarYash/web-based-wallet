import React, { useState } from "react";
import addIcon from "../assets/addIcon.svg";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";

const SolanaWallets = ({ mnemonic }) => {
  const [solanaWallets, setSolanaWallets] = useState([]);

  

  return (
    <div className=" flex flex-col justify-center items-center text-center space-y-8  ">
      <h1 className=" text-2xl mt-16 ">Solana Wallets</h1>

      <div className=" flex justify-center items-center h-auto    ">
        <ul className=" ">
          <li className=" bg-[#363A3F] w-[18rem] h-[4rem] rounded-md p-2  ">
            <div className=" flex flex-row ">
              <span className=" flex flex-col justify-start  text-left ">
                <h2>Wallet 1</h2>
                <p>adkjfkdjfkdfkjkdfalkdk</p>
              </span>
              <span></span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <button className=" flex flex-row   p-1 justify-center items-center text-center space-x-2  ">
          <img src={addIcon} alt="add-icon" /> <span>add solana wallets</span>
        </button>
      </div>
    </div>
  );
};

export default SolanaWallets;
