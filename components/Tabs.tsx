import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { currentYPos } from "../lib/atoms";
import { TVerticalTabs } from "../lib/types";
import { SUPPORTED_NETWORKS } from "../lib/Utils/constants";

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

type Props = {
    tabs: { 
        value: string | number;
        label: string
    }[];
    defaultTab?: string | number;
    className?: string;
    selectedStyle?: string;
    unSelectedStyle?: string;
    onTabChange?: (value: string | number, index?: number) => void;
    onInitialLoad?: (value: string | number, index?: number) => void;
};

const Tabs: FC<Props> = ({
    tabs,
    defaultTab,
    className,
    selectedStyle,
    unSelectedStyle,
    onTabChange,
    onInitialLoad,
}: Props) => {
    const [boundRect, setBoundRect] = useState<DOMRect>();
    const { query, pathname } = useRouter();
    const { chain } = query;

    const [currentIndex, setCurrentIndex] = useState(0);

    const tabItemsRef = useRef<HTMLDivElement[]>([]);
    const xPos = (tabItemsRef.current?.[currentIndex]?.offsetLeft || 5) - 5;

    const getBounds = useCallback(() => {
        if (tabItemsRef.current) {
            const item = tabItemsRef.current[currentIndex];
            const boundRect = item.getBoundingClientRect();

            setBoundRect(boundRect);
        }
    }, [currentIndex, tabItemsRef]);

    useEffect(() => {
        getBounds();

        if (window === undefined) return;

        window.addEventListener("resize", () => {
            getBounds();
        });

        return () => {
            window.removeEventListener("resize", () => {
                getBounds();
            });
        };
    }, [getBounds]);

    useEffect(() => {
        const defaultTabIndex = tabs.findIndex((tab) => {
            if (chain) {
                return tab.value === chain;
            }
            return tab.value === defaultTab;
        });

        setCurrentIndex(defaultTabIndex < 0 ? 0 : defaultTabIndex);
        onInitialLoad?.(
            tabs[defaultTabIndex]?.value || SUPPORTED_NETWORKS.ethereum.value
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain]);

    return (
        <div
            className={`flex items-center bg-tertiary rounded-md relative h-10 isolate py-[0.3rem] ${className}`}
        >
            <div
                className="bg-white rounded-md text-branding-blue font-medium absolute top-0 botton-0 -z-[1]"
                style={{
                    transition: "all 0.1s ease-in-out 0s",
                    transform: `translateX(${xPos}px)`,
                    width: boundRect?.width,
                    margin: 4,
                }}
            />
            {tabs.map((tabItem, index) => {
                const isCurrent = currentIndex == index;

                return (
                    <Link href={`${pathname}?chain=${tabItem.value}`} key={tabItem.value}>
                        <div
                            role="tab"
                            aria-selected={isCurrent}
                            tabIndex={0}
                            onKeyDown={() => null}
                            ref={(element) => {
                                if (element != null) {
                                    tabItemsRef.current[index] = element;
                                    return tabItemsRef.current[index];
                                }
                                return element;
                            }}
                            onClick={() => {
                                onTabChange?.(tabItem.value, index);
                                setCurrentIndex(index);
                            }}
                            className={`flex justify-center items-center w-full h-full px-3 mx-[0.3rem] text-xs ${
                                isCurrent ? selectedStyle : unSelectedStyle
                            }`}
                        >
                            {tabItem.label}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

Tabs.defaultProps = {
    onTabChange: () => null,
    className: "",
    selectedStyle: "text-primary font-semibold",
    unSelectedStyle: "text-secondary",
    defaultTab: "",
};

export default Tabs;
