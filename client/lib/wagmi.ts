import { http, createConfig } from 'wagmi';
import { sepolia, polygonAmoy } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Set your WalletConnect projectId in .env as VITE_WALLETCONNECT_PROJECT_ID
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const config = createConfig({
  chains: [sepolia, polygonAmoy],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL_SEPOLIA),
    [polygonAmoy.id]: http(import.meta.env.VITE_RPC_URL_AMOY),
  },
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  ssr: false,
});
