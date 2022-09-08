import React from "react";
import { HiArrowDown, HiArrowUp, HiOutlineDocumentText } from "react-icons/hi";
import { IoSwapHorizontalOutline } from "react-icons/io5";
import { BsCheck2All } from "react-icons/bs";
import Card from "./Card";
import useTransactions from "../lib/hooks/useTransactions";
import { ITransaction } from "../lib/types";
import { shrink, timestampConverter, weiToNumber } from "../lib/Utils";

const TransactionHistory = () => {
    const {
        transactions: { transactions },
    } = useTransactions();

    return (
        <Card
            title="Transaction History"
            titleClassName="sticky top-0 bg-white z-[1] p-4 px-6 m-0"
            className="p-0 md:max-h-[40rem] overflow-y-auto"
        >
            <div className="p-4 px-6">
                {transactions?.map((tx) => (
                    <TransactionCard key={tx.block} transaction={tx} />
                ))}
            </div>
        </Card>
    );
};

export default TransactionHistory;

type Props = {
    transaction: ITransaction;
};
const TransactionCard = ({ transaction }: Props) => {
    const { type, value, date, received, sent, description } = transaction;

    const getTxDetail = () => {
        switch (type) {
            case "receive":
                const receivedToken = received?.[0];
                return {
                    icon: <HiArrowUp className="text-2xl" />,
                    title: `Received ${weiToNumber(receivedToken?.value, 4)} ${receivedToken?.symbol
                        }`,
                    value,
                    symbol: receivedToken?.symbol,
                };
            case "contract_execution":
                return {
                    icon: <HiOutlineDocumentText className="text-2xl" />,
                    title: "Contract execution",
                };
            case "send":
                const sentToken = sent?.[0];

                return {
                    icon: <HiArrowDown className="text-2xl" />,
                    title: `Sent ${weiToNumber(sentToken?.value)} ${sentToken?.symbol}`,
                    value,
                    symbol: sentToken?.symbol,
                };

            case "swap":
                return {
                    icon: <IoSwapHorizontalOutline className="text-2xl" />,
                    title: `Swapped ${weiToNumber(sent?.[0].value)} ${sent?.[0].symbol
                        } from ${weiToNumber(received?.[0].value)} ${received?.[0].symbol}`,
                };

            case "approve":
                return {
                    icon: <BsCheck2All className="text-2xl" />,
                    title: `Approved ${sent?.[0]?.symbol}`,
                };

            default:
                return {
                    icon: <HiArrowUp className="text-2xl" />,
                    title: "Contract execution",
                };
        }
    };

    const txType = getTxDetail();

    return (
        <div className="w-full">
            <p className="text-secondary py-3 border-b">
                {timestampConverter(date, {
                    day: "2-digit",
                    month: "long",
                })}
            </p>

            <div className="w-full flex justify-between py-3 gap-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0 flex justify-center items-center">
                    {txType?.icon || <HiOutlineDocumentText className="text-2xl" />}
                </div>
                <div className="flex-1">
                    <p className="mb-2">{txType?.title || "Contract execution"}</p>
                    <p className="text-xs text-secondary">
                        {new Date(date * 1000).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                <div className="text-right">
                    {txType.value && (
                        <p className="text-green-500 mb-2 font-medium">
                            +{weiToNumber(txType.value)} {txType.symbol}
                        </p>
                    )}
                    <p className="text-xs text-secondary">
                        {shrink(transaction.id || "")}
                    </p>
                </div>
            </div>
        </div>
    );
};
