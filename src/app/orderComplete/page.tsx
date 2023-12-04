import React from "react";
import Header from "../header";
import Footer from "../footer";
import { Divider } from "@mui/material";
import { BsCheckCircleFill, BsChevronRight } from "react-icons/bs";
import Link from "next/link";

function OrderSuccessPage() {
  function formatDateWithOffset(offsetDays: number): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + offsetDays);

    const dayOfWeek = days[targetDate.getDay()];
    const month = months[targetDate.getMonth()];
    const date = targetDate.getDate();

    return `${dayOfWeek}, ${date} ${month}`;
  }

  return (
    <div>
      <Header />
      <div className="flex bg-slate-100 m-4">
        <div className="flex flex-col w-full bg-white m-4 pl-4 py-4 overflow-hidden">
          <h1 className="flex items-center text-[#007600] text-[20px] font-bold my-2">
            <BsCheckCircleFill color="green" size="24" />
            &nbsp; Order placed, thank you!
          </h1>
          <p className="my-2">Confirmation will be sent to your email.</p>
          <span className="flex mt-2 mb-4">
            <p className="font-bold text-[15px]">Shipping to Jassahib Singh,</p>
            &nbsp; address
          </span>
          <span className="flex bg-slate-400 w-[200px] pr-4 overflow-hidden">
            <Divider />
          </span>
          <div className="flex mt-4">
            <span className="flex flex-col text-[15px]">
              <h4 className="font-bold">{formatDateWithOffset(4)}</h4>
              Delivery Date
            </span>
            <img className="w-[60px] ml-36" src="/uno.jpg" alt="" />
          </div>
          <Link
            className="flex items-center w-[120px] text-[12px] text-[#007185] hover:text-[#f08804] hover:underline mt-4 cursor-pointer"
            href={"/"}
          >
            {" "}
            Go to Homepage
            <BsChevronRight />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderSuccessPage;
