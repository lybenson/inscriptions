import { createClient } from './client'
import { Account, Chain, Hex, toHex } from 'viem'
import { setTimeout } from 'node:timers/promises'

export type Fraction = {
  numerator: number
  denominator: number
}

export const run = async (
  account: Account,
  chain: Chain,
  rpc: string,
  data: string | Hex,
  booster: number = 1,
  suspend: number = 0
) => {
  const { publicClient, walletClient } = createClient(account, rpc)

  let nonce = await publicClient.getTransactionCount({
    address: account.address
  })
  console.log(`init nonce = ${nonce}`)
  const withData: Hex = data.startsWith('0x') ? (data as Hex) : toHex(data)

  const boosterFraction: Fraction = {
    numerator: 1,
    denominator: 1
  }
  console.log(`booster = ${booster}`)

  while (true) {
    try {
      const gasPrice = await publicClient.getGasPrice()

      const hash = await walletClient.sendTransaction({
        to: account.address,
        chain,
        gasPrice:
          (gasPrice * BigInt(boosterFraction.numerator)) /
          BigInt(boosterFraction.denominator),
        nonce,
        data: withData
      })
      console.log(`gasPrice = ${gasPrice}, nonce = ${nonce}, hash = ${hash}`)
      nonce += 1
      if (suspend > 0) {
        await setTimeout(suspend)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
