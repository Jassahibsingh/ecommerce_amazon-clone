"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Link from "next/link";

function Cart() {
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Header />
      <div className="flex flex-col bg-white py-3 px-4 m-3">
        <h1 className="text-[28px] font-medium">
          {cartEmpty ? "Your Amazon Cart is empty." : "Shopping Cart"}
        </h1>
        <Divider className="my-3" />
        <div>
          {cartEmpty ? (
            "Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more. Continue shopping on the Amazon.com homepage, learn about today's deals, or visit your Wish List."
          ) : (
            <div className="flex">
              <img className="w-[150px] mx-5" src="/uno.jpg" alt="" />
              <div className="flex flex-col w-full text-[18px]">
                <span className="w-full flex justify-between">
                  <p>
                    Mattel Games UNO Card Game, Toy for Kids and Adults, Family
                    Game for Campi…
                  </p>
                  <p className="font-bold">$10.99</p>
                </span>
                <p className="text-[12px]">In Stock</p>
                <p className="text-[12px]">
                  Gift options not available.
                  <Link
                    className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                    href={"#"}
                  >
                    {" "}
                    Learn more
                  </Link>
                </p>
                <div className="flex items-center h-10">
                  <select
                    className="w-[70px] border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg my-3 py-[5px] px-[7px] outline-none"
                    style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                    name="Country"
                    id=""
                    defaultValue={1}
                  >
                    <option className="" value="" disabled hidden>
                      Qty:1
                    </option>
                    {Array.from({ length: 30 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <Divider orientation="vertical" className="mx-4 h-[15px]" />
                  <Link
                    className="text-[#007185] text-[12px] hover:text-[#f08804] hover:underline cursor-pointer"
                    href={"#"}
                  >
                    {" "}
                    Delete
                  </Link>
                  <Divider orientation="vertical" className="mx-4 h-[15px]" />
                  <Link
                    className="text-[#007185] text-[12px] hover:text-[#f08804] hover:underline cursor-pointer"
                    href={"#"}
                  >
                    {" "}
                    Save for Later
                  </Link>
                </div>
              </div>
            </div>
          )}
          <Divider className="my-3" />
          <div className="flex w-full justify-end text-[18px]">
            Subtotal (1 item): $10.99
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
