import React from "react";
import { useRecoilState } from "recoil";
import { connectedUser, connectWallet } from "../lib/atoms";
import { TNetworks } from "../lib/types";
import { SUPPORTED_NETWORKS } from "../lib/Utils/constants";
import Tabs from "./Tabs";

const TabBar = ({
    onChange,
    className,
}: {
    onChange?: (value: any) => void;
    className?: string;
}) => {
    const [{ chain }, setTabChain] = useRecoilState(connectedUser);

    return (
        <div
            className={`w-full flex justify-center items-center mb-4 ${className}`}
        >
            <Tabs
                defaultTab={chain}
                tabs={Object.values(SUPPORTED_NETWORKS)}
                className="w-96"
                onTabChange={(tabChain) => {
                    setTabChain((val) => ({ ...val, chain: tabChain as TNetworks }))
                }}
                onInitialLoad={(tabChain) => {
                    setTabChain((val) => ({ ...val, chain: tabChain as TNetworks }))
                }}
                />
        </div>
    );
};

export default TabBar;
