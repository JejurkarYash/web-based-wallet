import React, { useState } from "react";

const GenerateMnemonic = ({ mnemonic, onNext }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic).then(setIsCopied(true));
  };

  return (
    <div className=" m-5 p-3 text-white flex flex-col justify-center items-center space-y-8 h-auto  md:space-y-10  ">
      <div className=" flex flex-col justify-center items-center space-y-3  ">
        <h1 className=" text-3xl text-white font-semibold mt-32 text-center  md:text-4xl   ">
          Secrete Recovery Phrase
        </h1>
        <p className=" text-gray-400 md:text-xl  ">
          Save these words in a safe place{" "}
        </p>
      </div>
      <div
        className=" bg-[#212225] text-white h-auto w-[18rem]  rounded-md  md:w-[55vw] lg:w-[40vw]    "
        onClick={handleCopyToClipboard}
      >
        <ol className=" p-1 grid grid-flow-col grid-rows-6  gap-4 m-3 items-center text-center  md:grid-rows-4 md:gap-8  lg:p-2    ">
          {mnemonic.split(" ").map((word) => (
            <li
              className=" bg-[#363A3F] h-[2rem]  text-center p-1 rounded-md   "
              key={word}
            >
              {word}
            </li>
          ))}
        </ol>
        <div className=" flex flex-col text-center ">
          <hr className=" m-2  "></hr>
          <p className=" text-slate-400 mb-3   ">Click Anywhere to Copy !</p>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center text-center  ">
        {isCopied ? (
          <p className=" text-slate-400 mb-[1.5rem]    ">
            Phrase is Copied to Clipboard !
          </p>
        ) : null}
        <button
          className=" bg-white text-black h-[3rem] w-[12rem] rounded-lg font-semibold    "
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GenerateMnemonic;
