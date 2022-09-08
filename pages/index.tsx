import type { NextPage } from "next";
import NFTs from "../components/Nfts";
import Scaffold from "../components/Scaffold";
import useAssets from "../lib/hooks/useAssets";

const Home: NextPage = () => {

  const { loading, resetAssets } = useAssets();
  return (
    <Scaffold
      submitting={loading}
      onSubmit={() => {
        resetAssets();
      }}
    >
      <NFTs />
    </Scaffold>
  );
}

export default Home
