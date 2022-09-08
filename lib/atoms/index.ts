import { atom } from "recoil";
import {
    IAssetData,
    IConnectedUser,
    IConnectWallet,
    INFT,
    TNetworks
} from "../types";

export const currentYPos = atom<number>({
    key: "currentYPos",
    default: 0,
});

export const invalidAddressMsg = atom<string>({
    key: "invalidAddressMessage",
    default: "",
});

export const connectedUser = atom<IConnectedUser>({
    key: "userAddress",
    default: {
        chain: "matic",
        address: "",
    },
});

export const connectWallet = atom<IConnectWallet>({
    key: "connectWallet",
    default: {
        openModal: false,
        connecting: false,
        connected: false,
    },
});

export const drawerMenu = atom<boolean>({
    key: "drawerMenu",
    default: false,
});

export const assetsData = atom<
  Record<TNetworks, IAssetData> & { loading: boolean }
>({
  key: "assetsData",
  default: {
    loading: false,
    ethereum: {
      hasLoaded: false,
      balances: [],
      totalUSDBalance: 0,
      totalBalance: 0,
    },
    matic: {
      hasLoaded: false,
      balances: [],
      totalUSDBalance: 0,
      totalBalance: 0,
    },
  },
});

export const nftData = atom<
  Record<TNetworks, Partial<{nfts: INFT[]; hasLoaded: boolean}>> & {
    loading: boolean;
  }>({
    key: "nftData",
    default: {
      loading: false,
      ethereum: {
        nfts: [],
        hasLoaded: false,
      },
      matic: {
        nfts: [],
        hasLoaded: false
      },
    },
});
