/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Scaffold from "../components/Scaffold";
import TabBar from "../components/TabBar";

const Tokens = () => {

  return (
    <Scaffold>
      <div className="p-6 lg:p-8">
        <TabBar />
    </div>
    </Scaffold>
  );
};

export default Tokens;
