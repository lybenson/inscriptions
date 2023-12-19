import { CreateClient } from './core/client'
import { run } from './core/inscription'
import { CreateWalletUnion } from './core/wallet'

const main = async () => {
  const walletUnion = await CreateWalletUnion('inj', 2)

  if (!walletUnion || !walletUnion.wallet) return

  const client = await CreateClient('https://...', walletUnion.wallet)

  const accounts = await walletUnion.wallet.getAccounts()

  for (let i = 0; i < accounts.length; i++) {
    run({
      client,
      account: accounts[0],
      denom: 'uinj',
      memo: 'data:,{"p":"injrc-20","op":"deploy","tick":"INJS","max":"1000000000","lim":"2000"}',
      coinAmount: 30000,
      gas: 80000,
      to: 'inj15jy9vzmyy63ql9y6dvned2kdat2994x5f4ldu4'
    })
  }
}

main()
