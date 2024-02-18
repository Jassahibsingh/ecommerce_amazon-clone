"use client";
import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { FiMapPin, FiShoppingCart, FiMenu } from "react-icons/fi";
import LanguageSelector from "./components/languageSelector";
import { Backdrop } from "@mui/material";
import AccountsListsPopup from "./components/accountsListsPopup";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  setBackdropOpen,
  setLocModalOpen,
  setSidebarOpen,
} from "../redux/headerFuncSlices";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import LocationModal from "./components/locationModal";
import SidebarMenu from "./components/sidebarMenu";
import { RootState } from "@/redux/store";

const Header = () => {
  const Router = useRouter();
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.header.isSidebarOpen
  );

  const isBackdropOpen = useSelector(
    (state: RootState) => state.header.isBackdropOpen
  );

  const [productQty, setProductQty] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function cartDataFetch() {
    const { data, error } = await supabase
      .from("user_cart")
      .select("products")
      .eq("users", sessionStorage.getItem("userEmail"));
    if (error) {
      console.log("Error while fetching data", error);
    }
    setProductQty(data ? data[0]?.products.length : undefined);
  }

  function handleBackdrop(open: boolean) {
    dispatch(setBackdropOpen(open));
    if (open && isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  useEffect(() => {
    supabase
      .channel("user_cart")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_cart" },
        cartDataFetch
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "user_cart" },
        cartDataFetch
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "user_cart" },
        cartDataFetch
      )
      .subscribe();

    cartDataFetch();
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      handleBackdrop(true);
    } else {
      handleBackdrop(false);
    }
  }, [isSidebarOpen]);

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-[#FEBD69] hover:bg-[#fcb252] py-2 px-4 rounded-r-md"
            onClick={() =>
              searchQuery.length >= 3 && Router.push(`/search?q=${searchQuery}`)
            }
          >
            <AiOutlineSearch size={25} />
          </button>
        </div>
        <div className="flex items-center ml-auto space-x-2 w-[25rem]">
          <Tooltip
            onOpen={() => handleBackdrop && handleBackdrop(true)}
            onClose={() => handleBackdrop && handleBackdrop(false)}
            title={"Language Selection"}
            arrow
            placement="top"
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
              Hello,{" "}
              {sessionStorage.getItem("userName")
                ? sessionStorage.getItem("userName")
                : "Sign In"}
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
            <div className="flex flex-col relative items-center">
              {productQty && sessionStorage.getItem("userEmail") ? (
                <span className="flex items-center justify-center absolute -top-1 -left-1 text-[12px] text-black font-bold bg-[#F99B01] w-[20px] rounded-full">
                  {productQty}
                </span>
              ) : (
                <></>
              )}
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
      <LocationModal />
      <div
        className="absolute top-0 left-0 z-40"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <SidebarMenu />
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: isSidebarOpen ? 30 : 20 }}
        open={isBackdropOpen}
        onClick={() => {
          handleBackdrop(false);
          dispatch(setSidebarOpen(false));
        }}
      />
    </header>
  );
};

export default Header;
