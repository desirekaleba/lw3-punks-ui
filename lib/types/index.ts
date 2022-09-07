import React from "react";

// Types
export type TNetworks = "ethereum" | "bsc";
export type TVerticalTabs = {
    icon: React.ReactNode;
    label: string;
    href: string;
}[];


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
