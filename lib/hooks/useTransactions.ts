import { useRecoilState, useRecoilValue } from "recoil";
import { connectedUser, transactionsData } from "../atoms";
import AxiosInstance from "../services/http";
import { ITransaction, TNetworks } from "../types";

const useTransactions = () => {
    const { chain } = useRecoilValue(connectedUser);
    const [transactions, setTransactions] = useRecoilState(transactionsData);

    const onFetchTransactions = async (
        selectedChain: TNetworks,
        address: string
    ) => {
        const params = {
            chain: selectedChain,
            address,
        };

        setTransactions((val) => ({ ...val, loading: true }));
        const { data } = await AxiosInstance.get(
            "/user-address/account-transaction",
            { params }
        );

        if (data.data && data.data.transactions) {
            const responseTransactions = data.data.transactions as ITransaction[];

            setTransactions((val) => ({
                ...val,
                loading: false,
                [chain]: {
                    transactions: responseTransactions,
                    hasLoaded: false,
                },
            }));
        } else {
            setTransactions((val) => ({ ...val, loading: false }));
        }
    };

    return {
        transactions: transactions[chain],
        loading: transactions.loading,
        onFetchTransactions,
    };
};

export default useTransactions;
