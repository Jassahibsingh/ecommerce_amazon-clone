import React from "react";
import Popper from "@mui/material/Popper";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";

const LanguageSelector = (props: any) => {
  return (
    <Popper {...props} Arrow placement="bottom-start">
      <div className="flex flex-col items-start justify-center bg-white absolute top-14 left-[49.2rem] w-[500px] px-4 py-4">
        <div className="flex justify-between bg-[#E7F4F5] rounded-[6px] text-[13px] p-[12px] cursor-pointer w-full">
          Who&apos;s shopping? Select a profile.
          <span className="flex items-center justify-center text-[14px] font-medium text-[#007185] hover:text-[#f08804] hover:underline">
            Manage Profiles
            <BsChevronRight />
          </span>
        </div>
        <div className="flex justify-between leading-6 w-full mt-4 text-[13px]">
          <ul>
            <li className="font-bold text-[15px]">Your Lists</li>
            <li className="hover:text-[#f08804] hover:underline">
              <Link href={"#"}>Create a List</Link>
            </li>
            <li className="hover:text-[#f08804] hover:underline">
              <Link href={"#"}>Find a List or Registry</Link>
            </li>
          </ul>
          <div className="flex mr-10">
            <Divider orientation="vertical" variant="middle" flexItem />
            <ul className="ml-5">
              <li className="font-bold text-[15px]">Your Account</li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Account</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Orders</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Recommendations</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Browsing History</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Watchlist</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Video Purchases & Rentals</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Kindle Unlimited</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Content & Devices</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Subscribe & Save Items</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Memberships & Subscriptions</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Music Library</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Switch Accounts</Link>
              </li>
              <li className="hover:text-[#f08804] hover:underline">
                <Link href={"#"}>Sign Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Popper>
  );
};

export default LanguageSelector;
