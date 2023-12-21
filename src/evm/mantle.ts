import 'dotenv/config'
import { mantle } from 'viem/chains'
import { accounts } from './core/account'
import { run } from './core/inscription'

for (let i = 0; i < accounts.length; i++) {
  run({
    account: accounts[i],
    chain: mantle,
    rpc: 'https://rpc.mantle.xyz',
    data: `data:,{"p":"mrc-20","op":"mint","tick":"born","amt":"1000"}`,
    runs: 200, // or zero, means infinite
    booster: {
      numerator: 1,
      denominator: 1
    },
    suspend: 0
  })
}
