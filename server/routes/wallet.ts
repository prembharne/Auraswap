import { RequestHandler } from "express";
import { WalletConnectionRequest, WalletConnectionResponse, UserPortfolio } from "@shared/api";

// Mock user database
const users = new Map<string, {
  id: string;
  address: string;
  balance: Record<string, number>;
}>();

// Mock balances for demonstration
const mockBalances = {
  "ETH": 2.45,
  "BTC": 0.15,
  "USDC": 1250.00,
  "USDT": 500.00,
  "ADA": 850.00,
  "SOL": 25.5,
  "MATIC": 450.00,
  "LINK": 75.25,
  "DOT": 120.00,
  "AVAX": 15.75
};

export const connectWallet: RequestHandler = (req, res) => {
  try {
    const { walletType, address, signature }: WalletConnectionRequest = req.body;

    if (!walletType || !address) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      } as WalletConnectionResponse);
    }

    // In a real app, you would verify the signature here
    // For demo purposes, we'll accept any valid address format
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({
        success: false,
        error: "Invalid address format"
      } as WalletConnectionResponse);
    }

    // Check if user exists, create if not
    let user = users.get(address);
    if (!user) {
      user = {
        id: `user_${Date.now()}`,
        address,
        balance: mockBalances
      };
      users.set(address, user);
    }

    // Generate a simple token (in real app use JWT)
    const token = `token_${address}_${Date.now()}`;

    const response: WalletConnectionResponse = {
      success: true,
      token,
      user
    };

    res.json(response);
  } catch (error) {
    console.error("Wallet connection error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as WalletConnectionResponse);
  }
};

export const getUserPortfolio: RequestHandler = (req, res) => {
  try {
    const { address } = req.params;
    
    const user = users.get(address);
    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Calculate total value (mock calculation)
    const totalValue = Object.entries(user.balance).reduce((total, [token, amount]) => {
      const mockPrices: Record<string, number> = {
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
      return total + (amount * (mockPrices[token] || 0));
    }, 0);

    const portfolio: UserPortfolio = {
      address: user.address,
      totalValue,
      tokens: user.balance,
      liquidityPositions: [
        {
          poolId: "1",
          lpTokens: 125.4,
          token0Amount: 125.4,
          token1Amount: 0.05
        }
      ],
      nfts: ["nft_1", "nft_2"]
    };

    res.json(portfolio);
  } catch (error) {
    console.error("Get portfolio error:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};

export const disconnectWallet: RequestHandler = (req, res) => {
  try {
    const { address } = req.body;
    
    // In a real app, you would invalidate the token
    res.json({
      success: true,
      message: "Wallet disconnected successfully"
    });
  } catch (error) {
    console.error("Disconnect wallet error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};
