import React, { useEffect, useRef, useState } from "react";
import {
  HiMenu,
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineUser,
} from "react-icons/hi";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  connectedUser,
  invalidAddressMsg,
  connectWallet,
  drawerMenu,
} from "../lib/atoms";
import { TNetworks } from "../lib/types";
import { isValidAddress, shrink } from "../lib/Utils";

type Props = {
  submitting?: boolean;
  onSubmit?: (chain: TNetworks, address: string) => void;
};

const TopNavbar = ({ submitting, onSubmit }: Props) => {
  const setWarning = useSetRecoilState(invalidAddressMsg);
  const [{ address, chain }, setAddress] = useRecoilState(connectedUser);
  const [{ connecting }, setConnectWallet] = useRecoilState(connectWallet);
  const setShowMenu = useSetRecoilState(drawerMenu);

  const [storedAddress, setStoredAddress] = useState("");

  const connectedWidgetRef = useRef<HTMLDivElement>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputAddress = new FormData(event.currentTarget).get(
      "address"
    ) as string;

    if (!isValidAddress(inputAddress)) {
      setWarning("Invalid address");
      return;
    }

    onSubmit?.(chain, inputAddress);
    setAddress((val) => ({ ...val, address: inputAddress }));
  };

  const onConnectWallet = async () => {
    setConnectWallet((val) => ({ ...val, openModal: true }));
  };

  const onDisconnectWallet = async () => {
    localStorage.removeItem("address");
    setStoredAddress("");
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("address")) {
      const localAddress = localStorage.getItem("address") || "";
      setStoredAddress(localAddress);
      setAddress((val) => ({ ...val, address: localAddress }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connecting]);

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm w-full min-h-[85px] flex flex-wrap-reverse md:flex-nowrap justify-between md:space-x-3 px-6 lg:px-8 pb-4">
      <form
        className="flex w-full md:w-72 lg:w-80 h-10 mt-auto"
        onSubmit={submit}
      >
        <input
          type="text"
          name="address"
          defaultValue={address}
          className="flex-1 border rounded-tl-full rounded-bl-full border-r-0 pl-4 placeholder:text-xs placeholder:font-normal focus:outline-none caret-primary"
          placeholder="Search by ethereum address"
        />
        <button
          type="submit"
          disabled={submitting}
          className="border hover:bg-primary hover:text-white text-secondary disabled:bg-gray-300 px-3 flex justify-center items-center rounded-tr-full rounded-br-full"
        >
          <HiOutlineSearch />
        </button>
      </form>
      <div className="flex space-x-3 mt-auto md:h-10 w-full md:w-auto justify-between md:justify-start py-4 md:py-0">
        <button
          onClick={() => setShowMenu(true)}
          className="h-10 w-10 rounded-full border flex md:hidden items-center justify-center flex-shrink-0"
        >
          <HiMenu />
        </button>
        <div className="h-10 w-10 rounded-full border hover:text-secondary flex items-center justify-center flex-shrink-0">
          <HiOutlineBell />
        </div>
        {(!storedAddress && (
          <button
            disabled={connecting}
            onClick={onConnectWallet}
            className="capitalize w-2/3 md:w-32 lg:w-48 rounded-full bg-primary disabled:bg-gray-300 text-white font-semibold flex-shrink-0"
          >
            {connecting ? "Connecting" : "Connect"}
          </button>
        )) || (
            <div
              className="inline-block relative dropdown"
              ref={connectedWidgetRef}
            >
              <button
                aria-haspopup="true"
                aria-expanded="true"
                aria-controls="headlessui-menu-items-117"
                className="h-10 w-10 rounded-full border hover:text-secondary flex-shrink-0 flex items-center justify-center transition duration-150 ease-in-out"
              >
                <HiOutlineUser className="text-xl text-black/70" />
              </button>
              <Dropdown
                walletAddress={storedAddress}
                onLogout={onDisconnectWallet}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default TopNavbar;

type IProps = {
  walletAddress: string;
  onLogout?: () => void;
};

const Dropdown = ({ walletAddress, onLogout }: IProps) => {
  return (
    <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
      <div
        className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
        aria-labelledby="headlessui-menu-button-1"
        id="headlessui-menu-items-117"
        role="menu"
      >
        <div className="px-4 py-3">
          <p className="text-xs leading-5">Connected as</p>
          <p className="text-xs font-medium leading-5 text-secondary truncate">
            {shrink(walletAddress)}
          </p>
        </div>
        <div className="py-1">
          <div
            tabIndex={0}
            className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
            role="menuitem"
          >
            Profile
          </div>
        </div>
        <div className="py-1">
          <div
            tabIndex={3}
            className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
            role="menuitem"
            onClick={onLogout}
          >
            Disconnect
          </div>
        </div>
      </div>
    </div>
  );
};
