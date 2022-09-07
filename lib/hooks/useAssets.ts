import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState
} from "recoil";
import {
    assetsData,
    connectedUser
} from "../atoms";
import AxiosInstance from "../services/http";
import { IBalance, TNetworks } from "../types";

const useAssets = () => {
    const { chain } = useRecoilValue(connectedUser);
    const [assets, setAssets] = useRecoilState(assetsData);
    const resetAssets = useResetRecoilState(assetsData);

    const currentAsset = assets[chain];

    const onFetchBalances = async (selectedChain: TNetworks, address: string) => {
        const params = {
            chain: selectedChain,
            address
        };

        setAssets((val) => ({ ...val, loading: true}));
        const { data } = await AxiosInstance.get("/user-address/token-balance", {
            params
        });

        if (data.data) {
            const responseAssets = data.data as IBalance[];

            const totalUSDBalance = responseAssets.reduce(
                (sum: number, asset) => sum + asset.balanceInUSD,
                0
            );
            const totalBalance = responseAssets.reduce(
                (sum: number, asset) => sum + asset.balance,
                0
            );

            setAssets((val) => ({
                ...val,
                loading: false,
                [selectedChain]: {
                    hasLoaded: true,
                    balances: data.data,
                    totalUSDBalance,
                    totalBalance,
                },
            }));
        } else {
            setAssets((val) => ({ ...val, loading: false }));
        }
    };

    return {
        currentAsset,
        loading: assets.loading,
        assets,
        chain,
        resetAssets,
        onFetchBalances,
    };

};

export default useAssets;
