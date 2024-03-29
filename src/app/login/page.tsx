"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GoTriangleRight } from "react-icons/go";
import Divider from "@mui/material/Divider";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const Router = useRouter();
  async function handleLogin() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("SignIn Error", error);
      setLoading(false);
      setErr(true);
    } else {
      Router.push("/");
      sessionStorage.setItem("userEmail", data?.user?.email || "");
      sessionStorage.setItem("userName", data?.user?.user_metadata.name || "");
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
      {err ? (
        <div className="flex items-start mb-4 p-4 w-[350px] border border-[#CC0C39] rounded-lg">
          <CiWarning color="#CC0C39" size={35} />
          <div className="flex flex-col justify-center ml-2">
            <p className="text-[16px] text-[#CC0C39] font-semibold">
              There was a problem
            </p>
            <p className="text-[12px] font-medium leading-7">
              The email or password you entered is incorrect
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
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
              href={"/account-recovery"}
            >
              {" "}
              Forgot your password?
            </Link>
          </span>
          <div
            style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
            className="flex relative items-center font-normal border border-[#888C8C] outline:ring-cyan-400 focus:ring-opacity-100 rounded mt-1  w-full outline-none"
          >
            <input
              type={passwordVisible ? "text" : "password"}
              className="flex w-full outline-none py-[4px] px-[7px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <span className="absolute right-1">
                <FaEye size={15} onClick={() => setPasswordVisible(false)} />
              </span>
            ) : (
              <span className="absolute right-1">
                <FaEyeSlash
                  size={15}
                  onClick={() => setPasswordVisible(true)}
                />
              </span>
            )}
          </div>
        </div>
        <button
          className={`flex items-center justify-center ${
            isLoading
              ? "bg-[#FED]"
              : "bg-[#FED914] hover:bg-[#fed050] cursor-pointer"
          } p-2 mt-4 text-[13px] rounded-lg`}
          onClick={handleLogin}
          disabled={isLoading}
        >
          Continue
        </button>
        {/* <Divider className="text-[12px] my-3" variant="middle">
          or
        </Divider>
        <div
          style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
          className="flex items-center justify-center font-semibold p-2 border-[#D5D9D9] bg-white hover:bg-slate-50 text-[13px] border rounded-md cursor-pointer"
        >
          SignIn with Google
          <img src="/Google.jpg" className="w-[40px]" alt="" />
        </div> */}
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
        href="/registration"
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
