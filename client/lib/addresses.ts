// Central place for contract addresses & common tokens
export const ROUTER_ADDRESS = import.meta.env.VITE_ROUTER_ADDRESS as `0x${string}`;
export const WETH_ADDRESS = import.meta.env.VITE_WETH_ADDRESS as `0x${string}`;

// Add your popular tokens here (testnet addresses).
export const TOKENS: Record<string, `0x${string}`> = {
  // Example placeholders (replace with your testnet addresses)
  "TOKENA": "0x0000000000000000000000000000000000000001",
  "TOKENB": "0x0000000000000000000000000000000000000002",
  "USDC": "0x0000000000000000000000000000000000000003",
  "WETH": WETH_ADDRESS,
};
