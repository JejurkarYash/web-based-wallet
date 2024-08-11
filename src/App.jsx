import { useState } from "react";
import { HDNodeWallet } from "ethers";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Buffer } from "buffer";
import cryptoWallet from "./assets/cryptoWallet.png";
window.Buffer = Buffer;

function App() {
  const [mnemonic, setMnemonic] = useState();
  const [wallets, setWallets] = useState([]);

  const GenerateMnemonic = () => {
    const Mnemonic = generateMnemonic();
    console.log(Mnemonic);
    setMnemonic(Mnemonic);
  };

  const AddEtheriumWallet = () => {
    console.log("AddEth");

    if (!mnemonic) {
      alert("Please Create Mnemonic");
      return;
    }

    const seed = mnemonicToSeedSync(mnemonic);
    const hdNode = HDNodeWallet.fromSeed(seed);
    const wallet = hdNode.derivePath(`m/44'/60'/0'/0/${wallets.length}`);
    setWallets([...wallets, wallet]);
  };

  const DeleteAllWallets = () => {
    if (window.confirm("Are you sure you want to delete all wallets?")) {
      setWallets([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 py-8 px-4 sm:px-6 lg:px-8">
      <img src={cryptoWallet} alt="crypto-wallet" className=" w-[25rem]" />
      <h1 className="text-4xl text-gray-800 font-semibold mb-8">
        Web Based Wallet
      </h1>

      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <button
          className="w-full h-12 text-xl font-medium bg-indigo-600 rounded-md text-white mb-4 hover:bg-indigo-700"
          onClick={GenerateMnemonic}
        >
          Create Wallet
        </button>

        {mnemonic && (
          <div className="bg-gray-200 p-4 rounded-lg mb-6">
            <h2 className="text-lg text-gray-700 font-medium mb-2">
              Keep Your Mnemonic Safe!
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {mnemonic.split(" ").map((value, index) => (
                <li
                  key={index}
                  className="h-12 bg-white text-center rounded-md flex items-center justify-center text-lg text-gray-800 shadow-sm"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {mnemonic && (
          <>
            <button
              className="w-full h-12 bg-green-500 rounded-md text-white font-medium mb-4 hover:bg-green-600"
              onClick={AddEtheriumWallet}
            >
              Add Wallet
            </button>

            {wallets.length > 0 && (
              <button
                className="w-full h-12 bg-red-500 rounded-md text-white font-medium mb-4 hover:bg-red-600"
                onClick={DeleteAllWallets}
              >
                Delete All Wallets
              </button>
            )}
          </>
        )}

        {wallets.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg text-gray-700 font-medium mb-2">
              Your Ethereum Wallets
            </h2>
            <ul>
              {wallets.map((wallet, index) => {
                return (
                  <li
                    key={index}
                    className="mb-4 p-4 bg-white rounded-md shadow-sm text-gray-800 overflow-auto"
                  >
                    <h2 className=" text-xl font-medium m-1  ">
                      Wallet {index + 1}
                    </h2>
                    <p>
                      <span className="font-medium text-gray-700">
                        Public Key:
                      </span>{" "}
                      {wallet.address}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Private Key:
                      </span>{" "}
                      {wallet.privateKey}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
