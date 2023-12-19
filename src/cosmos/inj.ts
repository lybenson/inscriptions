import 'dotenv/config'
import { CreateClient } from './core/client'
import { run } from './core/inscription'
import { CreateWallet } from './core/wallet'

const main = async () => {
  const wallet = await CreateWallet('inj')

  if (!wallet) return

  const client = await CreateClient('https://...', wallet)

  const accounts = await wallet.getAccounts()

  for (let i = 0; i < accounts.length; i++) {
    run({
      client,
      account: accounts[i],
      denom: 'uinj',
      memo: 'data:,{"p":"injrc-20","op":"deploy","tick":"INJS","max":"1000000000","lim":"2000"}',
      coinAmount: 30000,
      gas: 80000,
      to: 'inj15jy9vzmyy63ql9y6dvned2kdat2994x5f4ldu4'
    })
  }
}

main()
