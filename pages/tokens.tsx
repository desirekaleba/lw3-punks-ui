/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo } from "react";
import { RiHistoryLine } from "react-icons/ri";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { connectedUser } from "../lib/atoms";
import useAssets from "../lib/hooks/useAssets";
import useTransactions from "../lib/hooks/useTransactions";
import { formatToUSD, weiToNumber } from "../lib/Utils";
import BalanceWallet from "../components/BalanceWallet";
import Card from "../components/Card";
import { ImageWithFallback } from "../components/Images";
import { AnimatedText, ChartLoader, TransactionLoader } from "../components/Loaders";
import TabBar from "../components/TabBar";
import TransactionHistory from "../components/TransactionHistory";
import { LineCharts } from "../components/Charts";
import { FaChartLine } from "react-icons/fa";
import Scaffold from "../components/Scaffold";

const Tokens = () => {

  const { address, chain } = useRecoilValue(connectedUser);
  const { currentAsset, loading, onFetchBalances } = useAssets();
  const {
    transactions: { transactions, hasLoaded },
    loading: loadingTransactions,
    onFetchTransactions,
  } = useTransactions();

  const fetchAssets = useCallback(
    async () => {
      if (address && !currentAsset.hasLoaded) {
        await onFetchBalances(chain, address);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, chain, currentAsset.hasLoaded]
  );

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  useEffect(() => {
    if (address && !hasLoaded) {
      onFetchTransactions(chain, address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain, hasLoaded]);

  return (
    <Scaffold>
      <div className="p-6 lg:p-8">
        <TabBar />

        <div className="w-full flex flex-wrap-reverse lg:flex-nowrap justify-between lg:space-x-6">
          <div className="flex-1">
            {(loading && <ChartLoader className="h-72 mb-6" />) || null}
            {(!loading && currentAsset.balances.length && (
              <Card title="Balances (in USD)">
                <LineCharts
                  legend={false}
                  tickCount={5}
                  data={currentAsset.balances.map((balance) => ({
                    name: balance.tokenName,
                    balance: balance.balanceInUSD,
                  }))}
                  tickFormatter={(value) => {
                    return formatToUSD(Number(value), 1);
                  }}
                  dataKeys={[{ key: "balance", color: "#8884d8" }]}
                />
              </Card>
            )) || (
                <div className="p-4 px-6 border rounded-lg mb-6 h-72">
                  <div className="flex flex-col justify-center items-center h-full">
                    <FaChartLine className="text-5xl text-secondary" />
                    <p className="text-secondary mt-2 text-center">
                      Chart with balances will appear here
                    </p>
                  </div>
                </div>
              )}

            {((loading || loadingTransactions) && (
              <div className="p-4 px-6 border rounded-lg">
                {Array.from({ length: 6 }).map((_, index) => (
                  <TransactionLoader key={`tx_${index}`} />
                ))}
              </div>
            )) ||
              null}

            {(!loadingTransactions && transactions?.length && (
              <TransactionHistory />
            )) ||
              null}

            {!loadingTransactions && !transactions?.length && (
              <div className="p-4 px-6 border rounded-lg h-[25rem]">
                <div className="flex flex-col justify-center items-center h-full">
                  <RiHistoryLine className="text-5xl lg:text-6xl text-secondary" />
                  <p className="text-secondary mt-2 text-center">
                    Transaction history will appear here
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-80">
            <BalanceWallet />
            <Card
              title="Token Balances"
              titleClassName="p-4"
              className="p-0 overflow-hidden"
            >
              <div className="relative overflow-x-auto max-h-[30rem]">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-[1]">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Symbol
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading &&
                      Array.from({ length: 4 }).map((_, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4">
                            <AnimatedText text="" loading />
                          </td>
                          <td className="px-6 py-4">
                            <AnimatedText text="" loading />
                          </td>
                        </tr>
                      ))}
                    {!loading &&
                      [...currentAsset.balances]
                        .sort((a, b) => b.balanceInUSD - a.balanceInUSD)
                        .map((token, index) => (
                          <tr
                            className="border-b odd:bg-white even:bg-gray-50"
                            key={`${token.tokenSymbol}_${index.toFixed()}`}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-2"
                            >
                              <ImageWithFallback
                                src={token.tokenLogoUrl}
                                alt={token.tokenName}
                                height={20}
                                width={20}
                                errorWidget={
                                  <MdOutlineGeneratingTokens className="text-xl lg:text-2xl text-secondary" />
                                }
                              />
                              {token.tokenSymbol}
                            </th>
                            <td className="px-6 py-4">
                              <p className="text-black">
                                {weiToNumber(token.balance, 4)}
                              </p>
                              <p className="text-secondary">
                                {formatToUSD(token.balanceInUSD)}
                              </p>
                            </td>
                          </tr>
                        ))}
                    {!loading && !currentAsset.balances.length && (
                      <tr>
                        <td colSpan={3} rowSpan={4} className="h-24 text-center">
                          Balances will appear here{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Scaffold>
  );
};

export default Tokens;
