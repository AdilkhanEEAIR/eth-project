const config = {
  targetNetworks: [
    {
      id: 57_401,
      name: "Status Network Sepolia",
      network: "status-sepolia",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      rpcUrls: {
        public: { http: ["https://rpc.sepolia.status.network"] },
        default: { http: ["https://rpc.sepolia.status.network"] },
      },
      blockExplorers: {
        default: {
          name: "Status Explorer",
          url: "https://explorer.sepolia.status.network",
        },
      },
    },
  ],
  pollingInterval: 3000,
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "demo",
  onlyLocalBurnerWallet: false,
};

export default config;
