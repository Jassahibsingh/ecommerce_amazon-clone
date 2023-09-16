import React, { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import { CiGlobe } from "react-icons/ci";

interface sidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

function SidebarMenu({ isSidebarOpen, setSidebarOpen }: sidebarProps) {
  return (
    <div className="flex relative w-[370px] bg-white">
      <div className="w-full">
        <div className="flex items-center bg-[#232F3E] text-white p-3 text-lg font-bold">
          <FaUserCircle size={25} className="mr-3 ml-5" />
          Hello, Jassahib
        </div>
        <div
          className="overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 50px)" }}
        >
          <ul>
            <li className="flex items-center text-[#111] text-lg font-bold pl-[36px] pt-[20px] pb-[7px]">
              Digital Content & Devices
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Amazon Music <BsChevronRight />
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Kindle E-readers & Books <BsChevronRight />
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Amazon Appstore <BsChevronRight />
            </li>
            <Divider className="my-[10px]" />
            <li className="flex items-center text-[#111] text-lg font-bold pl-[36px] pb-[7px]">
              Shop By Department
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Electronics <BsChevronRight />
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Computers <BsChevronRight />
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Smart Home <BsChevronRight />
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Arts & Crafts <BsChevronRight />
            </li>
            <li className="flex items-center text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              See All <BsChevronDown className="ml-2" />
            </li>
            <Divider className="my-[10px]" />
            <li className="flex items-center text-[#111] text-lg font-bold pl-[36px] pb-[7px]">
              Programs & Features
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Gift Cards <BsChevronRight />
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Shop By Interest
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Amazon Live <BsChevronRight />
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              International Shopping <BsChevronRight />
            </li>
            <li className="flex items-center text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              See All <BsChevronDown className="ml-2" />
            </li>
            <Divider className="my-[10px]" />
            <li className="flex items-center text-[#111] text-lg font-bold pl-[36px] pt-[20px] pb-[7px]">
              Help & Settings
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Your Account
            </li>
            <li className="flex items-center text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              <CiGlobe size={18} />
              <span className="ml-1.5">English</span>
            </li>
            <li className="flex items-center text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              <img
                className="w-4 object-contain cursor-pointer"
                src="/us-flag.png"
                alt="Flag"
              />
              <span className="ml-1.5">United States</span>
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Customer Service
            </li>
            <li className="flex items-center justify-between text-sm hover:bg-slate-200 pl-9 pr-7 py-[10px]">
              Sign Out
            </li>
          </ul>
        </div>
      </div>
      <span
        className="absolute -right-9 top-4 cursor-pointer"
        style={{ visibility: isSidebarOpen ? "visible" : "hidden" }}
        onClick={() => setSidebarOpen(false)}
      >
        <CgClose color="white" size={28} />
      </span>
    </div>
  );
}

export default SidebarMenu;
