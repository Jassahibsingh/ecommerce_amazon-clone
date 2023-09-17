"use client";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import { RiExpandUpDownFill } from "react-icons/ri";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex flex-col justify-center text-white w-full">
      <div
        className="flex justify-center bg-[#374758] hover:bg-[#3c5066] cursor-pointer text-xs py-4"
        onClick={scrollToTop}
      >
        Back to top
      </div>
      <div className="flex flex-col py-10 bg-[#232f3d] w-full">
        <div className="flex justify-center space-x-28 ">
          <div className="space-y-2">
            <h6 className="font-semibold">Get to Know Us</h6>
            <ul className="text-sm space-y-2 font-light">
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">About Amazon</a>
              </li>
              <li>
                <a href="#">Investor Relations</a>
              </li>
              <li>
                <a href="#">Amazon Devices</a>
              </li>
              <li>
                <a href="#">Amazon Science</a>
              </li>
            </ul>
          </div>
          <div className="space-y-2 w-44">
            <h6 className="font-semibold">Make Money With Us</h6>
            <ul className="text-sm space-y-2 font-light">
              <li>
                <a href="#">Sell products on Amazon</a>
              </li>
              <li>
                <a href="#">Sell on Amazon Business</a>
              </li>
              <li>
                <a href="#">Sell apps on Amazon</a>
              </li>
              <li>
                <a href="#">Become an Affiliate</a>
              </li>
              <li>
                <a href="#">Advertise Your Products</a>
              </li>
              <li>
                <a href="#">Self-Publish with Us</a>
              </li>
              <li>
                <a href="#">Host an Amazon Hub</a>
              </li>
              <li>
                <a href="#" className="flex leading-4 items-start">
                  <FiChevronRight size={15} />
                  See More Make Money with Us
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h6 className="font-semibold">Amazon Payment Products</h6>
            <ul className="text-sm space-y-2 font-light">
              <li>
                <a href="#">Amazon Business Card</a>
              </li>
              <li>
                <a href="#">Shop with Points</a>
              </li>
              <li>
                <a href="#">Reload Your Balance</a>
              </li>
              <li>
                <a href="#">Amazon Currency Convertor</a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h6 className="font-semibold">Let Us Help You</h6>
            <ul className="text-sm w-36 space-y-2 leading-5 font-light">
              <li>
                <a href="#">Amazon and COVID-19</a>
              </li>
              <li>
                <a href="#">Your Account</a>
              </li>
              <li>
                <a href="#">Your Orders</a>
              </li>
              <li>
                <a href="#">Shipping Rates & Policies</a>
              </li>
              <li>
                <a href="#">Returns & Replacements</a>
              </li>
              <li>
                <a href="#">Manage Your Content and Devices</a>
              </li>
              <li>
                <a href="#">Amazon Assistant</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
        <Divider color="#3a4551" className="mt-10 mb-5" />
        <div className="flex justify-center items-center space-x-20">
          <img
            className="w-24 object-contain cursor-pointer"
            src="/amazon-logo-footer.png"
            alt="Amazon Logo"
          />
          <div className="flex space-x-2">
            <div className="flex items-center space-x-6 justify-between text-sm cursor-pointer border border-[#848585] px-2 py-2">
              <div className="flex">
                <CiGlobe size={18} />
                <span className="ml-1.5">English</span>
              </div>
              <>
                <RiExpandUpDownFill color="#656563" />
              </>
            </div>
            <div className="flex items-center space-x-6 justify-between text-sm cursor-pointer border border-[#848585] pl-2 pr-6 py-2">
              <div className="flex">
                $<span className="ml-1.5">USD - U.S. Dollar</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 justify-between text-sm cursor-pointer border border-[#848585] pl-2 pr-6 py-2">
              <div className="flex">
                <img
                  className="w-4 object-contain cursor-pointer"
                  src="/us-flag.png"
                  alt="Flag"
                />
                <span className="ml-1.5">United States</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm text-center">
          © {new Date().getFullYear()} Amazon by Jassahib | Built with Next.js
          and Tailwind CSS
        </div>
      </div>
    </footer>
  );
}

export default Footer;
