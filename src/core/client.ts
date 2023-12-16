import { Account, createPublicClient, createWalletClient, http } from 'viem'

export const createClient = (account: Account, rpc: string) => {
  return {
    publicClient: createPublicClient({
      transport: http(rpc)
    }),
    walletClient: createWalletClient({
      account,
      transport: http(rpc)
    })
  }
}
