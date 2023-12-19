import { Account, Hex } from 'viem'
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts'

const secrets: Hex[] = (process.env.SECRETS || '').split(',') as Hex[]
const mnemonic = process.env.MNEMONIC

let accounts: Account[] = []
if (mnemonic) {
  const size: number = Number(process.env.MNEMONIC_ACCOUNT_SIZE || 1)

  for (let i = 0; i < size; i++) {
    accounts.push(
      mnemonicToAccount(mnemonic, {
        addressIndex: i
      })
    )
  }
} else {
  accounts = secrets.map((secret) => {
    if (secret.startsWith('0x')) return privateKeyToAccount(secret)
    return privateKeyToAccount(`0x${secret}`)
  })
}

export { accounts }
