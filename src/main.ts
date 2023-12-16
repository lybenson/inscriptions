import 'dotenv/config'
import { setTimeout } from 'node:timers/promises'

console.log(process.env.PROVIDER_URL)

const main = async () => {
  const x = await setTimeout(2000, '12323')

  console.log(x)
}

main()
