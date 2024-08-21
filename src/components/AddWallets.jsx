import React from "react";

const AddWallets = ({ addSolanaWallets, addEheriumWallets }) => {
  return (
    <div className=" flex flex-col justify-center items-center space-y-8 ">
      <div className=" flex flex-col justify-center items-center space-y-3 ">
        <h1 className=" text-3xl text-white font-semibold mt-32  md:text-4xl   ">
          Select Network
        </h1>
        <p className=" text-slate-400">Orbito supports multiple blockchains </p>
      </div>
      <div className=" flex flex-col justify-center items-center space-y-4 ">
        <button
          className=" bg-white text-black h-[3rem] w-[12rem] rounded-lg font-semibold    "
          onClick={addEheriumWallets}
        >
          Etherium
        </button>
        <button
          className=" bg-white text-black h-[3rem] w-[12rem] rounded-lg font-semibold    "
          onClick={addSolanaWallets}
        >
          Solana
        </button>
      </div>
    </div>
  );
};

export default AddWallets;
