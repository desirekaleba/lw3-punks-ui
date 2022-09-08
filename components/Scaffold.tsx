
import React, { FC, useEffect, useState } from "react";
import {
    HiCurrencyDollar
 } from "react-icons/hi";
 import {
    RiCoinsLine,
    RiImage2Line
 } from "react-icons/ri";
 import {
    useRecoilState
 } from "recoil";
 import {
    drawerMenu
 } from "../lib/atoms";
 import useMediaQuery from "../lib/hooks/useMediaQuery";
 import {
    TNetworks,
    TVerticalTabs
 } from "../lib/types"
import {
    VerticalTabs
} from "./Tabs";
import TopNavbar from "./TopNavbar";

type Props = {
    children: React.ReactNode;
    submitting?: boolean;
    onSubmit?: (chain: TNetworks, address: string) => void;
}

const VERTICAL_TABS: TVerticalTabs = [
    {
        label: "NFTs",
        href: "/",
        icon: <RiImage2Line className="text-xl lg:text-2xl" />,
    },
    {
        label: "Tokens",
        href: "/tokens",
        icon: <HiCurrencyDollar className="text-xl lg:text-2xl" />,
    }
];

const Scaffold: FC<Props> = ({ children }) => {
    const [matches] = useMediaQuery();
    const [showMenu, setShowMenu] = useRecoilState(drawerMenu);

    const onToggleMenu = () => {
        if (matches) {
            setShowMenu((val) => !val);
        }
    };

    return (
        <div className="w-full flex justify-between">
            <div
                onClick={onToggleMenu}
                className={`fixed md:static inset-0 z-50 md:z-0 bg-white bg-opacity-60 backdrop-filter backdrop-blur-sm md:backdrop-filter-none md:translate-x-0 transition-transform md:transition-none duration-700 ${
                    showMenu ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-56 lg:w-72 border-r p-6 bg-white h-full overflow-y-auto"
                >
                    <p className="text-3xl lg:text-4xl text-primary font-semibold tracking-min py-4">
                        LW3Punks
                    </p>
                    <div className="my-6 mb-10 p-3 flex space-x-3 bg-tertiary rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
                            alt="admin"
                            className="h-8 lg:h-12 w-8 lg:w-12 ring-4 ring-white flex-shrink-0 object-cover rounded-full"
                            loading="lazy"
                        />
                        <div className="flex-1">
                            <p className="text-sm lg:text-lg tracking-min">Julie Warren</p>
                            <p className="text-xs tracking-min text-secondary">Admin</p>
                        </div>
                    </div>

                    <VerticalTabs tabs={VERTICAL_TABS} onTabChange={onToggleMenu} />
                </div>
            </div>
            <div className="flex-1 h-screen overflow-y-auto">
                <TopNavbar />
                {children}
            </div>
        </div>
    );
};

export default Scaffold;
