import React from "react";
import { useRecoilValue } from "recoil";
import { connectedUser } from "../lib/atoms";
import useAssets from "../lib/hooks/useAssets";
import { formatToUSD, shrink } from "../lib/Utils";
import { AnimatedText } from "./Loaders";
import Card from "./Card";

const BalanceWallet = () => {
    const { address } = useRecoilValue(connectedUser);
    const { currentAsset, loading } = useAssets();

    return (
        <>
            <Card title="Wallet Address">
                <p className="font-ibmMono font-semibold tracking-min">
                    {shrink(address)}
                </p>
            </Card>
            <Card title="Total Balance">
                <AnimatedText
                    className="font-ibmMono font-semibold tracking-min"
                    text={<p>{formatToUSD(currentAsset.totalUSDBalance || 0)}</p>}
                    loading={loading}
                />
            </Card>
        </>
    );
};

export default BalanceWallet;
