import * as bip39 from "@scure/bip39";
import * as english from "@scure/bip39/wordlists/english";
import { WalletClient } from "@martiandao/aptos-web3-bip44.js";
import { Buffer } from "buffer";
window.Buffer = Buffer;
export async function importWallet(code) {
  if (!bip39.validateMnemonic(code, english.wordlist)) {
    return Promise.reject(new Error("Incorrect mnemonic passed"));
  }
  const account = WalletClient.getAccountFromMnemonic(code);
  return [account.toPrivateKeyObject()];
}
