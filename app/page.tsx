'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Quiz from '../components/Quiz';
import { config } from '../lib/wagmi';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <h1>Celo Logo Quiz</h1>
        <Quiz />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
