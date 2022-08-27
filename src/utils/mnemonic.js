import { HDKey } from "@scure/bip32";
import * as bip39 from "@scure/bip39";
import * as english from "@scure/bip39/wordlists/english";
import { AptosAccount } from "@martiandao/aptos-web3-bip44.js";
import { Buffer } from "buffer";
const COIN_TYPE = 637;
const MAX_ACCOUNTS = 5;
const ADDRESS_GAP = 10;

const MESSAGE = "This is me."

export async function importWallet(code) {
  let address = "";
  if (!bip39.validateMnemonic(code, english.wordlist)) {
    return Promise.reject(new Error("Incorrect mnemonic passed"));
  }
  const seed = bip39.mnemonicToSeedSync(code.toString());
  const node = HDKey.fromMasterSeed(Buffer.from(seed));
  const metadata = [];

  for (let i = 0; i < MAX_ACCOUNTS; i += 1) {
    for (let j = 0; j < ADDRESS_GAP; j += 1) {
      /* eslint-disable no-await-in-loop */
      const exKey = node.derive(`m/44'/${COIN_TYPE}'/${i}'/0/${j}`);
      let acc = new AptosAccount(exKey.privateKey);
      address = acc.authKey().toString();
      const signature = acc.signBuffer(Buffer.from(MESSAGE)).hex()
      /* eslint-enable no-await-in-loop */
      metadata.push({
        address: address,
        publicKey: acc.pubKey().toString(),
        signature: signature
      });
    }
  }
  return metadata;
}
