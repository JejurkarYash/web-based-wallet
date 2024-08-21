import React from "react";

const GetStarted = ({ onCreate }) => {
  return (
    <div className=" m-5 p-3 text-white flex flex-col justify-center items-center space-y-8 h-auto md:space-y-10   ">
      <div className=" flex flex-col justify-center items-center md:space-y-4 ">
        <h1 className=" text-3xl text-white font-semibold mt-32  md:text-4xl   ">
          Welcome to Orbito
        </h1>
        <p className=" text-gray-400 md:text-xl ">Let's get started</p>
      </div>
      <div className=" pt-5  ">
        <button
          className=" bg-white text-black h-[3rem] w-[12rem] rounded-lg font-semibold    "
          onClick={onCreate}
        >
          Create a new Wallet
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
