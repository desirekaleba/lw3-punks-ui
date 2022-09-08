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

export interface ITransaction {
    block?: number;
    date: number;
    description?: string;
    fee: string;
    from: string;
    id?: string;
    native_token_decimals?: number;
    nonce?: number;
    received?: ITransactionReceived[];
    sent?: ITransactionReceived[];
    status?: "completed" | string;
    to: string;
    type?: TTransactionType;
    value: string;
  }

  export interface ITransactionReceived {
    decimals?: number;
    from: string;
    logo_url: string;
    name: string;
    symbol: string;
    to: string;
    token_id: string;
    value: string;
  }

  export type TTransactionType =
  | "receive"
  | "contract_execution"
  | "send"
  | "swap"
  | "approve";
  