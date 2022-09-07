import React from "react";
import Image from "next/image";
import { RiImage2Line } from "react-icons/ri";
import { INFT } from "../lib/types";
import { SUPPORTED_NETWORKS } from "../lib/Utils/constants";
import { ImageFallback } from "./Images";

type Props = {
    nft: INFT;
};

const NftCard = ({ nft }: Props) => {
    return (
        <div
        key={nft.tokenId}
        className="rounded-lg border p-4 overflow-hidden"
        >
            <ImageFallback
                src={nft.imageUrl}
                alt={nft.name}
                width="100%"
                height="100%"
                className="aspect-square rounded-lg"
                errorWidget={
                    <div className="aspect-square flex justify-center items-center">
                        <RiImage2Line className="text-4xl text-secondary" />
                    </div>
                }
            />

            <div className="flex justify-between mt-3 gap-2">
                <div className="flex-1 max-w-[80%]">
                    <p className="truncate overflow-hidden">{nft.name}</p>
                    <p className="text-xs text-secondary">#{nft.tokenId}</p>
                </div>
                <Image
                    width={18}
                    height={18}
                    className="self-start"
                    src={SUPPORTED_NETWORKS[nft.chain].asset || ""}
                    alt={nft.chain}
                />
            </div>
        </div>
    );
};

export default NftCard;
