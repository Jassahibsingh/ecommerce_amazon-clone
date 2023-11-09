"use client";
import { Divider } from "@mui/material";
import React, { useState } from "react";

function Cart() {
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex flex-col bg-white py-3 px-1">
        <h1>{cartEmpty ? "Your Amazon Cart is empty." : "Shopping Cart"}</h1>
        <Divider variant="middle" />
        <div>
          {cartEmpty ? (
            "Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more. Continue shopping on the Amazon.com homepage, learn about today's deals, or visit your Wish List."
          ) : (
            <div className="flex">
              <img src="/uno.jpg" alt="" />
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
                  Gift options not available. Gift options not available. Learn
                  more
                </p>
                <div className="flex">
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
                  <Divider orientation="vertical" variant="middle" />
                  Delete
                  <Divider orientation="vertical" variant="middle" />
                  Save for Later
                </div>
              </div>
            </div>
          )}
          <Divider variant="middle" />
          <div className="flex w-full items-end text-[18px]">
            Subtotal (1 item): $10.99
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
