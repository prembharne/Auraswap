import { RequestHandler } from "express";
import { LiquidityPool, AddLiquidityRequest, RemoveLiquidityRequest } from "@shared/api";

// Mock liquidity pools data
const liquidityPools: LiquidityPool[] = [
  {
    id: "eth-usdc",
    token0: "ETH",
    token1: "USDC", 
    reserve0: 1000.5,
    reserve1: 2487320.15,
    totalSupply: 15750.25,
    fee: 0.003,
    apr: 24.5,
    volume24h: 2300000
  },
  {
    id: "btc-usdc",
    token0: "BTC",
    token1: "USDC",
    reserve0: 189.75,
    reserve1: 8205000.50,
    totalSupply: 12850.75,
    fee: 0.003,
    apr: 18.7,
    volume24h: 1800000
  },
  {
    id: "eth-btc",
    token0: "ETH", 
    token1: "BTC",
    reserve0: 2450.25,
    reserve1: 140.85,
    totalSupply: 5825.50,
    fee: 0.003,
    apr: 31.2,
    volume24h: 890000
  },
  {
    id: "sol-usdc",
    token0: "SOL",
    token1: "USDC",
    reserve0: 47250.75,
    reserve1: 4512750.25,
    totalSupply: 18920.50,
    fee: 0.003,
    apr: 28.9,
    volume24h: 1250000
  },
  {
    id: "ada-usdc",
    token0: "ADA",
    token1: "USDC",
    reserve0: 2850000.50,
    reserve1: 1282500.25,
    totalSupply: 42750.75,
    fee: 0.003,
    apr: 22.1,
    volume24h: 650000
  }
];

// Mock user positions
const userPositions = new Map<string, Array<{
  poolId: string;
  lpTokens: number;
  token0Amount: number;
  token1Amount: number;
  value: number;
}>>([
  ["0x742d35Cc6647C0532d07dFD87C1e8F164d3D2c70", [
    {
      poolId: "eth-usdc",
      lpTokens: 125.4,
      token0Amount: 7.95,
      token1Amount: 19748.35,
      value: 39496.70
    },
    {
      poolId: "sol-usdc", 
      lpTokens: 45.8,
      token0Amount: 114.5,
      token1Amount: 10929.75,
      value: 21859.50
    }
  ]]
]);

export const getLiquidityPools: RequestHandler = (req, res) => {
  try {
    // Calculate additional metrics
    const poolsWithMetrics = liquidityPools.map(pool => {
      const token0Price = getTokenPrice(pool.token0);
      const token1Price = getTokenPrice(pool.token1);
      
      const tvl = (pool.reserve0 * token0Price) + (pool.reserve1 * token1Price);
      const fees24h = pool.volume24h * pool.fee;
      
      return {
        ...pool,
        tvl,
        fees24h
      };
    });

    res.json(poolsWithMetrics);
  } catch (error) {
    console.error("Get liquidity pools error:", error);
    res.status(500).json({
      error: "Failed to fetch liquidity pools"
    });
  }
};

export const getLiquidityPool: RequestHandler = (req, res) => {
  try {
    const { poolId } = req.params;
    const pool = liquidityPools.find(p => p.id === poolId);
    
    if (!pool) {
      return res.status(404).json({
        error: "Pool not found"
      });
    }

    const token0Price = getTokenPrice(pool.token0);
    const token1Price = getTokenPrice(pool.token1);
    const tvl = (pool.reserve0 * token0Price) + (pool.reserve1 * token1Price);
    const fees24h = pool.volume24h * pool.fee;

    res.json({
      ...pool,
      tvl,
      fees24h,
      token0Price,
      token1Price
    });
  } catch (error) {
    console.error("Get liquidity pool error:", error);
    res.status(500).json({
      error: "Failed to fetch liquidity pool"
    });
  }
};

export const addLiquidity: RequestHandler = (req, res) => {
  try {
    const { poolId, amount0, amount1, userAddress }: AddLiquidityRequest = req.body;

    if (!poolId || !amount0 || !amount1 || !userAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      });
    }

    const pool = liquidityPools.find(p => p.id === poolId);
    if (!pool) {
      return res.status(404).json({
        success: false,
        error: "Pool not found"
      });
    }

    // Calculate LP tokens to mint (simplified)
    // In real AMM: lpTokens = min(amount0/reserve0, amount1/reserve1) * totalSupply
    const ratio0 = amount0 / pool.reserve0;
    const ratio1 = amount1 / pool.reserve1;
    const lpTokensToMint = Math.min(ratio0, ratio1) * pool.totalSupply;

    // Update pool reserves (in real app, this would be done by smart contract)
    pool.reserve0 += amount0;
    pool.reserve1 += amount1;
    pool.totalSupply += lpTokensToMint;

    // Update user positions
    const userPositionsList = userPositions.get(userAddress) || [];
    const existingPosition = userPositionsList.find(p => p.poolId === poolId);
    
    if (existingPosition) {
      existingPosition.lpTokens += lpTokensToMint;
      existingPosition.token0Amount += amount0;
      existingPosition.token1Amount += amount1;
      existingPosition.value = calculatePositionValue(existingPosition);
    } else {
      userPositionsList.push({
        poolId,
        lpTokens: lpTokensToMint,
        token0Amount: amount0,
        token1Amount: amount1,
        value: calculatePositionValue({
          poolId,
          lpTokens: lpTokensToMint,
          token0Amount: amount0,
          token1Amount: amount1,
          value: 0
        })
      });
    }
    
    userPositions.set(userAddress, userPositionsList);

    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    res.json({
      success: true,
      transactionHash,
      lpTokensMinted: lpTokensToMint,
      poolShare: (lpTokensToMint / pool.totalSupply) * 100
    });
  } catch (error) {
    console.error("Add liquidity error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const removeLiquidity: RequestHandler = (req, res) => {
  try {
    const { poolId, lpTokenAmount, userAddress }: RemoveLiquidityRequest = req.body;

    if (!poolId || !lpTokenAmount || !userAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      });
    }

    const pool = liquidityPools.find(p => p.id === poolId);
    if (!pool) {
      return res.status(404).json({
        success: false,
        error: "Pool not found"
      });
    }

    const userPositionsList = userPositions.get(userAddress) || [];
    const position = userPositionsList.find(p => p.poolId === poolId);

    if (!position || position.lpTokens < lpTokenAmount) {
      return res.status(400).json({
        success: false,
        error: "Insufficient LP tokens"
      });
    }

    // Calculate tokens to return
    const shareOfPool = lpTokenAmount / pool.totalSupply;
    const token0ToReturn = pool.reserve0 * shareOfPool;
    const token1ToReturn = pool.reserve1 * shareOfPool;

    // Update pool reserves
    pool.reserve0 -= token0ToReturn;
    pool.reserve1 -= token1ToReturn;
    pool.totalSupply -= lpTokenAmount;

    // Update user position
    position.lpTokens -= lpTokenAmount;
    position.token0Amount -= token0ToReturn;
    position.token1Amount -= token1ToReturn;
    position.value = calculatePositionValue(position);

    // Remove position if no LP tokens left
    if (position.lpTokens <= 0) {
      const index = userPositionsList.indexOf(position);
      userPositionsList.splice(index, 1);
    }

    userPositions.set(userAddress, userPositionsList);

    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    res.json({
      success: true,
      transactionHash,
      token0Returned: token0ToReturn,
      token1Returned: token1ToReturn
    });
  } catch (error) {
    console.error("Remove liquidity error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const getUserLiquidityPositions: RequestHandler = (req, res) => {
  try {
    const { userAddress } = req.params;
    const positions = userPositions.get(userAddress) || [];

    // Enrich positions with current pool data
    const enrichedPositions = positions.map(position => {
      const pool = liquidityPools.find(p => p.id === position.poolId);
      return {
        ...position,
        pool: pool ? {
          token0: pool.token0,
          token1: pool.token1,
          apr: pool.apr,
          fee: pool.fee
        } : null
      };
    });

    res.json(enrichedPositions);
  } catch (error) {
    console.error("Get user liquidity positions error:", error);
    res.status(500).json({
      error: "Failed to fetch user positions"
    });
  }
};

// Helper functions
function getTokenPrice(symbol: string): number {
  const prices: Record<string, number> = {
    "ETH": 2485.32,
    "BTC": 43250.00,
    "USDC": 1.00,
    "USDT": 1.00,
    "ADA": 0.45,
    "SOL": 95.50,
    "MATIC": 0.85,
    "LINK": 15.25,
    "DOT": 6.75,
    "AVAX": 25.50
  };
  return prices[symbol] || 0;
}

function calculatePositionValue(position: {
  token0Amount: number;
  token1Amount: number;
  poolId: string;
}): number {
  const pool = liquidityPools.find(p => p.id === position.poolId);
  if (!pool) return 0;

  const token0Price = getTokenPrice(pool.token0);
  const token1Price = getTokenPrice(pool.token1);

  return (position.token0Amount * token0Price) + (position.token1Amount * token1Price);
}
