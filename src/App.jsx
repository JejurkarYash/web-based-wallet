import { useState } from "react";
import GetStarted from "./components/GetStarted";
import GenerateMnemonic from "./components/GenerateMnemonic";
import { Buffer } from "buffer";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import AddWallets from "./components/AddWallets.jsx";
import SolanaWallets from "./components/SolanaWallets.jsx";
import EtheriumWallets from "./components/EtheriumWallets.jsx";

window.Buffer = Buffer;

function App() {
  const [mnemonic, setMnemonic] = useState();
  const [currentStep, setCurrentStep] = useState("getStarted");
  const [solanaWallets, setSolanaWallets] = useState(null);
  const [etheriumWallets, setEtheriumWallets] = useState(null);

  const handleOnCreateWallet = async () => {
    console.log("Create new Wallet");

    const mnemonic = generateMnemonic();
    console.log(mnemonic);
    setMnemonic(mnemonic);
    setCurrentStep("generateMnemonic");
  };

  const handleOnNext = () => {
    console.log("next button is clicked ");
    setCurrentStep("addWallets");
  };

  const handleSolanaWallet = () => {

   


    setCurrentStep("solanaWallets");
  };
  const hadleEheriumWallet = () => {
    setCurrentStep("eheriumWallets");
  };

  return (
    <div className=" h-screen w-screen bg-[#111113] text-white  overflow-auto   ">
      <div className=" container flex flex-col justify-center items-center">
        {currentStep === "getStarted" && (
          <GetStarted onCreate={handleOnCreateWallet} />
        )}
        {currentStep === "generateMnemonic" && (
          <GenerateMnemonic mnemonic={mnemonic} onNext={handleOnNext} />
        )}
        {currentStep === "addWallets" && (
          <AddWallets
            addSolanaWallets={handleSolanaWallet}
            addEheriumWallets={hadleEheriumWallet}
          />
        )}
        {currentStep === "solanaWallets" && <SolanaWallets />}
        {currentStep === "eheriumWallets" && <EtheriumWallets />}
      </div>
    </div>
  );
}

export default App;
