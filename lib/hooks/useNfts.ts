import { useRecoilState, useResetRecoilState } from "recoil";
import { nftData } from "../atoms";
import AxiosInstance from "../services/http";
import { TNetworks } from "../types";
import useAssets from "./useAssets";

const useNfts = () => {
    const [nftState, setNftState] = useRecoilState(nftData);
    const resetNfts = useResetRecoilState(nftData);
    const { currentAsset, chain, resetAssets, onFetchBalances } = useAssets();

    const onResetNfts = () => {
        resetAssets();
        resetNfts();
    };

    const fetchNfts = async (selectedChain: TNetworks, address: string) => {
        const params = {
            chain: selectedChain,
            address,
        };

        setNftState((val) => ({ ...val, loading: true }));

        if (!currentAsset.hasLoaded) {
            await onFetchBalances(selectedChain, address);
        }

        const { data } = await AxiosInstance.get("/user-address/nfts", {
            params
        });

        if (data.data) {
            setNftState((val) => ({
                ...val,
                loading: false,
                [chain]: {
                    hasLoaded: true,
                    nfts: data.data
                },
            }));
        } else {
            setNftState((val) => ({ ...val, loading: false }));
        }
    };

    return {
        nftState,
        loading: nftState.loading,
        currentNFTChain: nftState[chain],
        fetchNfts,
        onResetNfts,
    };
};

export default useNfts;
