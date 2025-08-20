import { useCallback, useMemo, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { parseUnits, formatUnits, maxUint256 } from 'viem';
import routerAbi from '@/abi/uniswapV2Router02.json';
import erc20Abi from '@/abi/erc20.json';
import { ROUTER_ADDRESS } from '@/lib/addresses';

type Hex = `0x${string}`;

export function useDex() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|undefined>();
  const [txHash, setTxHash] = useState<Hex|undefined>();

  const readAmountOut = useCallback(async (amountIn: string, path: Hex[], decimalsIn = 18) => {
    setError(undefined);
    try {
      const amtInWei = parseUnits(amountIn || '0', decimalsIn);
      const amounts: bigint[] = await publicClient!.readContract({
        address: ROUTER_ADDRESS,
        abi: routerAbi as any,
        functionName: 'getAmountsOut',
        args: [amtInWei, path],
      }) as any;
      return amounts[amounts.length - 1];
    } catch (e:any) {
      setError(e.message);
      return 0n;
    }
  }, [publicClient]);

  const approveIfNeeded = useCallback(async (token: Hex, owner: Hex, spender: Hex, amount: bigint) => {
    const allowance: bigint = await publicClient!.readContract({
      address: token,
      abi: erc20Abi as any,
      functionName: 'allowance',
      args: [owner, spender],
    }) as any;
    if (allowance >= amount) return;

    const hash = await walletClient!.writeContract({
      address: token,
      abi: erc20Abi as any,
      functionName: 'approve',
      args: [spender, maxUint256],
    });
    await publicClient!.waitForTransactionReceipt({ hash });
  }, [publicClient, walletClient]);

  const swapExactTokensForTokens = useCallback(async (amountIn: string, amountOutMin: string, path: Hex[], to?: Hex, deadlineSecs = 1200, decimalsIn = 18, decimalsOut = 18) => {
    setLoading(true); setError(undefined); setTxHash(undefined);
    try {
      if (!walletClient || !address) throw new Error('Wallet not connected');
      const amtIn = parseUnits(amountIn, decimalsIn);
      const minOut = parseUnits(amountOutMin, decimalsOut);
      await approveIfNeeded(path[0], address, ROUTER_ADDRESS, amtIn);

      const deadline = BigInt(Math.floor(Date.now()/1000 + deadlineSecs));
      const hash = await walletClient.writeContract({
        address: ROUTER_ADDRESS,
        abi: routerAbi as any,
        functionName: 'swapExactTokensForTokens',
        args: [amtIn, minOut, path, (to ?? address) as Hex, deadline],
      });
      setTxHash(hash);
      const receipt = await publicClient!.waitForTransactionReceipt({ hash });
      setLoading(false);
      return receipt;
    } catch (e:any) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, [walletClient, publicClient, address, approveIfNeeded]);

  const addLiquidity = useCallback(async (tokenA: Hex, tokenB: Hex, amountA: string, amountB: string, amountAMinPct = 0.98, amountBMinPct = 0.98, to?: Hex, deadlineSecs = 1200, decimalsA = 18, decimalsB = 18) => {
    setLoading(true); setError(undefined); setTxHash(undefined);
    try {
      if (!walletClient || !address) throw new Error('Wallet not connected');
      const amtA = parseUnits(amountA, decimalsA);
      const amtB = parseUnits(amountB, decimalsB);
      await approveIfNeeded(tokenA, address, ROUTER_ADDRESS, amtA);
      await approveIfNeeded(tokenB, address, ROUTER_ADDRESS, amtB);
      const minA = BigInt(amtA * BigInt(Math.floor(amountAMinPct*100)) // percent
      // typescript will complain; perform precise math
      );
      const minB = BigInt(amtB * BigInt(Math.floor(amountBMinPct*100)));
      const deadline = BigInt(Math.floor(Date.now()/1000 + deadlineSecs));
      const hash = await walletClient.writeContract({
        address: ROUTER_ADDRESS,
        abi: routerAbi as any,
        functionName: 'addLiquidity',
        args: [tokenA, tokenB, amtA, amtB, minA//100n, minB//100n, (to ?? address) as Hex, deadline],
      } as any);
      setTxHash(hash);
      const receipt = await publicClient!.waitForTransactionReceipt({ hash });
      setLoading(false);
      return receipt;
    } catch (e:any) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, [walletClient, publicClient, address, approveIfNeeded]);

  const removeLiquidity = useCallback(async (tokenA: Hex, tokenB: Hex, liquidity: string, amountAMin: string, amountBMin: string, to?: Hex, deadlineSecs = 1200, decimals = 18) => {
    setLoading(true); setError(undefined); setTxHash(undefined);
    try {
      if (!walletClient || !address) throw new Error('Wallet not connected');
      const liq = parseUnits(liquidity, decimals);
      const minA = parseUnits(amountAMin, 18);
      const minB = parseUnits(amountBMin, 18);
      const deadline = BigInt(Math.floor(Date.now()/1000 + deadlineSecs));
      const hash = await walletClient.writeContract({
        address: ROUTER_ADDRESS,
        abi: routerAbi as any,
        functionName: 'removeLiquidity',
        args: [tokenA, tokenB, liq, minA, minB, (to ?? address) as Hex, deadline],
      });
      setTxHash(hash);
      const receipt = await publicClient!.waitForTransactionReceipt({ hash });
      setLoading(false);
      return receipt;
    } catch (e:any) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, [walletClient, publicClient, address]);

  return { readAmountOut, swapExactTokensForTokens, addLiquidity, removeLiquidity, loading, error, txHash };
}
