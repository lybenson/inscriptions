import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { SigningStargateClient } from '@cosmjs/stargate'

export const CreateClient = async (
  endpoint: string,
  wallet: DirectSecp256k1HdWallet
) => {
  return SigningStargateClient.connectWithSigner(endpoint, wallet)
}
