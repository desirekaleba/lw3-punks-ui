import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import ConnectModal from "../components/ConnectModal";
import PageMetaData from "../components/PageMetadata";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <PageMetaData
        title="LW3Punks"
        description="See your LW3 Punks"
      />
      <Component {...pageProps} />
      <ConnectModal />
    </RecoilRoot>
  );
};

export default MyApp;

