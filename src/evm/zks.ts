import { zkSync } from 'viem/chains'
import { accounts } from './core/account'
import { run } from './core/inscription'
import 'dotenv/config'

accounts.forEach((account) => {
  run(account, zkSync, '', '')
})
