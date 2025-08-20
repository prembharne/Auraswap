import { RequestHandler } from "express";
import { SwapRequest, SwapResponse, SwapQuoteRequest, SwapQuoteResponse } from "@shared/api";

// Mock price data for swaps
const tokenPrices: Record<string, number> = {
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

// Mock liquidity pools for price impact calculation
const mockPools = new Map([
  ["ETH-USDC", { reserve0: 1000, reserve1: 2485320, fee: 0.003 }],
  ["BTC-USDC", { reserve0: 100, reserve1: 4325000, fee: 0.003 }],
  ["ETH-BTC", { reserve0: 1000, reserve1: 57.5, fee: 0.003 }],
  ["SOL-USDC", { reserve0: 5000, reserve1: 477500, fee: 0.003 }],
  ["ADA-USDC", { reserve0: 100000, reserve1: 45000, fee: 0.003 }],
]);

function calculateSwapOutput(fromToken: string, toToken: string, inputAmount: number): {
  output: number;
  priceImpact: number;
  fee: number;
} {
  const fromPrice = tokenPrices[fromToken];
  const toPrice = tokenPrices[toToken];
  
  if (!fromPrice || !toPrice) {
    throw new Error("Token not supported");
  }

  // Basic AMM calculation (simplified)
  const baseOutput = (inputAmount * fromPrice) / toPrice;
  
  // Calculate price impact (simplified - in reality would use actual pool reserves)
  const poolKey = `${fromToken}-${toToken}`;
  const reversePoolKey = `${toToken}-${fromToken}`;
  const pool = mockPools.get(poolKey) || mockPools.get(reversePoolKey);
  
  let priceImpact = 0;
  let fee = 0;
  
  if (pool) {
    // Simplified price impact calculation
    const inputUsdValue = inputAmount * fromPrice;
    const poolSize = pool.reserve1; // Assume USDC reserve
    priceImpact = Math.min((inputUsdValue / poolSize) * 100, 15); // Max 15% impact
    fee = baseOutput * pool.fee;
  } else {
    // If no direct pool, assume higher impact for indirect routing
    priceImpact = 0.5;
    fee = baseOutput * 0.005; // 0.5% fee for routing
  }

  const output = baseOutput - fee;

  return { output, priceImpact, fee };
}

export const getSwapQuote: RequestHandler = (req, res) => {
  try {
    const { fromToken, toToken, amount }: SwapQuoteRequest = req.body;

    if (!fromToken || !toToken || !amount || amount <= 0) {
      return res.status(400).json({
        error: "Invalid request parameters"
      });
    }

    const { output, priceImpact, fee } = calculateSwapOutput(fromToken, toToken, amount);
    
    const quote: SwapQuoteResponse = {
      estimatedOutput: output,
      priceImpact,
      minimumOutput: output * 0.995, // 0.5% slippage tolerance
      fee,
      route: [fromToken, toToken] // Simplified routing
    };

    res.json(quote);
  } catch (error) {
    console.error("Get swap quote error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to calculate swap quote"
    });
  }
};

export const executeSwap: RequestHandler = (req, res) => {
  try {
    const { fromToken, toToken, amount, slippage, userAddress }: SwapRequest = req.body;

    if (!fromToken || !toToken || !amount || !userAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      } as SwapResponse);
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Amount must be greater than zero"
      } as SwapResponse);
    }

    // Calculate swap output
    const { output, priceImpact, fee } = calculateSwapOutput(fromToken, toToken, amount);

    // Check slippage tolerance
    const maxSlippage = slippage || 0.5; // Default 0.5%
    if (priceImpact > maxSlippage) {
      return res.status(400).json({
        success: false,
        error: `Price impact (${priceImpact.toFixed(2)}%) exceeds slippage tolerance (${maxSlippage}%)`
      } as SwapResponse);
    }

    // Mock transaction execution
    // In a real app, this would interact with blockchain
    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    const response: SwapResponse = {
      success: true,
      transactionHash,
      estimatedOutput: output,
      priceImpact,
      fee
    };

    // Log the swap for analytics
    console.log(`Swap executed: ${amount} ${fromToken} -> ${output} ${toToken} by ${userAddress}`);

    res.json(response);
  } catch (error) {
    console.error("Execute swap error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as SwapResponse);
  }
};

export const getSwapHistory: RequestHandler = (req, res) => {
  try {
    const { userAddress } = req.params;
    
    // Mock swap history
    const swapHistory = [
      {
        id: "swap_1",
        fromToken: "ETH",
        toToken: "USDC",
        fromAmount: 1.0,
        toAmount: 2485.32,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        status: "completed"
      },
      {
        id: "swap_2", 
        fromToken: "USDC",
        toToken: "SOL",
        fromAmount: 500.0,
        toAmount: 5.23,
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        status: "completed"
      }
    ];

    res.json(swapHistory);
  } catch (error) {
    console.error("Get swap history error:", error);
    res.status(500).json({
      error: "Failed to fetch swap history"
    });
  }
};

export const getSupportedTokens: RequestHandler = (req, res) => {
  try {
    const supportedTokens = Object.keys(tokenPrices).map(symbol => ({
      symbol,
      name: getTokenName(symbol),
      price: tokenPrices[symbol],
      icon: getTokenIcon(symbol)
    }));

    res.json(supportedTokens);
  } catch (error) {
    console.error("Get supported tokens error:", error);
    res.status(500).json({
      error: "Failed to fetch supported tokens"
    });
  }
};

function getTokenName(symbol: string): string {
  const names: Record<string, string> = {
    "ETH": "Ethereum",
    "BTC": "Bitcoin", 
    "USDC": "USD Coin",
    "USDT": "Tether",
    "ADA": "Cardano",
    "SOL": "Solana",
    "MATIC": "Polygon",
    "LINK": "Chainlink",
    "DOT": "Polkadot",
    "AVAX": "Avalanche"
  };
  return names[symbol] || symbol;
}

function getTokenIcon(symbol: string): string {
  const icons: Record<string, string> = {
    "ETH": "🔷",
    "BTC": "🟠",
    "USDC": "💵",
    "USDT": "🟢",
    "ADA": "🔵",
    "SOL": "🟣",
    "MATIC": "🟪",
    "LINK": "🔗",
    "DOT": "⚫",
    "AVAX": "🔴"
  };
  return icons[symbol] || "⚪";
}
