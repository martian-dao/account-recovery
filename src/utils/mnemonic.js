import { WalletClient } from "@martiandao/aptos-web3-bip44.js";
import { Buffer } from "buffer";
window.Buffer = Buffer;
export async function importWallet(code) {
  const account = WalletClient.getAccountFromMnemonic(code);
  return [account.toPrivateKeyObject()];
}
