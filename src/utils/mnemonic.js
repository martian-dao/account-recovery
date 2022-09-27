import { HDKey } from "@scure/bip32";
import * as bip39 from "@scure/bip39";
import * as english from "@scure/bip39/wordlists/english";
import { AptosAccount } from "@martiandao/aptos-web3-bip44.js";
import { Buffer } from "buffer";
const COIN_TYPE = 637;
const MAX_ACCOUNTS = 5;
const ADDRESS_GAP = 10;

export async function importWallet(code, address) {
  if (!bip39.validateMnemonic(code, english.wordlist)) {
    return Promise.reject(new Error("Incorrect mnemonic passed"));
  }
  const seed = bip39.mnemonicToSeedSync(code.toString());
  const node = HDKey.fromMasterSeed(Buffer.from(seed));
  const metadata = [];

  for (let i = 0; i < MAX_ACCOUNTS; i += 1) {
    let found = false;
    for (let j = 0; j < ADDRESS_GAP; j += 1) {
      /* eslint-disable no-await-in-loop */
      const exKey = node.derive(`m/44'/${COIN_TYPE}'/${i}'/0/${j}`);
      let acc = new AptosAccount(exKey.privateKey);
      const pkObject = acc.toPrivateKeyObject();
      if (pkObject.address === address) {
        /* eslint-enable no-await-in-loop */
        metadata.push(pkObject);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
  return metadata;
}
