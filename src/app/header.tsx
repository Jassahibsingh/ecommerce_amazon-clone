"use client";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { FiMapPin, FiShoppingCart, FiMenu } from "react-icons/fi";
import LanguageSelector from "./langugaeSelector";
import { Backdrop } from "@mui/material";

interface headerProps {
  setBackdropOpen: (value: boolean) => void;
}

const Header = ({ setBackdropOpen }: headerProps) => {
  return (
    <header className="flex flex-col bg-[#131920] w-full">
      <div className="flex items-center">
        <img
          className="w-32 object-contain cursor-pointer hover:outline outline-1"
          src="/amazon-logo.png"
          alt="Amazon Logo"
        />
        <div className="flex flex-col items-center p-2 text-white cursor-pointer text-xs w-20 hover:outline outline-1">
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
            onOpen={() => setBackdropOpen(true)}
            onClose={() => setBackdropOpen(false)}
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
          <div className="flex flex-col p-2 text-white cursor-pointer text-xs w-[9rem] hover:outline outline-1">
            Hello, Sign In
            <span className="flex items-center text-sm font-bold">
              Account & Lists
              <AiFillCaretDown color="#656563" size={12} />
            </span>
          </div>
          <div className="flex flex-col p-2 text-white cursor-pointer text-xs w-20 hover:outline outline-1">
            Returns
            <span className="flex items-center text-sm font-bold">
              & Orders
            </span>
          </div>
          <div className="flex items-end px-2 py-2.5 text-white cursor-pointer text-sm hover:outline outline-1">
            <div className="flex flex-col items-center">
              <span className="absolute top-2 right-[4.rem] text-xs font-bold text-[#f08804]">
                0
              </span>
              <FiShoppingCart size={30} />
            </div>
            Cart
          </div>
        </div>
      </div>
      <div className="flex items-center mx-2 bg-[#232f3e] text-white">
        <div className="flex items-center p-2 text-white cursor-pointer text-sm hover:outline outline-1">
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
