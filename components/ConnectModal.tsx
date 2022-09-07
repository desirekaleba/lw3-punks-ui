import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ethers } from "ethers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IoClose } from "react-icons/io5";
import {
    connectWallet,
    connectedUser
} from "../lib/atoms";

const ConnectModal = () => {
    const [{ openModal }, setShowModal] = useRecoilState(connectWallet);
    const setConnectedAddress = useSetRecoilState(connectedUser);
    const providerRef = useRef<ethers.providers.Web3Provider>();

    const connect = async () => {
        try {
            if (window && !window?.ethereum) {
                console.error("Browser does not support Web3");
                return new Error("Browser does not support Web3");
            }

            if (providerRef.current) {
                setShowModal((val) => ({ ...val, connecting: true }));

                await providerRef.current.send("eth_requestAccounts", []);

                const signer = providerRef.current.getSigner();

                const walletAddress = await signer.getAddress();

                if (walletAddress) {
                    setConnectedAddress((val) => ({ ...val, address: walletAddress }));
                    localStorage.setItem("address", walletAddress);
                }

                setShowModal((val) => ({ ...val, connecting: false, connected: true }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onClose = () => {
        setShowModal((val) => ({ ...val, openModal: false }));
    };

    useEffect(() => {
        if (window && window.ethereum) {
            providerRef.current = new ethers.providers.Web3Provider(window.ethereum);
        }
    }, []);

    return (
        <div
            onClick={onClose}
            className={`${!openModal && "hidden"
                } z-10 h-full flex flex-col justify-center bg-white bg-opacity-40 items-center fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-sm transition-opacity`}
        >
            <div className="rounded-lg shadow-lg transition-all duration-300 w-11/12 md:w-auto">
                <div className="bg-white rounded-xl transform transition-all w-full md:w-96 h-52 p-4">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="h-6 w-6 flex justify-center items-center border border-secondary text-secondary hover:border-black hover:text-black rounded-full"
                        >
                            <IoClose />
                        </button>
                    </div>
                    <p className="text-sm md:text-xl text-center mb-6 tracking-min">
                        Connect Wallet
                    </p>
                    <button
                        onClick={async () => {
                            await connect();
                        }}
                        className="w-full flex items-center p-4 gap-6 border rounded-lg hover:bg-gray-50"
                    >
                        <Image
                            src="/assets/metamask.svg"
                            alt="/metamask"
                            height={40}
                            width={40}
                            layout="fixed"
                            className="flex-shrink-0"
                        />
                        <p>MetaMask</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectModal;
