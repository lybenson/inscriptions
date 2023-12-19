import {
  DirectSecp256k1HdWallet,
  makeCosmoshubPath
} from '@cosmjs/proto-signing'
import { HdPath } from '@cosmjs/crypto'

const mnemonic = process.env.MNEMONIC

export const CreateWallet = async (
  prefix: string
): Promise<DirectSecp256k1HdWallet | undefined> => {
  let wallet = undefined
  const size = Number(process.env.MNEMONIC_ACCOUNT_SIZE || 1)
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

  return wallet
}
