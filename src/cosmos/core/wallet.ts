import {
  DirectSecp256k1HdWallet,
  makeCosmoshubPath
} from '@cosmjs/proto-signing'
import { HdPath } from '@cosmjs/crypto'

const mnemonic = process.env.MNEMONIC

export interface WalletUnion {
  wallet: DirectSecp256k1HdWallet | undefined
  size: number
}

export const CreateWalletUnion = async (
  prefix: string,
  size: number
): Promise<WalletUnion> => {
  let wallet = undefined
  if (mnemonic) {
    const hdPaths: HdPath[] = []
    for (let i = 0; i < size; i++) {
      hdPaths.push(makeCosmoshubPath(i))
    }
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix,
      hdPaths: hdPaths
    })
  }

  return {
    wallet,
    size
  }
}
