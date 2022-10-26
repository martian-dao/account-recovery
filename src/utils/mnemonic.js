import { WalletClient } from "@martiandao/aptos-web3-bip44-recovery.js";
import { WalletClient as WalletClientCurrent } from "@martiandao/aptos-web3-bip44.js";

import { Buffer } from "buffer";
window.Buffer = Buffer;

const DERIVATION_PATH_1 = "m/44'/123420'/I'/0/J";
const DERIVATION_PATH_2 = "m/44'/637'/I'/0/J";
const DERIVATION_PATH_3 = "m/44'/637'/I'/0'/J'";

const walletClient = new WalletClient(
  "https://rpc.mainnet.aptos.fernlabs.xyz/v1",
  "dummy"
);
const walletClientCurrent = new WalletClientCurrent(
  "https://rpc.mainnet.aptos.fernlabs.xyz/v1",
  "dummy"
);

export async function importWallet(code) {
  const account1 = await walletClient.importWallet(code, DERIVATION_PATH_1);
  const account2 = await walletClient.importWallet(code, DERIVATION_PATH_2);
  const account3 = await walletClient.importWallet(code, DERIVATION_PATH_3);
  let account4 = { accounts: [] };
  try {
    account4 = await walletClientCurrent.importWallet(code);
  } catch (err) {
    console.error(err);
  }

  return [
    ...account1.accounts,
    ...account2.accounts,
    ...account3.accounts,
    ...account4.accounts,
  ];
}
