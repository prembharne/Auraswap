import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Route imports
import { handleDemo } from "./routes/demo.js";
import { connectWallet, getUserPortfolio, disconnectWallet } from "./routes/wallet.js";
import { getCryptocurrencies, getCryptocurrency, getCryptoPrices } from "./routes/crypto.js";
import { 
  getSwapQuote, 
  executeSwap, 
  getSwapHistory, 
  getSupportedTokens 
} from "./routes/swap.js";
import {
  getLiquidityPools,
  getLiquidityPool,
  addLiquidity,
  removeLiquidity,
  getUserLiquidityPositions
} from "./routes/liquidity.js";
import {
  getNFTCollections,
  getNFTCollection,
  getNFTs,
  getNFT,
  listNFT,
  buyNFT,
  createNFT,
  getUserNFTs,
  getMarketplaceStats
} from "./routes/nft.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createServer() {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files
  app.use(express.static(path.join(__dirname, "../spa")));

  // API Routes
  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  // Demo route
  app.get("/api/demo", handleDemo);

  // Wallet routes
  app.post("/api/wallet/connect", connectWallet);
  app.get("/api/wallet/portfolio/:address", getUserPortfolio);
  app.post("/api/wallet/disconnect", disconnectWallet);

  // Cryptocurrency routes
  app.get("/api/crypto/list", getCryptocurrencies);
  app.get("/api/crypto/prices", getCryptoPrices);
  app.get("/api/crypto/:id", getCryptocurrency);

  // Swap routes
  app.post("/api/swap/quote", getSwapQuote);
  app.post("/api/swap/execute", executeSwap);
  app.get("/api/swap/history/:userAddress", getSwapHistory);
  app.get("/api/swap/tokens", getSupportedTokens);

  // Liquidity routes
  app.get("/api/liquidity/pools", getLiquidityPools);
  app.get("/api/liquidity/pools/:poolId", getLiquidityPool);
  app.post("/api/liquidity/add", addLiquidity);
  app.post("/api/liquidity/remove", removeLiquidity);
  app.get("/api/liquidity/positions/:userAddress", getUserLiquidityPositions);


  // NFT routes
  app.get("/api/nft/collections", getNFTCollections);
  app.get("/api/nft/collections/:collectionId", getNFTCollection);
  app.get("/api/nft/tokens", getNFTs);
  app.get("/api/nft/tokens/:nftId", getNFT);
  app.post("/api/nft/list", listNFT);
  app.post("/api/nft/buy", buyNFT);
  app.post("/api/nft/create", createNFT);
  app.get("/api/nft/user/:userAddress", getUserNFTs);
  app.get("/api/nft/stats", getMarketplaceStats);

  // Catch-all handler: send back React's index.html file for client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../spa/index.html"));
  });

  return app;
}

// Only start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3000;
  const app = createServer();
  
  app.listen(PORT, () => {
    console.log(`🚀 Auraswap server running on port ${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  });
}
