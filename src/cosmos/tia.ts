import { CreateClient } from './core/client'
import { run } from './core/inscription'
import { CreateWalletUnion } from './core/wallet'

const main = async () => {
  const walletUnion = await CreateWalletUnion('celestia', 2)

  if (!walletUnion || !walletUnion.wallet) return

  const client = await CreateClient(
    'https://rpc-celestia-full.avril14th.org',
    walletUnion.wallet
  )
  const accounts = await walletUnion.wallet.getAccounts()

  for (let i = 0; i < accounts.length; i++) {
    run({
      client,
      account: accounts[0],
      denom: 'utia',
      memo: 'data:,{"op":"mint","amt":10000,"tick":"cias","p":"cia-20"}',
      coinAmount: 100,
      gas: 80000
    })
  }
}

main()
