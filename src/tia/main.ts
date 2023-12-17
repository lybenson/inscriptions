import {
  DirectSecp256k1Wallet,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DirectSecp256k1HdWallet
} from '@cosmjs/proto-signing'
import { SigningStargateClient, coins } from '@cosmjs/stargate'
import { base64FromBytes } from 'cosmjs-types/helpers'

import 'dotenv/config'

// rpc-celestia.alphab.ai
// rpc-celestia-full.avril14th.org
// rpc-celestia.contributiondao.com
// celestia.cumulo.org.es

const endpoint = 'https://rpc-celestia-full.avril14th.org'

const main = async (): Promise<void> => {
  // generate from secret
  const wallet: DirectSecp256k1Wallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(process.env.SECRETS!, 'hex'),
    'celestia'
  )
  // or generate from mnemonic
  // const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
  //   '', // mnemonic, seperate by space
  //   {
  //     prefix: 'celestia'
  //   }
  // )

  const [account] = await wallet.getAccounts()

  const client = await SigningStargateClient.connectWithSigner(endpoint, wallet)

  const balance = await client.getBalance(account.address, 'utia')

  console.log(
    `You account ${account.address} init balance is ${
      parseFloat(balance.amount) / 1000000
    }`
  )

  const amount = coins(100, 'utia')
  const memo = 'data:,{"op":"mint","amt":10000,"tick":"cias","p":"cia-20"}'

  const fee = {
    amount: coins(8000, 'utia'),
    gas: '80000'
  }

  while (true) {
    try {
      const result = await client.sendTokens(
        account.address,
        account.address,
        amount,
        fee,
        base64FromBytes(Buffer.from(memo, 'utf-8'))
      )
      console.log(result.transactionHash)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }
}

main()
