import React from "react";

// Types
export type TNetworks = "matic" | "ethereum";
export type TVerticalTabs = {
    icon: React.ReactNode;
    label: string;
    href: string;
}[];

export type TSupportedNetworks = Record<TNetworks, INetworkDetail>;

// Interfaces
export interface IConnectedUser {
    address: string;
    chain: TNetworks;
}

export interface IConnectWallet {
    openModal: boolean;
    connecting: boolean;
    connected?: boolean;
}

export interface IAssetData {
    hasLoaded: boolean;
    balances: IBalance[];
    totalUSDBalance: number;
    totalBalance: number;
}

export interface IBalance {
    balance: number;
    balanceInUSD: number;
    coin: number;
    quote: number;
    quotePctChange24h: number;
    quoteRate: number;
    quoteRate24h: string;
    tokenAddress: string;
    tokenDecimal: number;
    tokenLogoUrl: string;
    tokenName: string;
    tokenSymbol: string;
    type: string;
}

export interface INFT {
    name: string;
    imageUrl: string;
    tokenId: string;
    contractAddress: string;
    chain: TNetworks;
    owner: string;
    creator: string;
}

export interface INetworkDetail {
    value: string;
    label: string;
    symbol?: string;
    asset?: string;
}
