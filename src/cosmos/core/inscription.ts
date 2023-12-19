import { SigningStargateClient, coins } from '@cosmjs/stargate'
import { base64FromBytes } from 'cosmjs-types/helpers'
import 'dotenv/config'
import { AccountData } from '@cosmjs/proto-signing'
import { setTimeout } from 'timers/promises'

interface RunConfig {
  client: SigningStargateClient
  account: AccountData
  denom: string
  memo: string
  to?: string
  coinAmount?: number
  gas?: number
  runs?: number
  suspend?: number
}

export const run = async ({
  client,
  account,
  denom,
  memo,
  to = account.address,
  coinAmount = 0,
  gas = 80000,
  runs = 0,
  suspend = 0
}: RunConfig): Promise<void> => {
  if (!account || !client) return

  const balance = await client.getBalance(account.address, denom)

  console.log(
    `You account ${account.address} init balance is ${
      parseFloat(balance.amount) / 1000000
    }`
  )

  const amount = coins(coinAmount, denom)

  const fee = {
    amount: coins(gas / 10, denom),
    gas: String(gas)
  }

  let times = 0
  while (runs === 0 ? true : times < runs) {
    try {
      const tx = await client.sendTokens(
        account.address,
        to,
        amount,
        fee,
        base64FromBytes(Buffer.from(memo, 'utf-8'))
      )
      console.log(`${tx.transactionHash}: ${tx.transactionHash}`)

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
