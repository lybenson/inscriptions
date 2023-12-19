import { createClient } from './client'
import { Account, Chain, Hex, toHex } from 'viem'
import { setTimeout } from 'node:timers/promises'

export type Fraction = {
  numerator: number
  denominator: number
}

interface RunConfig {
  /**
   * user account
   */
  account: Account
  /**
   * chain
   */
  chain: Chain
  /**
   * rpc url
   */
  rpc: string
  /**
   * inscription data: text or hex, start with 0x if use hex
   */
  data: string | Hex
  /**
   * run count, or zero, means infinite
   */
  runs?: number
  /**
   * gas price booster, should be greater than 1
   */
  booster?: Fraction
  /**
   * suspend time in milliseconds
   */
  suspend?: number
}

export const run = async ({
  account,
  chain,
  rpc,
  data,
  runs = 0,
  booster = {
    numerator: 1,
    denominator: 1
  },
  suspend = 0
}: RunConfig) => {
  const { publicClient, walletClient } = createClient(account, rpc)

  let nonce = await publicClient.getTransactionCount({
    address: account.address
  })
  console.log(`init nonce = ${nonce}`)

  const withData: Hex = data.startsWith('0x') ? (data as Hex) : toHex(data)
  console.log(`data: ${withData}`)

  let times = 0
  while (runs === 0 ? true : times < runs) {
    try {
      const gasPrice = await publicClient.getGasPrice()

      const hash = await walletClient.sendTransaction({
        to: account.address,
        chain,
        gasPrice:
          (gasPrice * BigInt(booster.numerator)) / BigInt(booster.denominator),
        nonce,
        data: withData
      })
      console.log(`${times}: nonce = ${nonce}, hash = ${hash}`)
      nonce += 1
      if (suspend > 0) {
        await setTimeout(suspend)
      }
    } catch (error) {
      console.log(error)
    } finally {
      times += 1
    }
  }
}
