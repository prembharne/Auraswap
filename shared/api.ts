// Demo endpoint
export interface DemoResponse {
  message: string;
}

// Cryptocurrency data
export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

// Wallet connection
export interface WalletConnectionRequest {
  walletType: string;
  address: string;
  signature: string;
}

export interface WalletConnectionResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    address: string;
    balance: Record<string, number>;
  };
  error?: string;
}

// Swap
export interface SwapRequest {
  fromToken: string;
  toToken: string;
  amount: number;
  slippage: number;
  userAddress: string;
}

export interface SwapResponse {
  success: boolean;
  transactionHash?: string;
  estimatedOutput?: number;
  priceImpact?: number;
  fee?: number;
  error?: string;
}

export interface SwapQuoteRequest {
  fromToken: string;
  toToken: string;
  amount: number;
}

export interface SwapQuoteResponse {
  estimatedOutput: number;
  priceImpact: number;
  minimumOutput: number;
  fee: number;
  route: string[];
}

// Liquidity
export interface LiquidityPool {
  id: string;
  token0: string;
  token1: string;
  reserve0: number;
  reserve1: number;
  totalSupply: number;
  fee: number;
  apr: number;
  volume24h: number;
}

export interface AddLiquidityRequest {
  poolId: string;
  amount0: number;
  amount1: number;
  userAddress: string;
}

export interface RemoveLiquidityRequest {
  poolId: string;
  lpTokenAmount: number;
  userAddress: string;
}


// NFT Marketplace
export interface NFT {
  id: string;
  tokenId: string;
  contractAddress: string;
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  owner: string;
  creator: string;
  price?: number;
  currency: string;
  isListed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NFTCollection {
  id: string;
  name: string;
  description: string;
  image: string;
  contractAddress: string;
  creator: string;
  totalSupply: number;
  floorPrice: number;
  volume24h: number;
  owners: number;
}

export interface ListNFTRequest {
  tokenId: string;
  contractAddress: string;
  price: number;
  currency: string;
  userAddress: string;
}

export interface BuyNFTRequest {
  nftId: string;
  userAddress: string;
}

export interface CreateNFTRequest {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  userAddress: string;
}

// User data
export interface UserPortfolio {
  address: string;
  totalValue: number;
  tokens: Record<string, number>;
  liquidityPositions: Array<{
    poolId: string;
    lpTokens: number;
    token0Amount: number;
    token1Amount: number;
  }>;
  nfts: string[];
}
