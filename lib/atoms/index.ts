import { atom } from "recoil";
import {
    IConnectedUser,
    IConnectWallet
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
        chain: "ethereum",
        address: "",
    },
});

export const connectWallet = atom<{
    openModal: boolean;
    connecting: boolean;
    connected?: boolean;
}>({
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
