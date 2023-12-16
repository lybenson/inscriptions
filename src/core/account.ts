import { Hex } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const secrets: Hex[] = (process.env.SECRETS || '').split(',') as Hex[]

export const accounts = secrets.map((secret) => {
  return privateKeyToAccount(secret)
})
