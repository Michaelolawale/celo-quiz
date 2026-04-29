# Celo Quiz

## Setup

1. Install deps: `npm install`
2. Create `.env`:

```
PRIVATE_KEY=0x...
CELO_SEPOLIA_RPC_URL=https://alfajores-forno.celo-testnet.org
NEXT_PUBLIC_CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
NEXT_PUBLIC_SCORE_CONTRACT_ADDRESS=0x...
```

## Deploy to Celo Sepolia

```bash
npx hardhat run scripts/deploy.js --network celoSepolia
```

Copy deployed address to `NEXT_PUBLIC_SCORE_CONTRACT_ADDRESS`.

## Run app

```bash
npm run dev
```

Open `http://localhost:3000` and complete the logo quiz. Click **Submit Score On-Chain** to call `submitScore`.
