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

export const formatToUSD = (
    amount: number,
    maximumSignificantDigits?: number
) => {
    return amount.toLocaleString("en-US", {
        currency: "USD",
        style: "currency",
        maximumSignificantDigits
    });
};

export const compactNumber = (value: number) => {
    if (value < 1e3) return value.toFixed();
    if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(1) + "K";
    if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(1) + "M";
    if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(1) + "B";
    if (value >= 1e12) return +(value / 1e12).toFixed(1) + "T";
    return Number(0).toFixed();
}

export const timestampConverter = (
    seconds: number,
    options: Intl.DateTimeFormatOptions = { month: "short", year: "2-digit" }
  ) => {
    return new Date(seconds * 1000).toLocaleDateString("en-US", options);
  };
  
  export const weiToNumber = (value: any, decimals = 2) => {
    if (typeof value === "number") {
      return Number(value).toFixed(decimals);
    }
  
    return Number(ethers.utils.formatEther(value || 0)).toFixed(decimals);
  };
  