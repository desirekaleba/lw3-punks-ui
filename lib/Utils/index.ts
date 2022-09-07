import { ethers } from "ethers";

export const isValidAddress = (address: string) => 
    ethers.utils.isAddress(address);

export const shrink = (str: string, len: number = 7) => {
    if (!str) {
        return "";
    }
    return `${str.substring(0, len)}...${str.substring(
        str.length - len,
        str.length
    )}`;
};
