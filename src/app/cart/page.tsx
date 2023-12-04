"use client";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Link from "next/link";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

function Cart() {
  const Router = useRouter();
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);

  async function cartDataFetch() {
    const { data: cartData, error: Error } = await supabase
      .from("user_cart")
      .select("products")
      .eq("users", sessionStorage.getItem("userEmail"));
    // cartData[0].products.
  }

  useEffect(() => {
    cartDataFetch();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Header />
      <div className="flex">
        <div className="flex flex-col w-full bg-white py-3 px-4 m-3">
          <h1 className="text-[28px] font-medium">
            {cartEmpty ? "Your Amazon Cart is empty." : "Shopping Cart"}
          </h1>
          <span className="my-3">
            <Divider />
          </span>
          <div>
            {cartEmpty ? (
              "Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more. Continue shopping on the Amazon.com homepage, learn about today's deals, or visit your Wish List."
            ) : (
              <div className="flex">
                <img className="w-[150px] mx-5" src="/uno.jpg" alt="" />
                <div className="flex flex-col w-full text-[18px] space-y-1">
                  <span className="w-full flex justify-between">
                    <p>
                      Mattel Games UNO Card Game, Toy for Kids and Adults,
                      Family Game for Campi…
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
                    <span className="mx-4 h-[15px]">
                      <Divider orientation="vertical" />
                    </span>
                    <Link
                      className="text-[#007185] text-[12px] hover:text-[#f08804] hover:underline cursor-pointer"
                      href={"#"}
                    >
                      {" "}
                      Delete
                    </Link>
                    <span className="mx-4 h-[15px]">
                      <Divider orientation="vertical" />
                    </span>
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
              Subtotal (1 item): <p className="font-bold ml-2"> $10.99</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[400px]">
          <div className="flex flex-col items-center justify-between h-[110px] bg-white py-3 px-4 m-3">
            <div className="flex w-full justify-start text-[18px]">
              Subtotal (1 item): <p className="font-bold ml-2"> $10.99</p>
            </div>
            <span
              onClick={() => Router.push("/checkout")}
              className="flex items-center justify-center w-full bg-[#FED914] hover:bg-[#fed050] my-1 p-2 text-[13px] rounded-md cursor-pointer"
            >
              Proceed to checkout
            </span>
          </div>
          <div className="flex items-start justify-between h-[110px] bg-white py-3 px-4 m-3">
            <img src="/prime.svg" className="w-[50px]" alt="" />
            <div className="flex flex-col ml-2">
              <p className="text-[13px] font-bold">
                Get free and faster delivery with a 30-Day FREE trial
              </p>
              <div
                style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                className="flex my-2 px-3 py-1.5 w-[112px] border-[#D5D9D9] bg-white hover:bg-slate-50 text-[13px] border rounded-md cursor-pointer"
              >
                Start free trial
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
