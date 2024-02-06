"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/supabase/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import { BsCheckCircleFill } from "react-icons/bs";

function RecoverAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordchanged, setPasswordChanged] = useState(false);
  const [isRecoveryEmailSent, setRecoveryEmailSent] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const Router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get("mode");

  async function resetPassword(emailID: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(emailID, {
      redirectTo:
        "https://ecommerce-amazon-clone-js.vercel.app/account-recovery?mode=reset",
    });
    if (error) {
      console.log("Error", error);
      setLoading(false);
      setErr(true);
    } else {
      setRecoveryEmailSent(true);
      setErr(false);
    }
  }

  async function settingPassword() {
    setLoading(true);

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setErrMsg("There was an error updating your password.");
      } else {
        setPasswordChanged(true);
        console.log("Password changed successfully");
        Router.push("/login");
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
      setErrMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
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
              An error occured while updating password. Please try again.
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {!isRecoveryEmailSent ? (
        mode == "reset" ? (
          <>
            <div className="flex flex-col w-[350px] rounded-lg border border-[#ddd] p-[20px] mb-[15px]">
              <div className="font-normal text-[26px]">Password assistance</div>
              <p className="text-[13px] mb-[12px]">Set your new password.</p>
              <div className="font-semibold tracking-wider text-[12px] mb-4">
                New password
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
                      <FaEye
                        size={15}
                        onClick={() => setPasswordVisible(false)}
                      />
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
              <div className="font-semibold tracking-wider text-[12px] mb-4">
                Confirm password
                <input
                  type="password"
                  className="font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded  py-[4px] px-[7px] mt-1 w-full outline-none"
                  style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <p className="flex items-center justify-center text-[14px] text-[#CC0C39] font-semibold">
                {errMsg}
              </p>
              <button
                className={`flex items-center justify-center ${
                  isLoading
                    ? "bg-[#FED]"
                    : "bg-[#FED914] hover:bg-[#fed050] cursor-pointer"
                } p-2 mt-4 text-[13px] rounded-lg`}
                onClick={settingPassword}
                disabled={isLoading}
              >
                Continue
              </button>
            </div>
            {isPasswordchanged ? (
              <div className="flex items-center justify-center w-[220px] mt-[5px] mb-[15px] rounded-xl border border-[#ddd] p-[20px] -[22px]">
                <BsCheckCircleFill color="green" size="15" />
                <p className="font-bold text-[16px] ml-2">Password Changed</p>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col w-[350px] rounded-lg border border-[#ddd] p-[20px] mb-[15px]">
              <div className="font-normal text-[26px]">Password assistance</div>
              <p className="text-[13px] mb-[12px]">
                Enter the email address associated with your Amazon account.
              </p>
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
              <button
                className={`flex items-center justify-center ${
                  isLoading
                    ? "bg-[#FED]"
                    : "bg-[#FED914] hover:bg-[#fed050] cursor-pointer"
                } p-2 mt-4 text-[13px] rounded-lg`}
                onClick={() => resetPassword(email)}
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
            </div>
            <div className="flex flex-col items-start w-[350px]">
              <h4 className="text-[18px] mb-1">
                Has your email address changed?
              </h4>
              <p className="text-[13px] mb-[42px]">
                If you no longer use the e-mail address associated with your
                Amazon account, you may contact Customer Service for help
                restoring access to your account.
              </p>
            </div>
          </>
        )
      ) : (
        <div className="flex items-center justify-center w-[50%] h-44 my-[10%] rounded-lg border border-[#ddd] p-[20px] -[22px]">
          <BsCheckCircleFill color="green" size="40" />
          <p className="font-bold text-[22px] ml-2">Recovery Email sent.</p>
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

export default RecoverAccount;
