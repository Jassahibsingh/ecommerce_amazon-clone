"use client";
import React, { useState } from "react";
import Link from "next/link";
import { GoTriangleRight } from "react-icons/go";
import Divider from "@mui/material/Divider";
import { supabase } from "@/supabase/supabase";
import { BsCheckCircleFill, BsInfo } from "react-icons/bs";

function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerEmailSent, setRegisterEmailSent] = useState(false);

  async function handleRegistration() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: "/login",
      },
    });
    if (error) {
      console.log("Registration Error", error);
    } else {
      setRegisterEmailSent(true);
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
      {!registerEmailSent ? (
        <div className="flex flex-col w-[350px] rounded-lg border border-[#ddd] p-[20px] mb-[22px]">
          <div className="font-normal text-[26px] mb-[10px]">
            Create account
          </div>
          <div className="font-semibold tracking-wider text-[12px] mb-4">
            Your name
            <input
              type="text"
              placeholder="First and last name"
              className="font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded  py-[4px] px-[7px] mt-1 w-full outline-none"
              style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Password
            <input
              type="text"
              placeholder="At least 6 characters"
              className="font-normal border border-[#888C8C] outline:ring-cyan-400 focus:ring-opacity-100 rounded mt-1  py-[4px] px-[7px] w-full outline-none"
              style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-start text-[11px] text-[#2b2b2b] font-thin">
            <i>
              <BsInfo color={"#007185"} size={20} />
            </i>
            Passwords must be at least 6 characters.
          </div>
          <div className="font-semibold tracking-wider text-[12px] my-2">
            Re-enter password
            <input
              type="text"
              className="font-normal border border-[#888C8C] outline:ring-cyan-400 focus:ring-opacity-100 rounded mt-1  py-[4px] px-[7px] w-full outline-none"
              style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <span
            className="flex items-center justify-center bg-[#FED914] hover:bg-[#fed050] p-2 mt-4 text-[13px] rounded-lg cursor-pointer"
            onClick={handleRegistration}
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
            SignUp with Google
            <img src="/Google.jpg" className="w-[40px]" alt="" />
          </div>
          <div className="text-[11px] mt-6">
            By creating an account, you agree to Amazon&apos;s
            <br />
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
          <Divider className="my-4" />
          <div className="flex text-[12px]">
            <span className="mr-1">Already have an account?</span>
            <Link
              className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
              href="/login"
            >
              {" "}
              Sign in
              <GoTriangleRight />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-[50%] h-44 my-[10%] rounded-lg border border-[#ddd] p-[20px] -[22px]">
          <BsCheckCircleFill color="green" size="40" />
          <p className="font-bold text-[22px] ml-2">
            Email sent. Please verify your account{" "}
          </p>
        </div>
      )}
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
