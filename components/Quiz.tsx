'use client';

import { useMemo, useState } from 'react';
import { useWriteContract } from 'wagmi';

const logos = [
  { emoji: '🦊', name: 'MetaMask' },
  { emoji: '🟣', name: 'Celo' },
  { emoji: '🔵', name: 'Circle' },
  { emoji: '🟩', name: 'Greenpill' }
];

const abi = [
  {
    "inputs": [{ "internalType": "uint256", "name": "score", "type": "uint256" }],
    "name": "submitScore",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState('');
  const { writeContractAsync } = useWriteContract();

  const current = logos[index];
  const options = useMemo(() => [...logos].sort(() => Math.random() - 0.5).map((x) => x.name), [index]);

  async function answer(choice: string) {
    const correct = choice === current.name;
    if (correct) setScore((s) => s + 1);

    if (index + 1 >= logos.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  async function submit() {
    const address = process.env.NEXT_PUBLIC_SCORE_CONTRACT_ADDRESS as `0x${string}` | undefined;
    if (!address) {
      setStatus('Missing NEXT_PUBLIC_SCORE_CONTRACT_ADDRESS');
      return;
    }

    try {
      setStatus('Submitting score...');
      await writeContractAsync({ address, abi, functionName: 'submitScore', args: [BigInt(score)] });
      setStatus('Score submitted successfully!');
    } catch {
      setStatus('Failed to submit score. Check wallet/network.');
    }
  }

  if (done) {
    return (
      <div>
        <h2>Quiz finished</h2>
        <p>Your score: {score} / {logos.length}</p>
        <button onClick={submit}>Submit Score On-Chain</button>
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Logo Quiz</h2>
      <p style={{ fontSize: 48 }}>{current.emoji}</p>
      <p>Question {index + 1} of {logos.length}</p>
      {options.map((opt) => (
        <button key={opt} onClick={() => answer(opt)} style={{ display: 'block', marginBottom: 8 }}>
          {opt}
        </button>
      ))}
      <p>Current score: {score}</p>
    </div>
  );
}
