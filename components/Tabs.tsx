import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { currentYPos } from "../lib/atoms";
import { TVerticalTabs } from "../lib/types";

type IProps = {
    tabs: TVerticalTabs;
    onTabChange?: (index: number) => void;
};

export const VerticalTabs = ({ tabs, onTabChange }: IProps) => {
    const tabItemsRef = useRef<HTMLLIElement[]>([]);
    const [yPos, setYPos] = useRecoilState(currentYPos);

    const { pathname } = useRouter();

    useEffect (() => {
        const tabIndex = tabs.findIndex((tab) => tab.href === pathname);
        setYPos(tabItemsRef.current?.[tabIndex]?.offsetTop);
    }, [pathname, setYPos, tabs]);

    return (
        <ul className="list-none relative isolate">
            <li
                className="absolute bg-primary text-white inset-0 -z-[1] h-[48px] rounded-lg"
                style={{
                    transition: "all 0.15s ease-in-out 0s",
                    transform: `translateY(${yPos}px)`,
                }}
            />
            {tabs.map((tab, index) => {
                const { label, icon, href } = tab;
                const isActive = pathname === href;

                return (
                    <Link href={href} key={label}>
                        <li
                            role="tab"
                            aria-selected={isActive}
                            tabIndex={0}
                            onKeyDown={() => null}
                            ref={(element) => {
                                if (element !== null) {
                                    tabItemsRef.current[index] = element;
                                    return tabItemsRef.current[index];
                                }
                                return element;
                            }}
                            onClick={() => {
                                onTabChange?.(index);
                            }}
                            className={`flex items-center p-3 my-2 rounded-lg space-x-3 ${
                                isActive
                                    ? "text-white font-medium"
                                    : "text-secondary font-medium"
                            }`}
                        >
                            {icon}
                            <p className="tracking-min text-sm lg:text-base">{label}</p>
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
};
