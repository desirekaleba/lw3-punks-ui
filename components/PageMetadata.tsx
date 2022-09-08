import Head from "next/head";
import React from "react";

type Props = {
  title: string;
  description: string;
  keywords?: string;
};

const PageMetaData = ({ title, description, keywords }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        key="viewport"
      />
      <meta name="keywords" content={keywords} key="keywords" />

      <meta name="description" content={description} key="description" />

      <meta
        property="twitter:card"
        content={"summary_large_image"}
        key="twitter:card"
      />
      <meta property="twitter:title" content={title} key="twitter:title" />
      <meta
        property="twitter:description"
        content={description}
        key="twitter:description"
      />

      <meta property="twitter:site" content="airnfts" key="twitter:site" />

      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
    </Head>
  );
};

export default PageMetaData;
