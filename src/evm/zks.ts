import { zkSync } from 'viem/chains'
import { accounts } from './core/account'
import { run } from './core/inscription'
import 'dotenv/config'

for (let i = 0; i < accounts.length; i++) {
  run({
    account: accounts[i],
    chain: zkSync,
    rpc: '',
    data: 'data,',
    runs: 100,
    booster: {
      numerator: 1,
      denominator: 1
    },
    suspend: 2000
  })
}
