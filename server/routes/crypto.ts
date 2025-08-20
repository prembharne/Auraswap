import { RequestHandler } from "express";
import { Cryptocurrency } from "@shared/api";

// Mock cryptocurrency data (in real app, fetch from CoinGecko/CoinMarketCap)
const mockCryptoData: Cryptocurrency[] = [
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2485.32,
    market_cap: 298745123456,
    market_cap_rank: 2,
    price_change_percentage_24h: 2.45,
    total_volume: 15678912345
  },
  {
    id: "bitcoin",
    symbol: "BTC", 
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 43250.00,
    market_cap: 850123456789,
    market_cap_rank: 1,
    price_change_percentage_24h: 1.85,
    total_volume: 28967345123
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
    current_price: 1.00,
    market_cap: 32567891234,
    market_cap_rank: 5,
    price_change_percentage_24h: 0.01,
    total_volume: 4567123890
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    current_price: 1.00,
    market_cap: 89123456789,
    market_cap_rank: 3,
    price_change_percentage_24h: -0.02,
    total_volume: 45672134567
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.45,
    market_cap: 15234567890,
    market_cap_rank: 8,
    price_change_percentage_24h: 5.67,
    total_volume: 789123456
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 95.50,
    market_cap: 41234567890,
    market_cap_rank: 6,
    price_change_percentage_24h: 3.25,
    total_volume: 2345678901
  },
  {
    id: "matic-network",
    symbol: "MATIC",
    name: "Polygon",
    image: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png",
    current_price: 0.85,
    market_cap: 7890123456,
    market_cap_rank: 12,
    price_change_percentage_24h: -1.45,
    total_volume: 456789123
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    current_price: 15.25,
    market_cap: 8456789123,
    market_cap_rank: 11,
    price_change_percentage_24h: 4.12,
    total_volume: 567891234
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 6.75,
    market_cap: 8901234567,
    market_cap_rank: 10,
    price_change_percentage_24h: 2.89,
    total_volume: 345678912
  },
  {
    id: "avalanche-2",
    symbol: "AVAX",
    name: "Avalanche",
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    current_price: 25.50,
    market_cap: 9567123456,
    market_cap_rank: 9,
    price_change_percentage_24h: 6.34,
    total_volume: 678912345
  }
];

export const getCryptocurrencies: RequestHandler = (req, res) => {
  try {
    // In a real app, you would fetch this data from CoinGecko API
    // const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1');
    // const data = await response.json();
    
    res.json(mockCryptoData);
  } catch (error) {
    console.error("Get cryptocurrencies error:", error);
    res.status(500).json({
      error: "Failed to fetch cryptocurrency data"
    });
  }
};

export const getCryptocurrency: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const crypto = mockCryptoData.find(c => c.id === id || c.symbol.toLowerCase() === id.toLowerCase());
    
    if (!crypto) {
      return res.status(404).json({
        error: "Cryptocurrency not found"
      });
    }

    res.json(crypto);
  } catch (error) {
    console.error("Get cryptocurrency error:", error);
    res.status(500).json({
      error: "Failed to fetch cryptocurrency data"
    });
  }
};

export const getCryptoPrices: RequestHandler = (req, res) => {
  try {
    const { symbols } = req.query;
    
    if (!symbols || typeof symbols !== 'string') {
      return res.status(400).json({
        error: "Symbols query parameter is required"
      });
    }

    const requestedSymbols = symbols.split(',').map(s => s.trim().toUpperCase());
    const prices: Record<string, number> = {};

    requestedSymbols.forEach(symbol => {
      const crypto = mockCryptoData.find(c => c.symbol === symbol);
      if (crypto) {
        prices[symbol] = crypto.current_price;
      }
    });

    res.json(prices);
  } catch (error) {
    console.error("Get crypto prices error:", error);
    res.status(500).json({
      error: "Failed to fetch cryptocurrency prices"
    });
  }
};
