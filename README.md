# AuraSwap - Decentralized Exchange

AuraSwap is a modern decentralized exchange (DEX) built with React, Vite, and Wagmi, featuring a sleek UI inspired by leading DEX platforms.

![AuraSwap Interface](https://your-screenshot-url.png)

## Features

- 🌟 Modern, intuitive interface
- 💱 Token swapping with real-time price updates
- 👛 Wallet integration (MetaMask and other providers)
- ⚡ Built on high-performance networks
- 🌓 Dark/Light mode support
- 🎨 Smooth animations and transitions
- 📱 Fully responsive design

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - Framer Motion
  - Wagmi (Web3 Hooks)
  - Shadcn/ui Components

- **Blockchain Integration:**
  - ethers.js
  - Web3 Modal
  - Network support for Ethereum, Polygon, and more

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/auraswap.git
   cd auraswap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables:
   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id
   VITE_RPC_URL_SEPOLIA=your_sepolia_rpc_url
   VITE_RPC_URL_AMOY=your_amoy_rpc_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The app is deployed using Netlify. You can access it at: [https://auraswap.netlify.app](https://auraswap.netlify.app)

To deploy your own instance:

1. Fork this repository
2. Sign up on [Netlify](https://www.netlify.com/)
3. Connect your GitHub repository
4. Configure the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Configuration

### Network Configuration

The app supports multiple networks. Configure them in `client/lib/wagmi.ts`:

```typescript
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
});
```

### Token List

Add or modify supported tokens in `client/config/tokens.ts`.

## Smart Contracts

The smart contracts for AuraSwap are based on Uniswap V2's architecture with custom modifications. Contract addresses:

- Factory: `0x...`
- Router: `0x...`
- (Add your deployed contract addresses)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)
