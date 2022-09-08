import { TSupportedNetworks } from "../types";

export const SUPPORTED_NETWORKS: TSupportedNetworks = {
    matic: {
      value: "matic",
      label: "Polygon",
      symbol: "MATIC",
      asset: "/assets/polygon.svg",
    },
    ethereum: {
      value: "ethereum",
      label: "Ethereum",
      symbol: "ETH",
      asset: "/assets/ethereum.svg",
    },
};
