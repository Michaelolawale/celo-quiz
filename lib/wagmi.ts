import { createConfig, http } from 'wagmi';
import { celoSepolia } from 'wagmi/chains';

export const config = createConfig({
  chains: [celoSepolia],
  transports: {
    [celoSepolia.id]: http(process.env.NEXT_PUBLIC_CELO_RPC_URL || 'https://forno.celo.org')
  }
});
