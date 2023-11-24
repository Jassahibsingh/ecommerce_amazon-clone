"use client";
import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { FiMapPin, FiShoppingCart, FiMenu } from "react-icons/fi";
import LanguageSelector from "./components/languageSelector";
import { Backdrop } from "@mui/material";
import AccountsListsPopup from "./components/accountsListsPopup";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setLocModalOpen, setSidebarOpen } from "../redux/headerFuncSlices";
import { useRouter } from "next/navigation";

interface headerProps {
  handleBackdrop?: (value: boolean) => void;
}

const Header = ({ handleBackdrop }: headerProps) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  return (
    <header className="flex flex-col bg-[#131920] w-full">
      <div className="flex items-center z-30">
        <img
          className="w-32 object-contain cursor-pointer hover:outline outline-1"
          src="/amazon-logo.png"
          alt="Amazon Logo"
        />
        <div
          className="flex flex-col items-center p-2 text-white cursor-pointer text-xs w-20 hover:outline outline-1"
          onClick={() => dispatch(setLocModalOpen(true))}
        >
          Deliver to
          <div className="flex items-center text-sm font-bold">
            <FiMapPin size={20} />
            <span className="ml-1">India</span>
          </div>
        </div>
        <div className="flex flex-grow mx-4 w-[20rem]">
          <input
            type="text"
            className="w-full py-2 px-3 rounded-l-md focus:outline-none"
            placeholder="Search for products..."
          />
          <button className="bg-[#FEBD69] hover:bg-[#fcb252] py-2 px-4 rounded-r-md">
            <AiOutlineSearch size={25} />
          </button>
        </div>
        <div className="flex items-center ml-auto space-x-2 w-[25rem]">
          <Tooltip
            onOpen={() => handleBackdrop && handleBackdrop(true)}
            onClose={() => handleBackdrop && handleBackdrop(false)}
            title={"Language Selection"}
            arrow
            PopperComponent={LanguageSelector}
          >
            <div className="flex items-center px-2 py-4 text-white cursor-pointer text-sm w-[5rem] hover:outline outline-1">
              <img
                className="w-5 object-contain cursor-pointer"
                src="/us-flag.png"
                alt="Flag"
              />
              <span className="ml-1">EN</span>
              <AiFillCaretDown color="#656563" size={12} />
            </div>
          </Tooltip>
          <Tooltip
            onOpen={() => handleBackdrop && handleBackdrop(true)}
            onClose={() => handleBackdrop && handleBackdrop(false)}
            title={"Accounts & Lists"}
            arrow
            PopperComponent={AccountsListsPopup}
          >
            <Link
              className="flex flex-col p-2 text-white cursor-pointer text-xs w-[9rem] hover:outline outline-1"
              href="/login"
            >
              Hello, Sign In
              <span className="flex items-center text-sm font-bold">
                Account & Lists
                <AiFillCaretDown color="#656563" size={12} />
              </span>
            </Link>
          </Tooltip>
          <div className="flex flex-col p-2 text-white cursor-pointer text-xs w-20 hover:outline outline-1">
            Returns
            <span className="flex items-center text-sm font-bold">
              & Orders
            </span>
          </div>
          <div
            className="flex items-end relative px-2 py-2.5 text-white cursor-pointer text-sm hover:outline outline-1"
            onClick={() => Router.push("/cart")}
          >
            <div className="flex flex-col items-center">
              <FiShoppingCart size={30} />
            </div>
            Cart
          </div>
        </div>
      </div>
      <div className="flex items-center mx-2 bg-[#232f3e] text-white z-30">
        <div
          className="flex items-center p-2 text-white cursor-pointer text-sm hover:outline outline-1"
          onClick={() => {
            dispatch(setSidebarOpen(true));
          }}
        >
          <FiMenu size={20} />
          <span className="ml-1">All</span>
        </div>
        <div className="flex p-2 text-white cursor-pointer text-sm hover:outline outline-1">
          Today&apos;s Deals
        </div>
        <div className="flex p-2 text-white cursor-pointer text-sm hover:outline outline-1">
          Customer Service
        </div>
        <div className="flex p-2 text-white cursor-pointer text-sm hover:outline outline-1">
          Register
        </div>
        <div className="flex p-2 text-white cursor-pointer text-sm hover:outline outline-1">
          Gift Cards
        </div>
        <div className="flex p-2 text-white cursor-pointer text-sm hover:outline outline-1">
          Sell
        </div>
      </div>
    </header>
  );
};

export default Header;
