"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GoTriangleRight } from "react-icons/go";
import Divider from "@mui/material/Divider";
import { supabase } from "@/supabase/supabase";
import { BsInfo } from "react-icons/bs";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("SignIn Error", error);
    } else {
      console.log("user", data);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center m-4">
        <img
          className="w-[100px] object-contain cursor-pointer"
          src="/amazon-logo-white.png"
          alt="Amazon Logo"
        />
      </div>
      <div className="flex flex-col w-[350px] rounded-lg border border-[#ddd] p-[20px] mb-[22px]">
        <div className="font-normal text-[26px] mb-[10px]">Sign in</div>
        <div className="font-semibold tracking-wider text-[12px] mb-4">
          Email
          <input
            type="text"
            className="font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded  py-[4px] px-[7px] mt-1 w-full outline-none"
            style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="font-semibold tracking-wider text-[12px] mb-1">
          <span className="flex justify-between">
            Password
            <Link
              className="font-normal text-[11px] text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
              href={"#"}
            >
              {" "}
              Forgot your password?
            </Link>
          </span>
          <input
            type="text"
            className="font-normal border border-[#888C8C] outline:ring-cyan-400 focus:ring-opacity-100 rounded mt-1  py-[4px] px-[7px] w-full outline-none"
            style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span
          className="flex items-center justify-center bg-[#FED914] hover:bg-[#fed050] p-2 mt-4 text-[13px] rounded-lg cursor-pointer"
          onClick={handleLogin}
        >
          Continue
        </span>
        <Divider className="text-[12px] my-3" variant="middle">
          or
        </Divider>
        <div
          style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
          className="flex items-center justify-center font-semibold p-2 border-[#D5D9D9] bg-white hover:bg-slate-50 text-[13px] border rounded-md cursor-pointer"
        >
          SignIn with Google
          <img src="/Google.jpg" className="w-[40px]" alt="" />
        </div>
        <div className="text-[11px] mt-6">
          By continuing, you agree to Amazon&apos;s
          <Link
            className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
            href={"#"}
          >
            {" "}
            Conditions of Use{" "}
          </Link>
          and
          <Link
            className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
            href={"#"}
          >
            {" "}
            Privacy Notice
          </Link>
          .
        </div>
        <div className="flex text-[12px] mt-6">
          <GoTriangleRight />
          <Link
            className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
            href={"#"}
          >
            {" "}
            Need help?
          </Link>
        </div>
      </div>
      <Divider
        className="text-[11px] text-[#767676] mt-2 w-[300px]"
        variant="middle"
      >
        New to Amazon?
      </Divider>
      <Link
        href="/server/registration"
        style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
        className="flex items-center justify-center my-4 p-2 w-[350px] border-[#D5D9D9] bg-white hover:bg-slate-50 text-[12px] border rounded-md cursor-pointer"
      >
        Create your Amazon account
      </Link>
      <div
        className="bg-[linear-gradient(to bottom,rgba(0,0,0,.14),rgba(0,0,0,.03) 3px,transparent)]"
        style={{
          background:
            "linear-gradient(to bottom,rgba(0,0,0,.14),rgba(0,0,0,.03) 3px,transparent)",
        }}
      ></div>
      <div className="flex text-[10px]">
        <Link
          className="text-[#007185] hover:text-[#f08804] mr-4 hover:underline cursor-pointer"
          href={"#"}
        >
          {" "}
          Conditions of Use
        </Link>
        <Link
          className="text-[#007185] hover:text-[#f08804] mr-4 hover:underline cursor-pointer"
          href={"#"}
        >
          {" "}
          Privacy Notice
        </Link>
        <Link
          className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
          href={"#"}
        >
          {" "}
          Help
        </Link>
      </div>
      <div className="my-8 text-center text-[10px]">
        © {new Date().getFullYear()} Amazon by Jassahib | Built with Next.js and
        Tailwind CSS
      </div>
    </div>
  );
}

export default Page;
