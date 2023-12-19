# 环境

安装 nodejs 18.16 版本, pnpm(可选)

安装依赖

```shell
npm i
# or pnpm i
```

创建 `.env` 文件, 并复制 `.env.sample` 文件内容到 `.env` 中, 并填入下面的内容

```
# 助记词
MNEMONIC=
# 助记词生成的账号数量
MNEMONIC_ACCOUNT_SIZE=

# 私钥, 多私钥时用逗号隔开
SECRETS=
```

注: 同时存在助记词和私钥时, 助记词优先, 默认情况下, 助记词生成的账号数量为1

# 运行

在 `src/evm` 目录下创建对应链的文件。以 `avalanche.ts` 为例

```ts
import { avalanche } from 'viem/chains'
import { accounts } from './core/account'
import { run } from './core/inscription'
import 'dotenv/config'

// 循环多账号
for (let i = 0; i < accounts.length; i++) {
  // 开始发送交易
  run({
    account: accounts[i],
    chain: avalanche,
    rpc: 'https://rpc.ankr.com/avalanche',
    data: `data:,{"p":"asc-20","op":"mint","tick":"dino","amt":"100000000"}`,
    runs: 100, // 运行次数, 0时表示无限次
    booster: {
      // 对 gasprice 的加价, 应大于1
      numerator: 1,
      denominator: 1
    },
    suspend: 2000 // 每次交易暂停时间
  })
}
```

执行命令

```
npx ts-node src/evm/avalanche.ts
```
