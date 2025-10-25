import { wagmiConnectors } from "./wagmiConnectors";
import { createClient, fallback, http } from "viem";
import { hardhat } from "viem/chains";
import { createConfig } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

const { targetNetworks } = scaffoldConfig;

// Приводим тип для Wagmi
const chains = targetNetworks as any;

export const wagmiConfig = createConfig({
  chains: chains,
  connectors: wagmiConnectors(),
  ssr: true,
  client({ chain }) {
    let rpcFallbacks = [http()];

    const alchemyHttpUrl = getAlchemyHttpUrl(chain.id);
    if (alchemyHttpUrl) {
      rpcFallbacks = [http(alchemyHttpUrl), http()];
    }

    return createClient({
      chain,
      transport: fallback(rpcFallbacks),
      ...(chain.id !== hardhat.id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});
