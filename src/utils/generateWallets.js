import { generateMnemonic, mnemonicToSeedSync } from "bip39";

export const getMnemonic =  () => {
  const mnemonicPhrase =  generateMnemonic();
  const seed = mnemonicToSeedSync(mnemonicPhrase);
  return { mnemonicPhrase, seed };
};

export const generateWallet = (seed, wallet) => {};
