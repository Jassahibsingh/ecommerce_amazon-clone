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
        <div className="flex justify-between bg-lime-4 w-full mt-4">
          <ul>
            <li className="font-bold">Your Lists</li>
            <li>Create a List</li>
            <li>Find a List or Registry</li>
          </ul>
          <Divider orientation="vertical" variant="middle" flexItem />
          <ul>
            <li className="font-bold">Your Account</li>
            <li>Account</li>
            <li>Orders</li>
            <li>Recommendations</li>
            <li>Browsing History</li>
            <li>Watchlist</li>
            <li>Video Purchases & Rentals</li>
            <li>Kindle Unlimited</li>
            <li>Content & Devices</li>
            <li>Subscribe & Save Items</li>
            <li>Memberships & Subscriptions</li>
            <li>Music Library</li>
            <li>Switch Accounts</li>
            <li>Sign Out</li>
          </ul>
        </div>
      </div>
    </Popper>
  );
};

export default LanguageSelector;
