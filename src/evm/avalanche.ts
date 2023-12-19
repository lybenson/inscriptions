//

import { avalanche } from 'viem/chains'
import { accounts } from './core/account'
import { run } from './core/inscription'
import 'dotenv/config'

for (let i = 0; i < accounts.length; i++) {
  run({
    account: accounts[i],
    chain: avalanche,
    rpc: 'https://rpc.ankr.com/avalanche',
    data: `data:,{"p":"asc-20","op":"mint","tick":"dino","amt":"100000000"}`,
    runs: 100, // or zero, means infinite
    booster: {
      numerator: 1,
      denominator: 1
    },
    suspend: 2000
  })
}
