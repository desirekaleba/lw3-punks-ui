import React, { useEffect } from "react";
import { RiImage2Line } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import BalanceWallet from "./BalanceWallet";
import { NftCardLoader } from "./Loaders";
import NftCard from "./NftCard";
import TabBar from "./TabBar";
import { connectedUser } from "../lib/atoms";
import useNfts from "../lib/hooks/useNfts";

const NFTs = () => {
    const { chain, address } = useRecoilValue(connectedUser);
  const { currentNFTChain, loading, fetchNfts, onResetNfts } = useNfts();

  useEffect(() => {
    if (address && !currentNFTChain.hasLoaded) {
      fetchNfts(chain, address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain, currentNFTChain.hasLoaded]);

  return (
      <div className="p-6 lg:p-8">
        <TabBar />

        <div className="w-full flex flex-wrap-reverse lg:flex-nowrap justify-between lg:space-x-6">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <NftCardLoader key={index} />
              ))}
            </div>
          )}
          {(!loading && currentNFTChain.nfts?.length && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentNFTChain.nfts?.map((nft) => {
                return <NftCard nft={nft} key={nft.tokenId} />;
              })}
            </div>
          )) ||
            null}
          {!loading && !currentNFTChain.nfts?.length && (
            <div className="p-4 px-6 border rounded-lg h-[25rem] w-full">
              <div className="flex-1 flex flex-col justify-center items-center h-full">
                <RiImage2Line
                  size={60}
                  className="text-5xl lg:text-6xl text-secondary"
                />
                <p className="text-secondary mt-2">No NFT found...</p>
              </div>
            </div>
          )}
          <div className="w-full lg:w-80">
            <BalanceWallet />
          </div>
        </div>
      </div>
  );
};

export default NFTs;
